import React, { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import "./Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // GET LOGGED-IN USER
  // ==============================

  const getLoggedInUser = () => {
    return JSON.parse(
      localStorage.getItem("user")
    ) || {};
  };


  // ==============================
  // LOAD ORDERS
  // ==============================

  const loadOrders = async () => {

    try {

      setLoading(true);

      const user =
        getLoggedInUser();

      let response = [];

      // ==============================
      // ADMIN
      // ADMIN SEES ALL ORDERS
      // ==============================

      if (
        user?.role?.toLowerCase() === "admin"
      ) {

        response =
          await orderAPI.getAll();

      }

      // ==============================
      // USER
      // USER SEES ALL THEIR ORDERS
      // INCLUDING COMPLETED ORDERS
      // ==============================

      else {

        const userId =
          user?.id ||
          user?._id;

        if (!userId) {

          console.error(
            "User ID not found"
          );

          setOrders([]);

          return;

        }

        response =
          await orderAPI.getByUserId(
            userId
          );

      }

      console.log(
        "Logged-in User:",
        user
      );

      console.log(
        "Orders Loaded:",
        response
      );

      // ==============================
      // IMPORTANT
      // DO NOT FILTER BY STATUS
      // ==============================

      setOrders(
        Array.isArray(response)
          ? response
          : []
      );

    }

    catch (error) {

      console.error(
        "Failed to load orders:",
        error
      );

      alert(
        "Failed to load orders"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==============================
  // LOAD ORDERS WHEN PAGE OPENS
  // ==============================

  useEffect(() => {

    loadOrders();

  }, []);


  // ==============================
  // UPDATE ORDER STATUS
  // ADMIN ONLY
  // ==============================

  const updateStatus = async (
    order,
    newStatus
  ) => {

    const user =
      getLoggedInUser();

    // ==============================
    // SECURITY CHECK
    // ==============================

    if (
      user?.role?.toLowerCase() !== "admin"
    ) {

      alert(
        "Only Admin can change order status."
      );

      return;

    }

    try {

      await orderAPI.update(

        order.id,

        {
          user_id:
            order.user_id,

          customer_name:
            order.customer_name,

          medicine_name:
            order.medicine_name,

          quantity:
            order.quantity,

          total_price:
            order.total_price,

          status:
            newStatus
        }

      );

      alert(
        "Order status updated successfully"
      );

      // Reload all orders
      // Completed orders will still appear

      await loadOrders();

    }

    catch (error) {

      console.error(
        "Status update failed:",
        error
      );

      alert(
        "Failed to update order status"
      );

    }

  };


  // ==============================
  // DELETE ORDER
  // ADMIN ONLY
  // ==============================

  const deleteOrder = async (
    id
  ) => {

    const user =
      getLoggedInUser();

    // ==============================
    // SECURITY CHECK
    // ==============================

    if (
      user?.role?.toLowerCase() !== "admin"
    ) {

      alert(
        "Only Admin can delete orders."
      );

      return;

    }

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this order?"
      );

    if (!confirmDelete) {

      return;

    }

    try {

      await orderAPI.delete(
        id
      );

      alert(
        "Order deleted successfully"
      );

      await loadOrders();

    }

    catch (error) {

      console.error(
        "Delete order failed:",
        error
      );

      alert(
        "Failed to delete order"
      );

    }

  };


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (

      <div className="orders-page">

        <h1>
          Orders
        </h1>

        <div className="orders-card">

          <h2>
            Loading Orders...
          </h2>

        </div>

      </div>

    );

  }


  // ==============================
  // GET USER ROLE
  // ==============================

  const user =
    getLoggedInUser();

  const isAdmin =
    user?.role?.toLowerCase() === "admin";


  // ==============================
  // RETURN UI
  // ==============================

  return (

    <div className="orders-page">

      <div className="orders-header">

        <div>

          <h1>
            Orders
          </h1>

          <p>
            {isAdmin
              ? "Manage all customer orders"
              : "View all your orders"}
          </p>

        </div>


        <button
          className="refresh-orders-btn"
          onClick={loadOrders}
        >
          Refresh
        </button>

      </div>


      <div className="orders-card">

        {orders.length === 0 ? (

          <h2>
            No Orders Found
          </h2>

        ) : (

          <table
            className="orders-table"
          >

            <thead>

              <tr>

                <th>
                  Order ID
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Medicine
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Total Price
                </th>

                <th>
                  Order Date
                </th>

                <th>
                  Status
                </th>

                {isAdmin && (

                  <th>
                    Action
                  </th>

                )}

              </tr>

            </thead>


            <tbody>

              {orders.map(
                (order) => (

                  <tr
                    key={
                      order.id
                    }
                  >

                    <td>
                      #{order.id}
                    </td>


                    <td>
                      {
                        order.customer_name
                      }
                    </td>


                    <td>
                      {
                        order.medicine_name
                      }
                    </td>


                    <td>
                      {
                        order.quantity
                      }
                    </td>


                    <td>
                      ₹
                      {
                        order.total_price
                      }
                    </td>


                    <td>

                      {
                        order.order_date
                          ? new Date(
                              order.order_date
                            ).toLocaleString()
                          : "-"
                      }

                    </td>


                    {/* ==============================
                        STATUS
                        ADMIN = EDITABLE
                        USER = READ ONLY
                    ============================== */}

                    <td>

                      {isAdmin ? (

                        <select

                          value={
                            order.status ||
                            "Pending"
                          }

                          onChange={(
                            e
                          ) =>
                            updateStatus(
                              order,
                              e.target.value
                            )
                          }

                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      ) : (

                        <span
                          className={
                            "order-status " +
                            (
                              order.status ||
                              "Pending"
                            )
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )
                          }
                        >

                          {
                            order.status ||
                            "Pending"
                          }

                        </span>

                      )}

                    </td>


                    {/* ==============================
                        ADMIN ONLY ACTION
                    ============================== */}

                    {isAdmin && (

                      <td>

                        <button

                          className=
                            "delete-order-btn"

                          onClick={() =>
                            deleteOrder(
                              order.id
                            )
                          }

                        >

                          Delete

                        </button>

                      </td>

                    )}

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default Orders;


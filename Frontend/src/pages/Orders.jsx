import React, { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import "./Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // LOAD ALL ORDERS
  // ==============================
const loadOrders = async () => {

  try {

    setLoading(true);

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    let response;

    if (user?.role === "admin") {

      // Admin sees all orders
      response = await orderAPI.getAll();

    } else {

      // User sees only own orders
      response = await orderAPI.getByUserId(
        user.id
      );

    }

    console.log(
      "Logged-in user:",
      user
    );

    console.log(
      "Orders:",
      response
    );

    setOrders(response);

  } catch (error) {

    console.error(
      "Failed to load orders:",
      error
    );

    alert(
      "Failed to load orders"
    );

  } finally {

    setLoading(false);

  }

};
  // ==============================
  // LOAD ORDERS ON PAGE OPEN
  // ==============================

  useEffect(() => {

    loadOrders();

  }, []);


  // ==============================
  // UPDATE ORDER STATUS
  // ==============================

  const updateStatus = async (
    order,
    newStatus
  ) => {

    try {

      await orderAPI.update(
        order.id,
        {
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

      loadOrders();

    } catch (error) {

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
  // ==============================

  const deleteOrder = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this order?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await orderAPI.delete(id);

      alert(
        "Order deleted successfully"
      );

      loadOrders();

    } catch (error) {

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
  // RETURN UI
  // ==============================

  return (

    <div className="orders-page">

      <div className="orders-header">

        <h1>
          Orders
        </h1>

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

                <th>
                  Action
                </th>

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


                    <td>

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

                    </td>


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
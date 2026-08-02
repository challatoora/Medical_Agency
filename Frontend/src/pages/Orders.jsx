import React, { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import "./Orders.css";

function Orders() {

  // ==============================
  // STATE
  // ==============================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==============================
  // LOGGED-IN USER
  // ==============================

  const user =
    JSON.parse(localStorage.getItem("user")) || null;


  // ==============================
  // CHECK ADMIN
  // ==============================

  const isAdmin =
    user?.role?.toLowerCase().trim() === "admin";


  // ==============================
  // FETCH ORDERS
  // ==============================

  const fetchOrders = async () => {

    try {

      setLoading(true);
      setError("");


      // Get all orders from backend

      const response =
        await orderAPI.getAll();


      // ==============================
      // ADMIN
      // ==============================

      if (isAdmin) {

        // Admin can see ALL orders

        setOrders(response);

      }


      // ==============================
      // NORMAL USER
      // ==============================

      else {

        // User can see ONLY their own orders

        const myOrders =
          response.filter(

            (order) =>

              order.customer_name
                ?.toLowerCase()
                .trim() ===

              user?.name
                ?.toLowerCase()
                .trim()

          );


        setOrders(myOrders);

      }


    }

    catch (err) {

      console.error(
        "Failed to fetch orders:",
        err
      );


      setError(

        err.message ||

        "Failed to load orders"

      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==============================
  // LOAD ORDERS
  // ==============================

  useEffect(() => {

    fetchOrders();

  }, []);


  // ==============================
  // COMPLETE ORDER
  // ADMIN ONLY
  // ==============================

  const completeOrder = async (order) => {


    // Confirm action

    const confirmComplete =

      window.confirm(

        `Mark Order #${order.id} as Completed?`

      );


    if (!confirmComplete) {

      return;

    }


    try {


      // Update order

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
            "Completed"

        }

      );


      alert(

        "Order completed successfully"

      );


      // Refresh order list

      fetchOrders();


    }

    catch (err) {


      console.error(

        "Complete order error:",

        err

      );


      alert(

        err.message ||

        "Failed to complete order"

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

        <p>
          Loading orders...
        </p>

      </div>

    );

  }


  // ==============================
  // PAGE
  // ==============================

  return (

    <div className="orders-page">


      {/* ==========================
          PAGE HEADER
      =========================== */}

      <div className="orders-page-header">


        <div>

          <h1>
            Orders
          </h1>


          <p>

            {isAdmin

              ? "Manage all customer orders"

              : "View your orders"

            }

          </p>

        </div>


      </div>



      {/* ==========================
          ERROR
      =========================== */}

      {error && (

        <div className="error-message">

          {error}

        </div>

      )}



      {/* ==========================
          ORDERS CARD
      =========================== */}

      <div className="orders-card">


        {/* ========================
            NO ORDERS
        ========================= */}

        {orders.length === 0 ? (

          <div className="empty-orders">


            <h2>

              No Orders Found

            </h2>


            <p>

              {isAdmin

                ? "There are no customer orders yet."

                : "You have not placed any orders yet."

              }

            </p>


          </div>

        )


        :


        (


          /* ========================
             ORDERS TABLE
          ========================= */

          <table className="orders-table">


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
                  Total
                </th>


                <th>
                  Status
                </th>


                {/* ADMIN ONLY */}

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
                    key={order.id}
                  >


                    {/* ORDER ID */}

                    <td>

                      #{order.id}

                    </td>



                    {/* CUSTOMER */}

                    <td>

                      {order.customer_name}

                    </td>



                    {/* MEDICINE */}

                    <td>

                      {order.medicine_name}

                    </td>



                    {/* QUANTITY */}

                    <td>

                      {order.quantity}

                    </td>



                    {/* TOTAL */}

                    <td>

                      ₹
                      {order.total_price}

                    </td>



                    {/* STATUS */}

                    <td>


                      <span

                        className={

                          order.status
                            ?.toLowerCase()
                            .trim() ===
                          "completed"

                            ? "status-completed"

                            : "status-pending"

                        }

                      >

                        {order.status ||

                          "Pending"

                        }

                      </span>


                    </td>



                    {/* ======================
                        ADMIN ACTION
                    ======================= */}

                    {isAdmin && (


                      <td>


                        {order.status
                          ?.toLowerCase()
                          .trim() ===
                        "completed"


                          ?


                          (

                            <span

                              className=
                                "completed-text"

                            >

                              ✓ Completed

                            </span>

                          )


                          :


                          (


                            <button

                              className=
                                "complete-order-btn"


                              onClick={() =>

                                completeOrder(
                                  order
                                )

                              }

                            >

                              Complete Order

                            </button>


                          )

                        }


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

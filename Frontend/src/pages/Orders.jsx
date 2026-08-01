// import React, { useEffect, useState } from "react";
// import { orderAPI } from "../services/api";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await orderAPI.getAll();

//       setOrders(response);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Orders</h1>

//       {loading && <p>Loading orders...</p>}

//       {error && (
//         <div>
//           <p style={{ color: "red" }}>
//             Failed to load orders: {error}
//           </p>

//           <button onClick={fetchOrders}>
//             Retry
//           </button>
//         </div>
//       )}

//       {!loading && !error && (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>User ID</th>
//               <th>Customer</th>
//               <th>Phone</th>
//               <th>Total</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.length === 0 ? (
//               <tr>
//                 <td colSpan="6">
//                   No orders found
//                 </td>
//               </tr>
//             ) : (
//               orders.map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{order.user_id}</td>
//                   <td>{order.customer_name}</td>
//                   <td>{order.customer_phone}</td>
//                   <td>{order.total_amount}</td>
//                   <td>{order.order_status}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Orders;

//////////////////////////


import React, { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import "./Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get logged-in user
  const user =
    JSON.parse(localStorage.getItem("user")) || null;

  // Check Admin
  const isAdmin =
    user?.role?.toLowerCase().trim() === "admin";


  // ==============================
  // FETCH ORDERS
  // ==============================

  const fetchOrders = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await orderAPI.getAll();

      setOrders(response);

    } catch (err) {

      console.error(err);

      setError(
        err.message || "Failed to load orders"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchOrders();

  }, []);


  // ==============================
  // COMPLETE ORDER
  // ==============================

  const completeOrder = async (order) => {

    const confirmComplete =
      window.confirm(
        `Mark Order #${order.id} as Completed?`
      );

    if (!confirmComplete) {
      return;
    }


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
            "Completed"
        }
      );


      alert(
        "Order completed successfully"
      );


      // Refresh orders
      fetchOrders();


    } catch (err) {

      console.error(err);

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

        <h1>Orders</h1>

        <p>
          Loading orders...
        </p>

      </div>

    );

  }


  // ==============================
  // UI
  // ==============================

  return (

    <div className="orders-page">


      <div className="orders-page-header">

        <div>

          <h1>
            Orders
          </h1>

          <p>
            Manage customer orders
          </p>

        </div>

      </div>


      {error && (

        <div className="error-message">

          {error}

        </div>

      )}


      <div className="orders-card">


        {orders.length === 0 ? (

          <div className="empty-orders">

            <h2>
              No Orders Found
            </h2>

            <p>
              There are no orders available.
            </p>

          </div>

        ) : (


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

                {isAdmin && (

                  <th>
                    Action
                  </th>

                )}

              </tr>

            </thead>


            <tbody>


              {orders.map((order) => (

                <tr key={order.id}>


                  <td>

                    #{order.id}

                  </td>


                  <td>

                    {order.customer_name}

                  </td>


                  <td>

                    {order.medicine_name}

                  </td>


                  <td>

                    {order.quantity}

                  </td>


                  <td>

                    ₹{order.total_price}

                  </td>


                  <td>

                    <span
                      className={
                        order.status
                          ?.toLowerCase() === "completed"
                          ? "status-completed"
                          : "status-pending"
                      }
                    >

                      {order.status || "Pending"}

                    </span>

                  </td>


                  {isAdmin && (

                    <td>


                      {order.status
                        ?.toLowerCase() ===
                        "completed" ? (

                        <span className="completed-text">

                          ✓ Completed

                        </span>

                      ) : (

                        <button

                          className="complete-order-btn"

                          onClick={() =>
                            completeOrder(order)
                          }

                        >

                          Complete Order

                        </button>

                      )}


                    </td>

                  )}


                </tr>

              ))}


            </tbody>


          </table>

        )}


      </div>


    </div>

  );

}

export default Orders;

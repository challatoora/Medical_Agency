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

function Orders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customer_name: "",
    medicine_name: "",
    quantity: "",
    total_price: "",
    status: "Pending"
  });


  useEffect(() => {
    fetchOrders();
  }, []);


  const fetchOrders = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await orderAPI.getAll();

      setOrders(response);

    } catch (error) {

      console.error("Failed to fetch orders:", error);

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await orderAPI.create(formData);

      setFormData({
        customer_name: "",
        medicine_name: "",
        quantity: "",
        total_price: "",
        status: "Pending"
      });

      fetchOrders();

    } catch (error) {

      console.error("Failed to create order:", error);

    }

  };
    const deleteOrder = async (id) => {

    try {

      await orderAPI.delete(id);

      fetchOrders();

    } catch (error) {

      console.error("Failed to delete order:", error);

    }

  };


  return (

    <div>

      <h1>Orders</h1>


      <h2>Create Order</h2>


      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
          required
        />


        <input
          type="text"
          name="medicine_name"
          placeholder="Medicine Name"
          value={formData.medicine_name}
          onChange={handleChange}
          required
        />


        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />


        <input
          type="number"
          name="total_price"
          placeholder="Total Price"
          value={formData.total_price}
          onChange={handleChange}
          required
        />


        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>

        </select>


        <button type="submit">
          Add Order
        </button>


      </form>



      {loading && (
        <p>
          Loading orders...
        </p>
      )}


      {error && (

        <div>

          <p style={{color:"red"}}>
            {error}
          </p>


          <button onClick={fetchOrders}>
            Retry
          </button>

        </div>

      )}
            {!loading && !error && (

        <table border="1">

          <thead>

            <tr>

              <th>ID</th>

              <th>Customer</th>

              <th>Medicine</th>

              <th>Quantity</th>

              <th>Total Price</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {
              orders.length === 0 ? (

                <tr>

                  <td colSpan="7">
                    No orders found
                  </td>

                </tr>

              ) : (

                orders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      {order.id}
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
                      {order.total_price}
                    </td>


                    <td>
                      {order.status}
                    </td>


                    <td>

                      <button
                        onClick={() => deleteOrder(order.id)}
                      >
                        Delete
                      </button>

                    </td>


                  </tr>

                ))

              )
            }


          </tbody>


        </table>

      )}


    </div>

  );

}


export default Orders;
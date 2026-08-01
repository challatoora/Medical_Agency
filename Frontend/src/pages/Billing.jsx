// import { billingAPI } from "../services/api";
// import React, { useEffect, useState } from "react";

// function Billing() {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchInvoices = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await billingAPI.getAll();

//       setInvoices(response);
//     } catch (error) {
//       console.error("Failed to fetch invoices:", error);

//       setError(
//         error.message || "Unable to load billing records"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, []);

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           <h1>Billing</h1>
//           <p>Manage medical agency invoices and payments</p>
//         </div>

//         <button onClick={fetchInvoices}>
//           Refresh
//         </button>
//       </div>

//       {loading && (
//         <div className="loading-message">
//           <p>Loading invoices...</p>
//         </div>
//       )}

//       {!loading && error && (
//         <div className="error-message">
//           <p>
//             Failed to load invoices: {error}
//           </p>

//           <button onClick={fetchInvoices}>
//             Retry
//           </button>
//         </div>
//       )}

//       {!loading && !error && (
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Order ID</th>
//                 <th>User ID</th>
//                 <th>Invoice Number</th>
//                 <th>Subtotal</th>
//                 <th>Tax</th>
//                 <th>Discount</th>
//                 <th>Total Amount</th>
//                 <th>Payment Status</th>
//                 <th>Payment Method</th>
//               </tr>
//             </thead>

//             <tbody>
//               {invoices.length === 0 ? (
//                 <tr>
//                   <td colSpan="10">
//                     No invoices found
//                   </td>
//                 </tr>
//               ) : (
//                 invoices.map((invoice) => (
//                   <tr
//                     key={
//                       invoice.id ||
//                       invoice.invoice_id
//                     }
//                   >
//                     <td>
//                       {invoice.id ||
//                         invoice.invoice_id ||
//                         "-"}
//                     </td>

//                     <td>
//                       {invoice.order_id || "-"}
//                     </td>

//                     <td>
//                       {invoice.user_id || "-"}
//                     </td>

//                     <td>
//                       {invoice.invoice_number || "-"}
//                     </td>

//                     <td>
//                       ₹
//                       {Number(
//                         invoice.subtotal || 0
//                       ).toFixed(2)}
//                     </td>

//                     <td>
//                       ₹
//                       {Number(
//                         invoice.tax_amount || 0
//                       ).toFixed(2)}
//                     </td>

//                     <td>
//                       ₹
//                       {Number(
//                         invoice.discount_amount || 0
//                       ).toFixed(2)}
//                     </td>

//                     <td>
//                       <strong>
//                         ₹
//                         {Number(
//                           invoice.total_amount || 0
//                         ).toFixed(2)}
//                       </strong>
//                     </td>

//                     <td>
//                       {invoice.payment_status || "-"}
//                     </td>

//                     <td>
//                       {invoice.payment_method || "-"}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Billing;
//////////

// import React, { useEffect, useState } from "react";
// import { billingAPI } from "../services/api";


// function Billing() {


//   const [invoices, setInvoices] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");


//   const [formData, setFormData] = useState({

//     order_id: "",
//     user_id: "",
//     invoice_number: "",
//     subtotal: "",
//     tax_amount: "",
//     discount_amount: "",
//     total_amount: "",
//     payment_status: "Pending",
//     payment_method: "Cash"

//   });



//   useEffect(() => {

//     fetchInvoices();

//   }, []);




//   const fetchInvoices = async () => {

//     try {

//       setLoading(true);

//       setError("");


//       const response = await billingAPI.getAll();


//       setInvoices(response);


//     } catch (error) {


//       console.error(
//         "Failed to fetch invoices:",
//         error
//       );


//       setError(error.message);


//     } finally {


//       setLoading(false);


//     }

//   };




//   const handleChange = (e) => {


//     setFormData({

//       ...formData,

//       [e.target.name]: e.target.value

//     });


//   };




//   const handleSubmit = async (e) => {


//     e.preventDefault();


//     try {


//       await billingAPI.create(formData);


//       setFormData({

//         order_id: "",
//         user_id: "",
//         invoice_number: "",
//         subtotal: "",
//         tax_amount: "",
//         discount_amount: "",
//         total_amount: "",
//         payment_status: "Pending",
//         payment_method: "Cash"

//       });


//       fetchInvoices();



//     } catch (error) {


//       console.error(
//         "Failed to create invoice:",
//         error
//       );


//     }


//   };
//     const deleteInvoice = async (id) => {

//     try {

//       await billingAPI.delete(id);

//       fetchInvoices();

//     } catch (error) {

//       console.error(
//         "Failed to delete invoice:",
//         error
//       );

//     }

//   };



//   return (

//     <div>

//       <h1>
//         Billing
//       </h1>



//       <h2>
//         Create Invoice
//       </h2>



//       <form onSubmit={handleSubmit}>


//         <input
//           type="number"
//           name="order_id"
//           placeholder="Order ID"
//           value={formData.order_id}
//           onChange={handleChange}
//           required
//         />


//         <input
//           type="number"
//           name="user_id"
//           placeholder="User ID"
//           value={formData.user_id}
//           onChange={handleChange}
//           required
//         />


//         <input
//           type="text"
//           name="invoice_number"
//           placeholder="Invoice Number"
//           value={formData.invoice_number}
//           onChange={handleChange}
//           required
//         />



//         <input
//           type="number"
//           name="subtotal"
//           placeholder="Subtotal"
//           value={formData.subtotal}
//           onChange={handleChange}
//           required
//         />



//         <input
//           type="number"
//           name="tax_amount"
//           placeholder="Tax Amount"
//           value={formData.tax_amount}
//           onChange={handleChange}
//         />



//         <input
//           type="number"
//           name="discount_amount"
//           placeholder="Discount Amount"
//           value={formData.discount_amount}
//           onChange={handleChange}
//         />



//         <input
//           type="number"
//           name="total_amount"
//           placeholder="Total Amount"
//           value={formData.total_amount}
//           onChange={handleChange}
//           required
//         />



//         <select
//           name="payment_status"
//           value={formData.payment_status}
//           onChange={handleChange}
//         >

//           <option value="Pending">
//             Pending
//           </option>


//           <option value="Paid">
//             Paid
//           </option>


//         </select>




//         <select
//           name="payment_method"
//           value={formData.payment_method}
//           onChange={handleChange}
//         >

//           <option value="Cash">
//             Cash
//           </option>


//           <option value="UPI">
//             UPI
//           </option>


//           <option value="Card">
//             Card
//           </option>


//         </select>




//         <button type="submit">
//           Create Invoice
//         </button>


//       </form>




//       {loading && (

//         <p>
//           Loading invoices...
//         </p>

//       )}



//       {error && (

//         <div>

//           <p style={{color:"red"}}>
//             {error}
//           </p>


//           <button onClick={fetchInvoices}>
//             Retry
//           </button>


//         </div>

//       )}
//             {!loading && !error && (

//         <table border="1">

//           <thead>

//             <tr>

//               <th>ID</th>

//               <th>Invoice No</th>

//               <th>Order ID</th>

//               <th>Total Amount</th>

//               <th>Payment Status</th>

//               <th>Payment Method</th>

//               <th>Status</th>

//               <th>Action</th>

//             </tr>

//           </thead>


//           <tbody>


//             {
//               invoices.length === 0 ? (

//                 <tr>

//                   <td colSpan="8">
//                     No invoices found
//                   </td>

//                 </tr>


//               ) : (


//                 invoices.map((invoice) => (


//                   <tr key={invoice.id}>


//                     <td>
//                       {invoice.id}
//                     </td>


//                     <td>
//                       {invoice.invoice_number}
//                     </td>


//                     <td>
//                       {invoice.order_id}
//                     </td>


//                     <td>
//                       {invoice.total_amount}
//                     </td>


//                     <td>
//                       {invoice.payment_status}
//                     </td>


//                     <td>
//                       {invoice.payment_method}
//                     </td>


//                     <td>
//                       {invoice.invoice_status}
//                     </td>


//                     <td>

//                       <button
//                         onClick={() =>
//                           deleteInvoice(invoice.id)
//                         }
//                       >
//                         Delete
//                       </button>


//                     </td>


//                   </tr>


//                 ))

//               )

//             }


//           </tbody>


//         </table>


//       )}


//     </div>


//   );


// }


// export default Billing;

import React, { useEffect, useState } from "react";
import { billingAPI } from "../services/api";
import "./Billing.css";


function Billing() {


  const [cart,setCart] = useState([]);

  const [user,setUser] = useState(null);



  useEffect(()=>{


    const cartData =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];


    const userData =
      JSON.parse(
        localStorage.getItem("user")
      );


    setCart(cartData);

    setUser(userData);


  },[]);






  const totalAmount = cart.reduce(

    (sum,item)=>

      sum +

      (
        Number(item.price) *
        Number(item.cartQuantity)
      ),

    0

  );





  const generateBill = async () => {

  try {


    const billData = {


      customer_name:
      user?.name || "Customer",


      items: cart.map(item => ({

        medicine_id:item._id,

        medicine_name:item.name,

        quantity:item.cartQuantity,

        price:item.price

      })),


      total_amount: totalAmount


    };



    const response =
      await billingAPI.create(
        billData
      );



    console.log(
      "Bill Response:",
      response
    );



    alert(
      "Bill generated successfully"
    );



    localStorage.removeItem(
      "cart"
    );


    setCart([]);



  }

  catch(err){


    console.error(err);


    alert(
      "Billing failed"
    );


  }


};





return (

<div className="billing-page">


<h1>
Billing
</h1>




<div className="billing-card">



<h2>
Customer Details
</h2>


<p>
Name :
{
user?.name || "Customer"
}
</p>



<p>
Role :
{
user?.role || "USER"
}
</p>



</div>






<div className="billing-card">


<h2>
Order Summary
</h2>



<table className="billing-table">


<thead>

<tr>

<th>
Medicine
</th>


<th>
Price
</th>


<th>
Quantity
</th>


<th>
Amount
</th>


</tr>

</thead>



<tbody>


{

cart.map(item=>(


<tr key={item._id}>


<td>
{item.name}
</td>



<td>
₹{item.price}
</td>



<td>
{item.cartQuantity}
</td>



<td>

₹
{
item.price *
item.cartQuantity
}

</td>


</tr>


))

}



</tbody>


</table>




<h2 className="billing-total">

Total Payable :
₹{totalAmount}

</h2>




<button

className="generate-bill-btn"

onClick={generateBill}

>

Generate Bill

</button>



</div>




</div>

);


}


export default Billing;
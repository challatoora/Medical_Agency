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
import {
  orderAPI,
  billingAPI
} from "../services/api";

import "./Billing.css";


function Billing() {

  // ==========================================
  // CART
  // ==========================================

  const [cart, setCart] = useState([]);


  // ==========================================
  // LOGGED-IN USER
  // ==========================================

  const [user, setUser] = useState(null);


  // ==========================================
  // PAYMENT
  // ==========================================

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");


  // ==========================================
  // BILLING STATUS
  // ==========================================

  const [loading, setLoading] =
    useState(false);


  // ==========================================
  // LOAD CART + USER
  // ==========================================

  useEffect(() => {

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

  }, []);


  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = cart.reduce(

    (sum, item) =>

      sum +
      (
        Number(item.price) *
        Number(item.cartQuantity)
      ),

    0

  );


  // ==========================================
  // TAX 18%
  // ==========================================

  const taxAmount =
    subtotal * 0.18;


  // ==========================================
  // DISCOUNT
  // ==========================================

  const discountAmount = 0;


  // ==========================================
  // FINAL TOTAL
  // ==========================================

  const totalAmount =
    subtotal +
    taxAmount -
    discountAmount;


  // ==========================================
  // GENERATE BILL
  // ==========================================

  const generateBill = async () => {

    // Check cart

    if (cart.length === 0) {

      alert(
        "Your cart is empty"
      );

      return;

    }


    // Check user

    if (!user?.id) {

      alert(
        "User information not found"
      );

      return;

    }


    try {

      setLoading(true);


      // ========================================
      // STEP 1
      // CREATE ORDER
      // ========================================

      const orderData = {

        customer_name:
          user?.name || "Customer",

        medicine_name:
          cart
            .map(item => item.name)
            .join(", "),

        quantity:
          cart.reduce(
            (total, item) =>
              total +
              Number(item.cartQuantity),

            0
          ),

        total_price:
          totalAmount,

        status:
          "Pending"

      };


      console.log(
        "Creating Order:",
        orderData
      );


      const orderResponse =
        await orderAPI.create(
          orderData
        );


      console.log(
        "Order Response:",
        orderResponse
      );


      // ========================================
      // GET ORDER ID
      // ========================================

      const orderId =
        orderResponse.orderId ||
        orderResponse.id;


      if (!orderId) {

        throw new Error(
          "Order ID was not returned"
        );

      }


      // ========================================
      // STEP 2
      // CREATE BILL / INVOICE
      // ========================================

      const billData = {

        order_id:
          Number(orderId),

        user_id:
          Number(user.id),

        subtotal:
          Number(subtotal),

        tax_amount:
          Number(taxAmount),

        discount_amount:
          Number(discountAmount),

        payment_status:
          "Pending",

        payment_method:
          paymentMethod

      };


      console.log(
        "Creating Invoice:",
        billData
      );


      const billResponse =
        await billingAPI.create(
          billData
        );


      console.log(
        "Invoice Response:",
        billResponse
      );


      // ========================================
      // SUCCESS
      // ========================================

      alert(

        `Invoice created successfully!\n\n` +

        `Invoice Number: ${
          billResponse.invoiceNumber ||
          "Generated"
        }\n\n` +

        `Total Amount: ₹${
          totalAmount.toFixed(2)
        }`

      );


      // ========================================
      // CLEAR CART
      // ========================================

      localStorage.removeItem(
        "cart"
      );


      setCart([]);


    }

    catch (err) {

      console.error(
        "Billing Error:",
        err
      );


      alert(

        err.message ||
        "Failed to generate bill"

      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="billing-page">


      {/* ======================================
          PAGE TITLE
      ====================================== */}

      <h1>
        Billing
      </h1>


      {/* ======================================
          CUSTOMER DETAILS
      ====================================== */}

      <div className="billing-card">


        <h2>
          Customer Details
        </h2>


        <p>

          <strong>
            Name:
          </strong>

          {" "}

          {user?.name || "Customer"}

        </p>


        <p>

          <strong>
            Role:
          </strong>

          {" "}

          {user?.role || "USER"}

        </p>


        <p>

          <strong>
            User ID:
          </strong>

          {" "}

          {user?.id || "-"}

        </p>


      </div>


      {/* ======================================
          ORDER SUMMARY
      ====================================== */}

      <div className="billing-card">


        <h2>
          Order Summary
        </h2>


        {cart.length === 0 ? (

          <p>
            Your cart is empty.
          </p>

        ) : (

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


              {cart.map(item => (


                <tr
                  key={item._id}
                >


                  <td>
                    {item.name}
                  </td>


                  <td>
                    ₹{Number(item.price).toFixed(2)}
                  </td>


                  <td>
                    {item.cartQuantity}
                  </td>


                  <td>

                    ₹
                    {(
                      Number(item.price) *
                      Number(item.cartQuantity)
                    ).toFixed(2)}

                  </td>


                </tr>


              ))}


            </tbody>


          </table>

        )}


        {/* ====================================
            BILL CALCULATION
        ==================================== */}

        {cart.length > 0 && (

          <div className="billing-calculation">


            <p>

              <span>
                Subtotal:
              </span>

              <strong>
                ₹{subtotal.toFixed(2)}
              </strong>

            </p>


            <p>

              <span>
                Tax (18%):
              </span>

              <strong>
                ₹{taxAmount.toFixed(2)}
              </strong>

            </p>


            <p>

              <span>
                Discount:
              </span>

              <strong>
                ₹{discountAmount.toFixed(2)}
              </strong>

            </p>


            <hr />


            <h2 className="billing-total">

              <span>
                Total Payable:
              </span>

              <strong>
                ₹{totalAmount.toFixed(2)}
              </strong>

            </h2>


          </div>

        )}


        {/* ====================================
            PAYMENT METHOD
        ==================================== */}

        {cart.length > 0 && (

          <div className="payment-section">


            <h3>
              Payment Method
            </h3>


            <select

              value={paymentMethod}

              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }

            >

              <option value="Cash">
                Cash
              </option>

              <option value="Card">
                Card
              </option>

              <option value="UPI">
                UPI
              </option>

            </select>


          </div>

        )}


        {/* ====================================
            GENERATE BILL BUTTON
        ==================================== */}

        {cart.length > 0 && (

          <button

            className="generate-bill-btn"

            onClick={
              generateBill
            }

            disabled={loading}

          >

            {loading

              ? "Generating Bill..."

              : "Generate Bill"

            }

          </button>

        )}


      </div>


    </div>

  );

}


export default Billing;
// import React, { useEffect, useState } from "react";
// import {
//   orderAPI,
//   billingAPI
// } from "../services/api";

// import "./Billing.css";


// function Billing() {

//   // ==========================================
//   // CART
//   // ==========================================

//   const [cart, setCart] = useState([]);


//   // ==========================================
//   // LOGGED-IN USER
//   // ==========================================

//   const [user, setUser] = useState(null);


//   // ==========================================
//   // PAYMENT
//   // ==========================================

//   const [paymentMethod, setPaymentMethod] =
//     useState("Cash");


//   // ==========================================
//   // BILLING STATUS
//   // ==========================================

//   const [loading, setLoading] =
//     useState(false);


//   // ==========================================
//   // LOAD CART + USER
//   // ==========================================

//   useEffect(() => {

//     const cartData =
//       JSON.parse(
//         localStorage.getItem("cart")
//       ) || [];


//     const userData =
//       JSON.parse(
//         localStorage.getItem("user")
//       );


//     setCart(cartData);

//     setUser(userData);

//   }, []);


//   // ==========================================
//   // SUBTOTAL
//   // ==========================================

//   const subtotal = cart.reduce(

//     (sum, item) =>

//       sum +
//       (
//         Number(item.price) *
//         Number(item.cartQuantity)
//       ),

//     0

//   );


//   // ==========================================
//   // TAX 18%
//   // ==========================================

//   const taxAmount =
//     subtotal * 0.18;


//   // ==========================================
//   // DISCOUNT
//   // ==========================================

//   const discountAmount = 0;


//   // ==========================================
//   // FINAL TOTAL
//   // ==========================================

//   const totalAmount =
//     subtotal +
//     taxAmount -
//     discountAmount;


//   // ==========================================
//   // GENERATE BILL
//   // ==========================================

//   const generateBill = async () => {

//     // Check cart

//     if (cart.length === 0) {

//       alert(
//         "Your cart is empty"
//       );

//       return;

//     }


//     // Check user

//     if (!user?.id) {

//       alert(
//         "User information not found"
//       );

//       return;

//     }


//     try {

//       setLoading(true);


//       // ========================================
//       // STEP 1
//       // CREATE ORDER
//       // ========================================

//       const orderData = {

//         customer_name:
//           user?.name || "Customer",

//         medicine_name:
//           cart
//             .map(item => item.name)
//             .join(", "),

//         quantity:
//           cart.reduce(
//             (total, item) =>
//               total +
//               Number(item.cartQuantity),

//             0
//           ),

//         total_price:
//           totalAmount,

//         status:
//           "Pending"

//       };


//       console.log(
//         "Creating Order:",
//         orderData
//       );


//       const orderResponse =
//         await orderAPI.create(
//           orderData
//         );


//       console.log(
//         "Order Response:",
//         orderResponse
//       );


//       // ========================================
//       // GET ORDER ID
//       // ========================================

//       const orderId =
//         orderResponse.orderId ||
//         orderResponse.id;


//       if (!orderId) {

//         throw new Error(
//           "Order ID was not returned"
//         );

//       }


//       // ========================================
//       // STEP 2
//       // CREATE BILL / INVOICE
//       // ========================================

//       const billData = {

//         order_id:
//           Number(orderId),

//         user_id:
//           Number(user.id),

//         subtotal:
//           Number(subtotal),

//         tax_amount:
//           Number(taxAmount),

//         discount_amount:
//           Number(discountAmount),

//         payment_status:
//           "Pending",

//         payment_method:
//           paymentMethod

//       };


//       console.log(
//         "Creating Invoice:",
//         billData
//       );


//       const billResponse =
//         await billingAPI.create(
//           billData
//         );


//       console.log(
//         "Invoice Response:",
//         billResponse
//       );


//       // ========================================
//       // SUCCESS
//       // ========================================

//       alert(

//         `Invoice created successfully!\n\n` +

//         `Invoice Number: ${
//           billResponse.invoiceNumber ||
//           "Generated"
//         }\n\n` +

//         `Total Amount: ₹${
//           totalAmount.toFixed(2)
//         }`

//       );


//       // ========================================
//       // CLEAR CART
//       // ========================================

//       localStorage.removeItem(
//         "cart"
//       );


//       setCart([]);


//     }

//     catch (err) {

//       console.error(
//         "Billing Error:",
//         err
//       );


//       alert(

//         err.message ||
//         "Failed to generate bill"

//       );

//     }

//     finally {

//       setLoading(false);

//     }

//   };


//   // ==========================================
//   // RETURN
//   // ==========================================

//   return (

//     <div className="billing-page">


//       {/* ======================================
//           PAGE TITLE
//       ====================================== */}

//       <h1>
//         Billing
//       </h1>


//       {/* ======================================
//           CUSTOMER DETAILS
//       ====================================== */}

//       <div className="billing-card">


//         <h2>
//           Customer Details
//         </h2>


//         <p>

//           <strong>
//             Name:
//           </strong>

//           {" "}

//           {user?.name || "Customer"}

//         </p>


//         <p>

//           <strong>
//             Role:
//           </strong>

//           {" "}

//           {user?.role || "USER"}

//         </p>


//         <p>

//           <strong>
//             User ID:
//           </strong>

//           {" "}

//           {user?.id || "-"}

//         </p>


//       </div>


//       {/* ======================================
//           ORDER SUMMARY
//       ====================================== */}

//       <div className="billing-card">


//         <h2>
//           Order Summary
//         </h2>


//         {cart.length === 0 ? (

//           <p>
//             Your cart is empty.
//           </p>

//         ) : (

//           <table className="billing-table">


//             <thead>

//               <tr>

//                 <th>
//                   Medicine
//                 </th>

//                 <th>
//                   Price
//                 </th>

//                 <th>
//                   Quantity
//                 </th>

//                 <th>
//                   Amount
//                 </th>

//               </tr>

//             </thead>


//             <tbody>


//               {cart.map(item => (


//                 <tr
//                   key={item._id}
//                 >


//                   <td>
//                     {item.name}
//                   </td>


//                   <td>
//                     ₹{Number(item.price).toFixed(2)}
//                   </td>


//                   <td>
//                     {item.cartQuantity}
//                   </td>


//                   <td>

//                     ₹
//                     {(
//                       Number(item.price) *
//                       Number(item.cartQuantity)
//                     ).toFixed(2)}

//                   </td>


//                 </tr>


//               ))}


//             </tbody>


//           </table>

//         )}


//         {/* ====================================
//             BILL CALCULATION
//         ==================================== */}

//         {cart.length > 0 && (

//           <div className="billing-calculation">


//             <p>

//               <span>
//                 Subtotal:
//               </span>

//               <strong>
//                 ₹{subtotal.toFixed(2)}
//               </strong>

//             </p>


//             <p>

//               <span>
//                 Tax (18%):
//               </span>

//               <strong>
//                 ₹{taxAmount.toFixed(2)}
//               </strong>

//             </p>


//             <p>

//               <span>
//                 Discount:
//               </span>

//               <strong>
//                 ₹{discountAmount.toFixed(2)}
//               </strong>

//             </p>


//             <hr />


//             <h2 className="billing-total">

//               <span>
//                 Total Payable:
//               </span>

//               <strong>
//                 ₹{totalAmount.toFixed(2)}
//               </strong>

//             </h2>


//           </div>

//         )}


//         {/* ====================================
//             PAYMENT METHOD
//         ==================================== */}

//         {cart.length > 0 && (

//           <div className="payment-section">


//             <h3>
//               Payment Method
//             </h3>


//             <select

//               value={paymentMethod}

//               onChange={(e) =>
//                 setPaymentMethod(
//                   e.target.value
//                 )
//               }

//             >

//               <option value="Cash">
//                 Cash
//               </option>

//               <option value="Card">
//                 Card
//               </option>

//               <option value="UPI">
//                 UPI
//               </option>

//             </select>


//           </div>

//         )}


//         {/* ====================================
//             GENERATE BILL BUTTON
//         ==================================== */}

//         {cart.length > 0 && (

//           <button

//             className="generate-bill-btn"

//             onClick={
//               generateBill
//             }

//             disabled={loading}

//           >

//             {loading

//               ? "Generating Bill..."

//               : "Generate Bill"

//             }

//           </button>

//         )}


//       </div>


//     </div>

//   );

// }


// export default Billing;

import React, { useEffect, useState } from "react";
import { billingAPI } from "../services/api";
import "./Billing.css";

function Billing() {
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);

  const [invoice, setInvoice] = useState(null);

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [paymentLoading, setPaymentLoading] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [error, setError] = useState("");

  // ===============================
  // LOAD CURRENT ORDER
  // ===============================

  useEffect(() => {
    const orderData =
      JSON.parse(
        localStorage.getItem("currentOrder")
      );

    const userData =
      JSON.parse(
        localStorage.getItem("user")
      );

    console.log(
      "Current Order:",
      orderData
    );

    console.log(
      "Current User:",
      userData
    );

    setOrder(orderData);
    setUser(userData);
  }, []);

  // ===============================
  // GET ORDER DATA
  // ===============================

  const orderId =
    order?.orderId;

  const customerName =
    order?.customerName ||
    user?.name ||
    "Customer";

  const medicineName =
    order?.medicineName ||
    "Medicine";

  const quantity =
    Number(order?.quantity) || 0;

  const totalAmount =
    Number(order?.totalAmount) || 0;

  // ===============================
  // GENERATE INVOICE
  // ===============================

  const generateBill = async () => {
    try {
      setError("");

      // Check current order
      if (!order) {
        alert(
          "Order information not found."
        );

        return;
      }

      // Check Order ID
      if (!orderId) {
        alert(
          "Order ID not found."
        );

        return;
      }

      // Check User
      if (
        !user?.id &&
        !user?._id
      ) {
        alert(
          "User information not found."
        );

        return;
      }

      // Check Amount
      if (
        totalAmount <= 0
      ) {
        alert(
          "Order amount is invalid."
        );

        return;
      }

      // ===============================
      // BILL DATA
      // ===============================

      const billData = {
        order_id:
          Number(orderId),

        user_id:
          user.id ||
          user._id,

        subtotal:
          totalAmount,

        tax_amount:
          0,

        discount_amount:
          0,

        payment_status:
          "Pending",

        payment_method:
          "Pending"
      };

      console.log(
        "Creating Invoice:",
        billData
      );

      // ===============================
      // CREATE INVOICE
      // ===============================

      const response =
        await billingAPI.create(
          billData
        );

      console.log(
        "Invoice Created:",
        response
      );

      // ===============================
      // SAVE INVOICE
      // ===============================

      setInvoice({
        id:
          response.invoiceId,

        invoiceNumber:
          response.invoiceNumber,

        totalAmount:
          response.totalAmount,

        paymentStatus:
          "Pending",

        paymentMethod:
          "Pending"
      });

      // ===============================
      // OPEN PAYMENT POPUP
      // ===============================

      setShowPaymentPopup(
        true
      );
    }

    catch (err) {
      console.error(
        "Invoice creation failed:",
        err
      );

      setError(
        err.message ||
        "Failed to create invoice"
      );
    }
  };

  // ===============================
  // CONFIRM PAYMENT
  // ===============================

  const confirmPayment = async () => {
    try {
      setPaymentLoading(
        true
      );

      setError("");

      if (!invoice?.id) {
        alert(
          "Invoice ID not found."
        );

        return;
      }

      // ===============================
      // UPDATE PAYMENT METHOD
      // ===============================

      await billingAPI.updatePaymentMethod(
        invoice.id,
        {
          payment_method:
            paymentMethod
        }
      );

      // ===============================
      // UPDATE PAYMENT STATUS
      // ===============================

      await billingAPI.updatePaymentStatus(
        invoice.id,
        {
          payment_status:
            "Paid"
        }
      );

      console.log(
        "Payment Successful"
      );

      // ===============================
      // UPDATE INVOICE UI
      // ===============================

      setInvoice({
        ...invoice,

        paymentStatus:
          "Paid",

        paymentMethod:
          paymentMethod
      });

      // ===============================
      // CLOSE POPUP
      // ===============================

      setShowPaymentPopup(
        false
      );

      // ===============================
      // SHOW SUCCESS
      // ===============================

      setPaymentSuccess(
        true
      );

      // ===============================
      // CLEAR CART
      // ===============================

      localStorage.removeItem(
        "cart"
      );

    }

    catch (err) {
      console.error(
        "Payment failed:",
        err
      );

      setError(
        err.message ||
        "Payment failed"
      );
    }

    finally {
      setPaymentLoading(
        false
      );
    }
  };

  return (
    <div className="billing-page">

      <h1>
        Billing
      </h1>

      {/* ===============================
          ERROR
      =============================== */}

      {error && (
        <div
          style={{
            background:
              "#fee2e2",
            color:
              "#b91c1c",
            padding:
              "12px",
            marginBottom:
              "20px",
            borderRadius:
              "8px"
          }}
        >
          {error}
        </div>
      )}

      {/* ===============================
          CUSTOMER DETAILS
      =============================== */}

      <div className="billing-card">

        <h2>
          Customer Details
        </h2>

        <p>
          Name :{" "}
          {customerName}
        </p>

        <p>
          Role :{" "}
          {user?.role ||
            "USER"}
        </p>

      </div>

      {/* ===============================
          ORDER SUMMARY
      =============================== */}

      <div className="billing-card">

        <h2>
          Order Summary
        </h2>

        <table
          className="billing-table"
        >

          <thead>

            <tr>

              <th>
                Medicine
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

            <tr>

              <td>
                {medicineName}
              </td>

              <td>
                {quantity}
              </td>

              <td>
                ₹
                {totalAmount}
              </td>

            </tr>

          </tbody>

        </table>

        <h2
          className="billing-total"
        >
          Total Payable :
          ₹
          {totalAmount}
        </h2>

        {/* ===============================
            GENERATE BILL BUTTON
        =============================== */}

        {!invoice &&
          !paymentSuccess && (

          <button
            className="generate-bill-btn"
            onClick={
              generateBill
            }
            disabled={
              !order ||
              totalAmount <= 0
            }
          >
            Generate Bill
          </button>

        )}

      </div>

      {/* ===============================
          PAYMENT SUCCESS
      =============================== */}

      {paymentSuccess && (

        <div
          className="billing-card"
          style={{
            marginTop:
              "20px",
            border:
              "2px solid #22c55e"
          }}
        >

          <h2
            style={{
              color:
                "#16a34a"
            }}
          >
            Payment Successful ✅
          </h2>

          <p>
            Invoice Number :{" "}
            <strong>
              {
                invoice?.invoiceNumber
              }
            </strong>
          </p>

          <p>
            Amount Paid :{" "}
            <strong>
              ₹
              {
                invoice?.totalAmount
              }
            </strong>
          </p>

          <p>
            Payment Method :{" "}
            <strong>
              {
                invoice?.paymentMethod
              }
            </strong>
          </p>

          <p>
            Payment Status :{" "}
            <strong>
              Paid
            </strong>
          </p>

          <p>
            Order ID :{" "}
            <strong>
              {orderId}
            </strong>
          </p>

          <p>
            Order Status :{" "}
            <strong>
              Pending
            </strong>
          </p>

          <p>
            Your payment has been
            completed successfully.
          </p>

          <p>
            The Admin will manually
            update your order status
            to Completed.
          </p>

        </div>

      )}

      {/* ===============================
          PAYMENT POPUP
      =============================== */}

      {showPaymentPopup && (

        <div
          style={{
            position:
              "fixed",
            top: 0,
            left: 0,
            width:
              "100%",
            height:
              "100%",
            background:
              "rgba(0,0,0,0.6)",
            display:
              "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex:
              9999
          }}
        >

          <div
            style={{
              background:
                "#ffffff",
              padding:
                "30px",
              borderRadius:
                "15px",
              width:
                "400px",
              maxWidth:
                "90%",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.3)"
            }}
          >

            <h2>
              Payment
            </h2>

            <p>
              Invoice Number :{" "}
              <strong>
                {
                  invoice?.invoiceNumber
                }
              </strong>
            </p>

            <p>
              Amount :{" "}
              <strong>
                ₹
                {
                  invoice?.totalAmount
                }
              </strong>
            </p>

            <hr />

            <h3>
              Select Payment Method
            </h3>

            {/* UPI */}

            <label
              style={{
                display:
                  "block",
                margin:
                  "12px 0"
              }}
            >

              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={
                  paymentMethod ===
                  "UPI"
                }
                onChange={
                  (e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                }
              />

              {" "}
              UPI

            </label>

            {/* CARD */}

            <label
              style={{
                display:
                  "block",
                margin:
                  "12px 0"
              }}
            >

              <input
                type="radio"
                name="payment"
                value="Card"
                checked={
                  paymentMethod ===
                  "Card"
                }
                onChange={
                  (e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                }
              />

              {" "}
              Card

            </label>

            {/* CASH */}

            <label
              style={{
                display:
                  "block",
                margin:
                  "12px 0"
              }}
            >

              <input
                type="radio"
                name="payment"
                value="Cash"
                checked={
                  paymentMethod ===
                  "Cash"
                }
                onChange={
                  (e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                }
              />

              {" "}
              Cash

            </label>

            {/* ===============================
                BUTTONS
            =============================== */}

            <div
              style={{
                display:
                  "flex",
                gap:
                  "10px",
                marginTop:
                  "25px"
              }}
            >

              <button
                onClick={
                  confirmPayment
                }
                disabled={
                  paymentLoading
                }
                style={{
                  flex: 1,
                  padding:
                    "12px",
                  background:
                    "#16a34a",
                  color:
                    "white",
                  border:
                    "none",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer"
                }}
              >

                {paymentLoading
                  ? "Processing..."
                  : "Confirm Payment"}

              </button>

              <button
                onClick={() =>
                  setShowPaymentPopup(
                    false
                  )
                }
                disabled={
                  paymentLoading
                }
                style={{
                  flex: 1,
                  padding:
                    "12px",
                  background:
                    "#6b7280",
                  color:
                    "white",
                  border:
                    "none",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer"
                }}
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Billing;
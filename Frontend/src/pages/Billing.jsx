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
loadBillingData();
}, []);

const loadBillingData = () => {
try {
const orderData = JSON.parse(
localStorage.getItem("currentOrder")
);


  const userData = JSON.parse(
    localStorage.getItem("user")
  );

  console.log("Current Order:", orderData);
  console.log("Current User:", userData);

  setOrder(orderData);
  setUser(userData);

  // Reset page state when there is no active order
  if (!orderData) {
    setInvoice(null);
    setPaymentSuccess(false);
  }
} catch (err) {
  console.error(
    "Failed to load billing data:",
    err
  );

  setError(
    "Failed to load billing information."
  );
}


};

// ===============================
// GET ORDER DATA
// ===============================

const orderId = order?.orderId;

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
      "No active order found. Please place an order first."
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
      response.totalAmount ||
      totalAmount,

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
// CLEAR COMPLETED BILL
// ===============================

const clearCompletedBill = () => {
console.log(
"Clearing completed order and billing data..."
);


// Clear current order
localStorage.removeItem(
  "currentOrder"
);

// Clear order ID
localStorage.removeItem(
  "orderId"
);

// Clear billing amount
localStorage.removeItem(
  "billingAmount"
);

// Clear cart
localStorage.removeItem(
  "cart"
);

// Clear React state
setOrder(null);

setInvoice(null);

setPaymentSuccess(
  false
);

setShowPaymentPopup(
  false
);


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

  setInvoice(
    (previousInvoice) => ({
      ...previousInvoice,

      paymentStatus:
        "Paid",

      paymentMethod:
        paymentMethod
    })
  );

  // ===============================
  // CLOSE PAYMENT POPUP
  // ===============================

  setShowPaymentPopup(
    false
  );

  // ===============================
  // SHOW SUCCESS MESSAGE
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

  /*
    IMPORTANT:

    We DO NOT clear currentOrder
    immediately here.

    This allows the user to see
    the successful payment details.

    The user can then click
    "Finish" and the completed
    billing data will be removed.
  */
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

// ===============================
// NO ACTIVE ORDER
// ===============================

if (!order) {
return ( <div className="billing-page">


    <h1>
      Billing
    </h1>

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

    <div className="billing-card">

      <h2>
        No Active Order
      </h2>

      <p>
        There is no active order available
        for billing.
      </p>

      <p>
        Please add medicines to your cart
        and place a new order.
      </p>

    </div>

  </div>
);


}

return ( <div className="billing-page">


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

      {/* ===============================
          FINISH BILLING
      =============================== */}

      <button
        className="generate-bill-btn"
        onClick={
          clearCompletedBill
        }
        style={{
          marginTop:
            "20px",
          background:
            "#16a34a"
        }}
      >
        Finish
      </button>

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

import React, { useEffect, useState } from "react";
import { billingAPI } from "../services/api";
import "./Billing.css";

function Billing() {
const [order, setOrder] = useState(null);
const [user, setUser] = useState(null);
const [invoice, setInvoice] = useState(null);

const [showPaymentPopup, setShowPaymentPopup] =
useState(false);

const [paymentMethod, setPaymentMethod] =
useState("UPI");

const [paymentLoading, setPaymentLoading] =
useState(false);

const [paymentSuccess, setPaymentSuccess] =
useState(false);

const [error, setError] = useState("");

// ==========================================
// LOAD USER
// ==========================================

useEffect(() => {
const savedUser =
localStorage.getItem("user");


if (savedUser) {
  try {
    setUser(JSON.parse(savedUser));
  } catch (err) {
    console.error(
      "User data error:",
      err
    );
  }
}


}, []);

// ==========================================
// LOAD ORDER
// ==========================================

useEffect(() => {
loadCurrentOrder();


// Check again when window gets focus
const handleFocus = () => {
  loadCurrentOrder();
};

window.addEventListener(
  "focus",
  handleFocus
);

return () => {
  window.removeEventListener(
    "focus",
    handleFocus
  );
};


}, []);

// ==========================================
// LOAD CURRENT ORDER FROM LOCAL STORAGE
// ==========================================

const loadCurrentOrder = () => {
const savedOrder =
localStorage.getItem(
"currentOrder"
);


console.log(
  "Loading currentOrder:",
  savedOrder
);

if (
  !savedOrder ||
  savedOrder === "null" ||
  savedOrder === "undefined"
) {
  setOrder(null);
  setInvoice(null);
  setPaymentSuccess(false);
  return;
}

try {
  const parsedOrder =
    JSON.parse(savedOrder);

  setOrder(parsedOrder);
} catch (err) {
  console.error(
    "Invalid currentOrder:",
    err
  );

  setOrder(null);
}


};

// ==========================================
// ORDER DETAILS
// ==========================================

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

// ==========================================
// GENERATE BILL
// ==========================================

const generateBill = async () => {
try {
setError("");


  if (!order) {
    alert(
      "No active order found."
    );
    return;
  }

  if (!orderId) {
    alert(
      "Order ID not found."
    );
    return;
  }

  if (
    !user?.id &&
    !user?._id
  ) {
    alert(
      "User information not found."
    );
    return;
  }

  if (
    totalAmount <= 0
  ) {
    alert(
      "Invalid order amount."
    );
    return;
  }

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

  const response =
    await billingAPI.create(
      billData
    );

  console.log(
    "Invoice Created:",
    response
  );

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

  setShowPaymentPopup(
    true
  );
} catch (err) {
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

// ==========================================
// CONFIRM PAYMENT
// ==========================================

const confirmPayment = async () => {
try {
setPaymentLoading(true);
setError("");


  if (!invoice?.id) {
    alert(
      "Invoice ID not found."
    );

    return;
  }

  // UPDATE PAYMENT METHOD
  await billingAPI.updatePaymentMethod(
    invoice.id,
    {
      payment_method:
        paymentMethod
    }
  );

  // UPDATE PAYMENT STATUS
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

  // ==========================================
  // CLEAR ALL OLD BILLING DATA
  // ==========================================

  localStorage.removeItem(
    "currentOrder"
  );

  localStorage.removeItem(
    "orderId"
  );

  localStorage.removeItem(
    "billingAmount"
  );

  localStorage.removeItem(
    "cart"
  );

  console.log(
    "Cleared currentOrder:",
    localStorage.getItem(
      "currentOrder"
    )
  );

  // ==========================================
  // CLEAR REACT STATE
  // ==========================================

  setOrder(null);

  setInvoice(null);

  setPaymentSuccess(false);

  setShowPaymentPopup(false);

  // ==========================================
  // SUCCESS MESSAGE
  // ==========================================

  alert(
    "Payment successful! Bill completed."
  );

} catch (err) {
  console.error(
    "Payment failed:",
    err
  );

  setError(
    err.message ||
    "Payment failed"
  );
} finally {
  setPaymentLoading(
    false
  );
}


};

// ==========================================
// NO ACTIVE ORDER
// ==========================================

if (!order) {
return ( <div className="billing-page">


    <h1>
      Billing
    </h1>

    <div className="billing-card">

      <h2>
        No Active Bill
      </h2>

      <p>
        There is no pending order
        available for billing.
      </p>

      <p>
        Please place a new order
        from the Medicines page.
      </p>

    </div>

  </div>
);


}

// ==========================================
// BILLING PAGE
// ==========================================

return ( <div className="billing-page">


  <h1>
    Billing
  </h1>

  {/* ERROR */}

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

  {/* CUSTOMER */}

  <div className="billing-card">

    <h2>
      Customer Details
    </h2>

    <p>
      Name:{" "}
      {customerName}
    </p>

    <p>
      Role:{" "}
      {user?.role ||
        "USER"}
    </p>

  </div>

  {/* ORDER */}

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
            ₹{totalAmount}
          </td>

        </tr>

      </tbody>

    </table>

    <h2
      className="billing-total"
    >
      Total Payable:
      ₹{totalAmount}
    </h2>

    {!invoice && (
      <button
        className="generate-bill-btn"
        onClick={
          generateBill
        }
      >
        Generate Bill
      </button>
    )}

  </div>

  {/* PAYMENT SUCCESS */}

  {paymentSuccess && (
    <div className="billing-card">

      <h2>
        Payment Successful ✅
      </h2>

    </div>
  )}

  {/* PAYMENT POPUP */}

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
            "white",
          padding:
            "30px",
          borderRadius:
            "15px",
          width:
            "400px",
          maxWidth:
            "90%"
        }}
      >

        <h2>
          Payment
        </h2>

        <p>
          Invoice Number:
          {" "}
          <strong>
            {
              invoice?.invoiceNumber
            }
          </strong>
        </p>

        <p>
          Amount:
          {" "}
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

        <label>

          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={
              paymentMethod ===
              "UPI"
            }
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          {" "}
          UPI

        </label>

        <br />

        <label>

          <input
            type="radio"
            name="payment"
            value="Card"
            checked={
              paymentMethod ===
              "Card"
            }
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          {" "}
          Card

        </label>

        <br />

        <label>

          <input
            type="radio"
            name="payment"
            value="Cash"
            checked={
              paymentMethod ===
              "Cash"
            }
            onChange={(e) =>
              setPaymentMethod(
                e.target.value
              )
            }
          />

          {" "}
          Cash

        </label>

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
                "8px"
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
                "8px"
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

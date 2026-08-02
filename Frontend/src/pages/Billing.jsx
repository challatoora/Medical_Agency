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
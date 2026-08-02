import React, { useEffect, useState } from "react";
import { orderAPI } from "../services/api";
import "./Cart.css";

function Cart({ setCurrentPage }) {
  const [cart, setCart] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);

  // ===============================
  // LOAD CART
  // ===============================

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const data =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(data);
  };

  // ===============================
  // UPDATE QUANTITY
  // ===============================

  const updateQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        let quantity =
          Number(item.cartQuantity) || 1;

        if (type === "plus") {
          quantity++;
        }

        if (type === "minus" && quantity > 1) {
          quantity--;
        }

        return {
          ...item,
          cartQuantity: quantity,
        };
      }

      return item;
    });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // ===============================
  // REMOVE ITEM
  // ===============================

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // ===============================
  // TOTAL AMOUNT
  // ===============================

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.cartQuantity || 1),
    0
  );

  // ===============================
  // PROCEED TO BILLING / CREATE ORDER
  // ===============================

  const proceedToBilling = async () => {
    try {
      setPlacingOrder(true);

      // ===============================
      // GET LOGGED-IN USER
      // ===============================

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      console.log(
        "Logged-in user:",
        user
      );

      // ===============================
      // CHECK USER
      // ===============================

      if (!user) {
        alert("Please login first");
        return;
      }

      // ===============================
      // CHECK USER ID
      // ===============================

      if (!user.id) {
        alert(
          "User ID not found. Please logout and login again."
        );

        console.error(
          "User object does not contain id:",
          user
        );

        return;
      }

      // ===============================
      // CHECK CART
      // ===============================

      if (cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      // ===============================
      // MEDICINE NAMES
      // ===============================

      const medicineNames = cart
        .map((item) => item.name)
        .join(", ");

      // ===============================
      // TOTAL QUANTITY
      // ===============================

      const totalQuantity = cart.reduce(
        (total, item) =>
          total +
          Number(item.cartQuantity || 1),
        0
      );

      // ===============================
      // CREATE ORDER DATA
      // ===============================

      const orderData = {
        // IMPORTANT:
        // This stores the logged-in user's ID
        user_id: user.id,

        customer_name:
          user.name || "Customer",

        medicine_name:
          medicineNames,

        quantity:
          totalQuantity,

        total_price:
          totalAmount,

        status:
          "Pending",
      };

      console.log(
        "Creating Order:",
        orderData
      );

      // ===============================
      // CREATE ORDER IN DATABASE
      // ===============================

      const response =
        await orderAPI.create(
          orderData
        );

      console.log(
        "Order Created:",
        response
      );

      // ===============================
      // GET ORDER ID
      // ===============================

      const orderId =
        response.orderId ||
        response.order_id ||
        response.id ||
        response.insertId;

      if (!orderId) {
        console.error(
          "Order response does not contain ID:",
          response
        );

        alert(
          "Order created but Order ID was not returned."
        );

        return;
      }

      // ===============================
      // SAVE ORDER ID
      // ===============================

      localStorage.setItem(
        "orderId",
        orderId
      );

      // ===============================
      // SAVE CURRENT ORDER
      // ===============================

      localStorage.setItem(
        "currentOrder",
        JSON.stringify({
          orderId: orderId,

          userId: user.id,

          customerName:
            user.name || "Customer",

          medicineName:
            medicineNames,

          quantity:
            totalQuantity,

          totalAmount:
            totalAmount,

          orderStatus:
            "Pending",
        })
      );

      // ===============================
      // CLEAR CART
      // ===============================

      localStorage.removeItem("cart");

      setCart([]);

      // ===============================
      // GO TO BILLING
      // ===============================

      setCurrentPage("Billing");
    } catch (err) {
      console.error(
        "Order creation failed:",
        err
      );

      alert(
        err.message ||
          "Failed to create order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // ===============================
  // UI
  // ===============================

  return (
    <div className="cart-page">

      <h1>
        Shopping Cart
      </h1>

      {cart.length === 0 ? (

        <div className="cart-card">

          <h2>
            Your cart is empty
          </h2>

        </div>

      ) : (

        <div className="cart-card">

          <table className="cart-table">

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
                  Total
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {cart.map((item) => (

                <tr
                  key={item._id}
                >

                  <td>
                    {item.name}
                  </td>

                  <td>
                    ₹{item.price}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          "minus"
                        )
                      }
                    >
                      -
                    </button>

                    <span
                      style={{
                        margin: "0 10px",
                      }}
                    >
                      {item.cartQuantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          "plus"
                        )
                      }
                    >
                      +
                    </button>

                  </td>

                  <td>

                    ₹
                    {Number(item.price) *
                      Number(
                        item.cartQuantity || 1
                      )}

                  </td>

                  <td>

                    <button
                      className="delete-medicine-btn"
                      onClick={() =>
                        removeItem(
                          item._id
                        )
                      }
                    >
                      Remove
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="cart-total">

            Total Amount:
            ₹{totalAmount}

          </div>

          <button
            className="checkout-btn"
            onClick={
              proceedToBilling
            }
            disabled={
              placingOrder
            }
          >

            {placingOrder
              ? "Creating Order..."
              : "Proceed To Billing"}

          </button>

        </div>

      )}

    </div>
  );
}

export default Cart;

import React, { useEffect, useState } from "react";
import { orderAPI, billingAPI } from "../services/api";
import "./Cart.css";

function Cart({ setCurrentPage }) {

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    loadCart();

  }, []);


  const loadCart = () => {

    const data =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(data);

  };


  // ==============================
  // UPDATE QUANTITY
  // ==============================

  const updateQuantity = (id, type) => {

    const updatedCart = cart.map((item) => {

      if (item._id === id) {

        let quantity =
          Number(item.cartQuantity) || 1;


        if (type === "plus") {

          quantity++;

        }


        if (
          type === "minus" &&
          quantity > 1
        ) {

          quantity--;

        }


        return {

          ...item,

          cartQuantity: quantity

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


  // ==============================
  // REMOVE ITEM
  // ==============================

  const removeItem = (id) => {

    const updatedCart =
      cart.filter(
        (item) =>
          item._id !== id
      );


    setCart(updatedCart);


    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };


  // ==============================
  // TOTAL
  // ==============================

  const totalAmount =
    cart.reduce(

      (total, item) =>

        total +

        Number(item.price) *

        Number(
          item.cartQuantity || 1
        ),

      0

    );


  // ==============================
  // CREATE ORDER + PAYMENT
  // ==============================

  const createOrderAndPayment =
    async () => {

      try {

        setLoading(true);


        // GET LOGGED-IN USER

        const userData =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );


        const customerName =
          userData?.name ||
          "Customer";


        const userId =
          userData?.id ||
          userData?._id;


        if (!userId) {

          alert(
            "User information not found. Please login again."
          );

          return;

        }


        // ==============================
        // PREPARE ORDER DATA
        // ==============================

        const medicineNames =
          cart
            .map(
              (item) =>
                item.name
            )
            .join(", ");


        const totalQuantity =
          cart.reduce(

            (sum, item) =>

              sum +

              Number(
                item.cartQuantity || 1
              ),

            0

          );


        // ==============================
        // CREATE ORDER
        // ==============================

        const orderData = {

          customer_name:
            customerName,

          medicine_name:
            medicineNames,

          quantity:
            totalQuantity,

          total_price:
            totalAmount,

          status:
            "Pending"

        };


        const orderResponse =
          await orderAPI.create(
            orderData
          );


        console.log(
          "Order Created:",
          orderResponse
        );


        const orderId =
          orderResponse.orderId;


        if (!orderId) {

          throw new Error(
            "Order ID was not returned"
          );

        }


        // ==============================
        // CREATE INVOICE
        // ==============================

        const invoiceData = {

          order_id:
            orderId,

          user_id:
            userId,

          subtotal:
            totalAmount,

          tax_amount:
            0,

          discount_amount:
            0,

          payment_status:
            "SUCCESS",

          payment_method:
            "Dummy Payment"

        };


        const invoiceResponse =
          await billingAPI.create(
            invoiceData
          );


        console.log(
          "Invoice Created:",
          invoiceResponse
        );


        // ==============================
        // PAYMENT SUCCESS
        // ==============================

        alert(

          "Payment Successful!\n\n" +

          "Invoice Number: " +

          invoiceResponse.invoiceNumber +

          "\n\n" +

          "Order Status: Pending\n\n" +

          "Admin will complete your order."

        );


        // ==============================
        // CLEAR CART
        // ==============================

        localStorage.removeItem(
          "cart"
        );


        setCart([]);


        // ==============================
        // GO TO ORDERS
        // ==============================

        setCurrentPage(
          "Orders"
        );


      } catch (error) {

        console.error(
          "Order/Payment Error:",
          error
        );


        alert(
          error.message ||
          "Failed to create order"
        );

      } finally {

        setLoading(false);

      }

    };


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

          <table
            className="cart-table"
          >

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

              {cart.map(
                (item) => (

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
                          margin:
                            "0 10px"
                        }}
                      >

                        {
                          item.cartQuantity
                        }

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
                      {
                        Number(
                          item.price
                        ) *

                        Number(
                          item.cartQuantity
                        )
                      }

                    </td>


                    <td>

                      <button

                        className=
                          "delete-medicine-btn"

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

                )
              )}

            </tbody>

          </table>


          <div
            className="cart-total"
          >

            Total Amount:
            ₹{totalAmount}

          </div>


          <button

            className=
              "checkout-btn"

            onClick={
              createOrderAndPayment
            }

            disabled={loading}

          >

            {loading

              ? "Processing Payment..."

              : "Proceed To Payment"

            }

          </button>


        </div>

      )}

    </div>

  );

}


export default Cart;
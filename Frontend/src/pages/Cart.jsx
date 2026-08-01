import React, { useEffect, useState } from "react";
import "./Cart.css";


function Cart({ setCurrentPage }) {


  const [cart, setCart] = useState([]);



  useEffect(() => {

    loadCart();

  }, []);



  const loadCart = () => {

    const data =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(data);

  };




  const updateQuantity = (id, type) => {


    const updatedCart = cart.map(item => {


      if (item._id === id) {


        let quantity = item.cartQuantity;


        if (type === "plus") {

          quantity++;

        }


        if (type === "minus" && quantity > 1) {

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







  const removeItem = (id) => {


    const updatedCart = cart.filter(

      item => item._id !== id

    );



    setCart(updatedCart);



    localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)

    );


  };







  const totalAmount = cart.reduce(

    (total, item) =>

      total +

      (
        Number(item.price) *
        Number(item.cartQuantity)
      ),

    0

  );






  return (


    <div className="cart-page">


      <h1>
        Shopping Cart
      </h1>




      {
        cart.length === 0 ?


        (

          <div className="cart-card">

            <h2>
              Your cart is empty
            </h2>

          </div>


        )


        :


        (


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


            {

              cart.map(item => (


                <tr key={item._id}>


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


                    &nbsp;

                    {item.cartQuantity}

                    &nbsp;


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
                      item.price *
                      item.cartQuantity
                    }

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


              ))

            }


            </tbody>


          </table>






          <div className="cart-total">


            Total Amount :

            ₹{totalAmount}


          </div>







          <button

          className="checkout-btn"

          onClick={() => {

            setCurrentPage("Billing");

          }}

          >

            Proceed To Billing

          </button>





        </div>


        )


      }



    </div>


  );

}



export default Cart;
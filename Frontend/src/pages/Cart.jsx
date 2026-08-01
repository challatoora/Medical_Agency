// import React, { useEffect, useState } from "react";
// import "./Cart.css";
// import { orderAPI, billingAPI } from "../services/api";

// function Cart({ setCurrentPage }) {


//   const [cart, setCart] = useState([]);



//   useEffect(() => {

//     loadCart();

//   }, []);



//   const loadCart = () => {

//     const data =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     setCart(data);

//   };




//   const updateQuantity = (id, type) => {


//     const updatedCart = cart.map(item => {


//       if (item._id === id) {


//         let quantity = item.cartQuantity;


//         if (type === "plus") {

//           quantity++;

//         }


//         if (type === "minus" && quantity > 1) {

//           quantity--;

//         }



//         return {

//           ...item,

//           cartQuantity: quantity

//         };


//       }


//       return item;


//     });



//     setCart(updatedCart);


//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedCart)
//     );


//   };







//   const removeItem = (id) => {


//     const updatedCart = cart.filter(

//       item => item._id !== id

//     );



//     setCart(updatedCart);



//     localStorage.setItem(

//       "cart",

//       JSON.stringify(updatedCart)

//     );


//   };







//   const totalAmount = cart.reduce(

//     (total, item) =>

//       total +

//       (
//         Number(item.price) *
//         Number(item.cartQuantity)
//       ),

//     0

//   );

// const checkout = async () => {

//   try {

//     const user =
//       JSON.parse(localStorage.getItem("user"));


//     const medicineNames = cart
//       .map(item => item.name)
//       .join(", ");


//     const totalQuantity = cart.reduce(
//       (sum,item)=>
//         sum + Number(item.cartQuantity),
//       0
//     );


//     // CREATE ORDER

//     const orderResponse =
//       await orderAPI.create({

//         customer_name:
//           user?.name || "Customer",

//         medicine_name:
//           medicineNames,

//         quantity:
//           totalQuantity,

//         total_price:
//           totalAmount,

//         status:
//           "Pending"

//       });



//     if(!orderResponse.orderId){

//       alert("Order creation failed");

//       return;

//     }



//     // CREATE BILLING

//     const billingResponse =
//       await billingAPI.create({

//         order_id:
//           orderResponse.orderId,

//         user_id:
//           user?.id || 1,

//         subtotal:
//           totalAmount,

//         tax_amount:
//           totalAmount * 0.18,

//         discount_amount:
//           0,

//         payment_status:
//           "Pending",

//         payment_method:
//           "Cash"

//       });



//     if(billingResponse.invoiceId){

//       alert(
//         "Order and Invoice created successfully"
//       );


//       localStorage.removeItem("cart");


//       setCart([]);


//       setCurrentPage("Billing");

//     }



//   }
//   catch(err){

//     console.error(err);

//     alert(
//       "Checkout failed"
//     );

//   }

// };




//   return (


//     <div className="cart-page">


//       <h1>
//         Shopping Cart
//       </h1>




//       {
//         cart.length === 0 ?


//         (

//           <div className="cart-card">

//             <h2>
//               Your cart is empty
//             </h2>

//           </div>


//         )


//         :


//         (


//         <div className="cart-card">


//           <table className="cart-table">


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
//                   Total
//                 </th>


//                 <th>
//                   Action
//                 </th>


//               </tr>


//             </thead>





//             <tbody>


//             {

//               cart.map(item => (


//                 <tr key={item._id}>


//                   <td>

//                     {item.name}

//                   </td>



//                   <td>

//                     ₹{item.price}

//                   </td>




//                   <td>


//                     <button

//                     onClick={() =>
//                       updateQuantity(
//                         item._id,
//                         "minus"
//                       )
//                     }

//                     >
//                       -
//                     </button>


//                     &nbsp;

//                     {item.cartQuantity}

//                     &nbsp;


//                     <button

//                     onClick={() =>
//                       updateQuantity(
//                         item._id,
//                         "plus"
//                       )
//                     }

//                     >
//                       +
//                     </button>


//                   </td>





//                   <td>

//                     ₹
//                     {
//                       item.price *
//                       item.cartQuantity
//                     }

//                   </td>





//                   <td>


//                     <button

//                     className="delete-medicine-btn"

//                     onClick={() =>
//                       removeItem(
//                         item._id
//                       )
//                     }

//                     >

//                     Remove

//                     </button>


//                   </td>




//                 </tr>


//               ))

//             }


//             </tbody>


//           </table>






//           <div className="cart-total">


//             Total Amount :

//             ₹{totalAmount}


//           </div>







//           <button

//           className="checkout-btn"

//           onClick={() => {

//             setCurrentPage("Billing");

//           }}

//           >

//             Proceed To Billing

//           </button>





//         </div>


//         )


//       }



//     </div>


//   );

// }



// export default Cart;

import React, { useEffect, useState } from "react";
import "./Cart.css";


function Cart({ setCurrentPage }) {


  const [cart, setCart] = useState([]);



  useEffect(() => {

    loadCart();

  }, []);



  const loadCart = () => {

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);

  };




  const saveCart = (updatedCart) => {

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };





  const increaseQuantity = (id) => {


    const updatedCart = cart.map(item => {


      if(item._id === id){


        return {

          ...item,

          cartQuantity:
            item.cartQuantity + 1

        };


      }


      return item;


    });



    saveCart(updatedCart);


  };






  const decreaseQuantity = (id) => {


    const updatedCart = cart.map(item => {


      if(item._id === id){


        return {

          ...item,

          cartQuantity:
          item.cartQuantity > 1
          ?
          item.cartQuantity - 1
          :
          1

        };


      }


      return item;


    });



    saveCart(updatedCart);


  };







  const removeFromCart = (id) => {


    const updatedCart =
      cart.filter(
        item => item._id !== id
      );



    saveCart(updatedCart);


  };







  const totalAmount = cart.reduce(

    (sum,item)=>{

      return (
        sum +
        Number(item.price) *
        Number(item.cartQuantity)
      );

    },

    0

  );






  return (


    <div className="cart-page">


      <div className="cart-header">

        <h1>
          My Cart
        </h1>

        <p>
          Review medicines before billing
        </p>

      </div>






      {
        cart.length === 0 ?


        (

          <div className="cart-card">

            <h2>
              Cart is empty
            </h2>


            <button

              className="checkout-btn"

              onClick={() =>
                setCurrentPage("Medicines")
              }

            >

              Browse Medicines

            </button>


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
                  Amount
                </th>


                <th>
                  Action
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


                    <button

                      onClick={() =>
                        decreaseQuantity(
                          item._id
                        )
                      }

                    >

                      -

                    </button>



                    <span className="cart-qty">

                      {item.cartQuantity}

                    </span>





                    <button

                      onClick={() =>
                        increaseQuantity(
                          item._id
                        )
                      }

                    >

                      +

                    </button>



                  </td>







                  <td>


                    ₹
                    {
                      Number(item.price) *
                      Number(item.cartQuantity)
                    }


                  </td>







                  <td>


                    <button

                      className="delete-medicine-btn"

                      onClick={() =>
                        removeFromCart(
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








          <div className="cart-summary">


            <h2>

              Total :

              ₹{totalAmount}

            </h2>






            <button

              className="checkout-btn"


              onClick={() => {


                localStorage.setItem(

                  "billingAmount",

                  totalAmount

                );


                setCurrentPage(
                  "Billing"
                );


              }}


            >

              Proceed To Billing

            </button>



          </div>





        </div>


        )

      }



    </div>


  );


}


export default Cart;
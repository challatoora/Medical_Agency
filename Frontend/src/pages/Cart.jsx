// import React, { useEffect, useState } from "react";
// import Cart from "./pages/Cart";
// import "./Cart.css";


// function Cart({ setCurrentPage }) {


//   const [cart, setCart] = useState([]);



//   useEffect(() => {

//     loadCart();

//   }, []);

//   const loadCart = () => {

//     const savedCart =
//       JSON.parse(localStorage.getItem("cart")) || [];

//     setCart(savedCart);

//   };

//   const saveCart = (updatedCart) => {

//     setCart(updatedCart);

//     localStorage.setItem(
//       "cart",
//       JSON.stringify(updatedCart)
//     );

//   };

//   const increaseQuantity = (id) => {


//     const updatedCart = cart.map(item => {


//       if(item._id === id){


//         return {

//           ...item,

//           cartQuantity:
//             item.cartQuantity + 1

//         };


//       }


//       return item;


//     });



//     saveCart(updatedCart);


//   };


//   const decreaseQuantity = (id) => {


//     const updatedCart = cart.map(item => {


//       if(item._id === id){


//         return {

//           ...item,

//           cartQuantity:
//           item.cartQuantity > 1
//           ?
//           item.cartQuantity - 1
//           :
//           1

//         };


//       }


//       return item;


//     });



//     saveCart(updatedCart);


//   };


//   const removeFromCart = (id) => {


//     const updatedCart =
//       cart.filter(
//         item => item._id !== id
//       );



//     saveCart(updatedCart);


//   };

//   const totalAmount = cart.reduce(

//     (sum,item)=>{

//       return (
//         sum +
//         Number(item.price) *
//         Number(item.cartQuantity)
//       );

//     },

//     0

//   );






//   return (


//     <div className="cart-page">


//       <div className="cart-header">

//         <h1>
//           My Cart
//         </h1>

//         <p>
//           Review medicines before billing
//         </p>

//       </div>






//       {
//         cart.length === 0 ?


//         (

//           <div className="cart-card">

//             <h2>
//               Cart is empty
//             </h2>


//             <button

//               className="checkout-btn"

//               onClick={() =>
//                 setCurrentPage("Medicines")
//               }

//             >

//               Browse Medicines

//             </button>


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
//                   Amount
//                 </th>


//                 <th>
//                   Action
//                 </th>


//               </tr>

//             </thead>







//             <tbody>


//             {

//               cart.map(item=>(


//                 <tr key={item._id}>


//                   <td>

//                     {item.name}

//                   </td>





//                   <td>

//                     ₹{item.price}

//                   </td>






//                   <td>


//                     <button

//                       onClick={() =>
//                         decreaseQuantity(
//                           item._id
//                         )
//                       }

//                     >

//                       -

//                     </button>



//                     <span className="cart-qty">

//                       {item.cartQuantity}

//                     </span>





//                     <button

//                       onClick={() =>
//                         increaseQuantity(
//                           item._id
//                         )
//                       }

//                     >

//                       +

//                     </button>



//                   </td>







//                   <td>


//                     ₹
//                     {
//                       Number(item.price) *
//                       Number(item.cartQuantity)
//                     }


//                   </td>







//                   <td>


//                     <button

//                       className="delete-medicine-btn"

//                       onClick={() =>
//                         removeFromCart(
//                           item._id
//                         )
//                       }

//                     >

//                       Remove

//                     </button>



//                   </td>




//                 </tr>


//               ))

//             }


//             </tbody>


//           </table>








//           <div className="cart-summary">


//             <h2>

//               Total :

//               ₹{totalAmount}

//             </h2>






//             <button

//               className="checkout-btn"


//               onClick={() => {


//                 localStorage.setItem(

//                   "billingAmount",

//                   totalAmount

//                 );


//                 setCurrentPage(
//                   "Billing"
//                 );


//               }}


//             >

//               Proceed To Billing

//             </button>



//           </div>





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
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  };

  const updateQuantity = (id, type) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        let quantity = Number(item.cartQuantity) || 1;

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
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

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

  const totalAmount = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.cartQuantity || 1),
    0
  );

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-card">
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <div className="cart-card">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>

                  <td>₹{item.price}</td>

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

                    <span style={{ margin: "0 10px" }}>
                      {item.cartQuantity}
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
                      Number(item.cartQuantity)}
                  </td>

                  <td>
                    <button
                      className="delete-medicine-btn"
                      onClick={() =>
                        removeItem(item._id)
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
            Total Amount: ₹{totalAmount}
          </div>

          <button
            className="checkout-btn"
            onClick={() =>
              setCurrentPage("Billing")
            }
          >
            Proceed To Billing
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
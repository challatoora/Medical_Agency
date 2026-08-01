import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {


  const [cart,setCart] = useState([]);



  useEffect(()=>{

    const data =
    JSON.parse(localStorage.getItem("cart")) || [];

    setCart(data);

  },[]);




  const updateQuantity=(id,type)=>{


    let updated = cart.map(item=>{


      if(item._id===id){


        let qty=item.cartQuantity;


        if(type==="plus"){

          qty++;

        }
        else{

          qty--;

        }


        if(qty<1)
          qty=1;



        return {

          ...item,

          cartQuantity:qty

        };


      }


      return item;


    });



    setCart(updated);


    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );


  };





  const removeItem=(id)=>{


    const updated =
    cart.filter(
      item=>item._id!==id
    );


    setCart(updated);


    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );


  };





  const total = cart.reduce(

    (sum,item)=>

    sum +
    (
      Number(item.price)
      *
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

cart.length===0 ?


<h3>
Cart is empty
</h3>


:


<div className="cart-card">


<table>


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
onClick={()=>
updateQuantity(
item._id,
"minus"
)
}
>

-

</button>



<span>

 {item.cartQuantity}

</span>



<button
onClick={()=>
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

onClick={()=>
removeItem(item._id)
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



<h2>

Total Amount :
₹{total}

</h2>



<button className="checkout-btn">

Proceed To Billing

</button>



</div>


}



</div>


);


}


export default Cart;
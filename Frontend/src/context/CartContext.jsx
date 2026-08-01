import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);


  // ADD TO CART
  const addToCart = (medicine) => {

    setCartItems((prev) => {

      const existing = prev.find(
        item => item._id === medicine._id
      );


      if (existing) {

        return prev.map(item =>
          item._id === medicine._id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + 1
              }
            : item
        );

      }


      return [
        ...prev,
        {
          ...medicine,
          cartQuantity: 1
        }
      ];

    });

  };


  // REMOVE FROM CART
  const removeFromCart = (id) => {

    setCartItems(prev =>
      prev.filter(
        item => item._id !== id
      )
    );

  };


  // UPDATE QUANTITY
  const updateQuantity = (id, quantity) => {

    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? {
              ...item,
              cartQuantity: quantity
            }
          : item
      )
    );

  };


  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };


  // TOTAL PRICE
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (item.price * item.cartQuantity),
    0
  );


  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount
      }}
    >

      {children}

    </CartContext.Provider>

  );

}


// Hook
export function useCart(){

  return useContext(CartContext);

}
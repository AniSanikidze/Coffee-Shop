import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CLEAR_CART
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Add to Cart
  export const addItemsToCart = (id, quantity,coffeeType) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/coffee/${id}`);
    // console.log(data.retrievedcoffee)
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        productId: data.retrievedcoffee._id,
        productName: data.retrievedcoffee.productName,
        price: data.retrievedcoffee.price,
        img: data.retrievedcoffee.img,
        stock: data.retrievedcoffee.Stock,
        quantity: quantity,
        coffeeType: coffeeType,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };
  
  // REMOVE FROM CART
  export const removeItemsFromCart = (id, coffeeType) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: {
          productId: id,
          coffeeType: coffeeType
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const clearCart = () => async (dispatch, getState) => {
    dispatch({
      type: CLEAR_CART,
      payload: [],
    });  
    localStorage.setItem("cartItems", []);
  };
  
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (address,city,phoneNumber) => async (dispatch,getState) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: {
        address: address,
        city: city,
        phoneNumber: phoneNumber
      }
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify({
        address: address,
        city: city,
        phoneNumber: phoneNumber
    }));
  };
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CLEAR_CART
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.productId === item.productId && i.coffeeType === item.coffeeType
        );
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              (i.productId === isItemExist.productId && i.coffeeType === isItemExist.coffeeType) ? action.payload : i
            ),
          };
        } else {  
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => (i.productId !== action.payload.productId || i.coffeeType !== action.payload.coffeeType))
        };

      case CLEAR_CART:
        return {
          ...state,
          cartItems: []
        }
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstants";
  
  export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
        // console.log(action.payload)
  
        const isItemExist = state.cartItems.find(
          (i) => i.productId === item.productId && i.coffeeType === item.coffeeType
        );
  
        if (isItemExist) {
        //   console.log(state.cartItems.map((i) =>
        //   (i.product === isItemExist.product || i.coffeeType === isItemExist.coffeeType) ? action.payload : i
        // ))
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              (i.productId === isItemExist.productId && i.coffeeType === isItemExist.coffeeType) ? action.payload : i
            ),
          };
        } else {  
                        console.log(isItemExist)

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
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };
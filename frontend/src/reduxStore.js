import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productInfoReducer, coffeeReducer, newReviewReducer,newProductReducer,productReducer} from './reducers/productReducer'
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducer'
import { allOrdersReducer, newOrderReducer, userOrdersReducer } from './reducers/orderReducer'
import { specificOrderReducer,orderReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    products: coffeeReducer,
    product: productInfoReducer,
    user: userReducer,
    account: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    userOrders: userOrdersReducer,
    specificOrder: specificOrderReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    adminProduct: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
})

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
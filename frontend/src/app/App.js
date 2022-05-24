import React, { useState, useEffect } from 'react';
import './App.css';
import Home from '../pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Coffees from '../pages/Coffees';
import ScrollToTop from '../components/ScrollToTop';
import UserAccount from '../pages/UserAccount'
import { UserContext } from '../UserContext';
import ShopCategories from '../pages/shopCategories';
import ProductPage from '../pages/ProductPage'
import Form from '../pages/Account';
import SignUp from '../pages/SignUp'
import Cart from '../pages/Cart'
import {loadUser} from '../actions/userAction'
import store from '../reduxStore'
import ProtectedRoute from '../components/route/protectedRoute';
import ForgotPassword from '../pages/ForgotPassword';
import PasswordReset from '../pages/PasswordReset';
import Checkout from '../pages/Checkout';
import ConfirmOrder from '../components/checkout/ConfirmOrder';
import axios from "axios";
import PaymentProcessing from '../components/checkout/PaymentProcess';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from '../pages/OrderSuccess';
import OrderDetails from '../components/user/OrderDetails';
import UsersBoard from '../components/admin/UsersBoard';
import NewProductPage from '../components/admin/NewProductPage';
import UpdateProductPage from '../components/admin/UpdateProductPage';
import OrdersListPage from '../components/admin/OrderListPage';
import UserListPage from '../components/admin/UserListPage';
import UpdateUserPage from '../components/admin/UpdateUserPage';
import PageNotFound from '../components/pageNotFound/PageNotFound';
import ProcessOrderPage from '../components/admin/ProcessOrderPage';

function App() {
  const [searchInput,setSearchInput] = useState("")
  const [price,setPrice] = useState([20,50])
  const [singleOriginFilter,setSingleOriginFilter] = useState(null)
  const [origin, setOrigin] = useState(null)

  const [pragueCollegePath, setPragueCollegePath] = useState(false);
  let [clickedUserMenuItem, setClickedUserMenuItem]
    = useState("customerinfo")
  const [generalSearchPath, setGeneralSearchPath] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
    },[])

  return (
    <>
      <Router>
        <ScrollToTop />
        <Switch>
          <UserContext.Provider value={{
            searchInput,setSearchInput,
            price,setPrice,
            singleOriginFilter,setSingleOriginFilter,
            origin, setOrigin,
            pragueCollegePath, setPragueCollegePath,
            clickedUserMenuItem, setClickedUserMenuItem,
            generalSearchPath, setGeneralSearchPath,
            incorrectPassword, setIncorrectPassword,
          }}>
              <Elements stripe={loadStripe(stripeApiKey)}> 
                <ProtectedRoute path='/payment/process' exact component={PaymentProcessing}/>
              </Elements>
            <Switch>
             <Route path='/' exact component={Home} />
             <ProtectedRoute path='/user-account' exact component={() => (<UserAccount />)}/>
             <Route path='/forgot-password' exact component={ForgotPassword}/>
             <Route path='/password/reset/:token' exact component={PasswordReset}/>
             <Route path='/cart' exact component={Cart} />
             <ProtectedRoute path='/checkout' exact component={Checkout}/>
             <ProtectedRoute path='/confirm-order' exact component={ConfirmOrder}/>
             <ProtectedRoute path='/order/:id' exact component={OrderDetails}/>
             <Route path='/login' exact component={Form} />
             <Route path='/signup' exact component={SignUp}/>
             {/* <Route path='/shop-categories' exact component={ShopCategories}/> */}
             <Route path='/product/:id' exact component={ProductPage}/>
             <Route path='/coffee' component={Coffees} />
             <Route path='/coffee/:keyword' component={Coffees} />
             <ProtectedRoute path='/admin/products-board' isAdmin={true} component={UsersBoard}/>
             <ProtectedRoute path='/admin/product/new' isAdmin={true} component={NewProductPage}/>
             <ProtectedRoute path='/admin/product/:id' isAdmin={true} component={UpdateProductPage}/>
             <ProtectedRoute path='/admin/orders' isAdmin={true} component={OrdersListPage}/>
             <ProtectedRoute path='/admin/order/:id' isAdmin={true} component={ProcessOrderPage}/>
             <ProtectedRoute path='/admin/users' isAdmin={true} component={UserListPage}/>
             <ProtectedRoute path='/admin/user/:id' isAdmin={true} component={UpdateUserPage}/>
             <ProtectedRoute path='/success' exact component={OrderSuccess}/> 
             {/* <Route component={PageNotFound}/> */}
            </Switch>
          </UserContext.Provider>
        </Switch>
      </Router>
    </>







  );
}

export default App;
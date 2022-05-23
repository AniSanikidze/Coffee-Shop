import React,{useEffect,useContext, useState} from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css';
import './ConfirmOrder.css'
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../MetaData';
import { Button } from '@material-ui/core';
import CheckoutSteps from './CheckoutSteps';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

function ConfirmOrder({match}) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { shippingInfo,cartItems,loading} = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

    const shippingPrice = shippingInfo.city == "Tbilisi" ? 5 : 10
  
    let subTotal = cartItems.reduce((total, currentValue) => total = total + (currentValue.quantity * currentValue.price),0)

    let totalPrice = subTotal + shippingPrice
    
  const proceedToPayment = () => {
    const data = {
      shippingPrice,
      subTotal,
      totalPrice
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/payment/process");
  
  };

const SummaryTitle = styled.h1`
  font-weight: 200;
  font-size:1.5rem
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #555555;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  background-color: #fff;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductSize = styled.span`
color: #333333
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const ProductName = styled.span`
    color: #333333
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  height: 200px
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;


  return (
      <><Navbar/>
      {loading ? <Loader/> : <div className="confirmOrderPage">
        <div>
          <div className="confirmcheckoutArea">
            <Typography>Shipping Details</Typography>
            <div className="confirmcheckoutAreaBox">
              <div>
                <p>Phone: {shippingInfo.phoneNumber}</p>
              </div>
              <div>{console.log(shippingInfo)}
                <p>Address: {shippingInfo &&
                       `${shippingInfo.address}, ${shippingInfo.city}`}</p>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                    <Product>
                    <ProductDetail>
                    <Link to={`/product/${item.productId}`}>
                      <div style={{'position':'relative','background-repeat': 'no-repeat','width':'200px','height':'200px','background-size': 'contain',
 'background-image':`url(${item.img})`}}>
                      {/* <Image src="images/Home/Brazil.jpg" /> */}
                      </div>
                      </Link>
                      <Details>
                        <ProductName>
                          <b>Product:</b> {item.productName}
                        </ProductName>
                        {/* <ProductId>
                          <b>ID:</b> 93813718293
                        </ProductId> */}
                        {/* <ProductColor color="black" /> */}
                        <ProductSize>
                          <b>Whole Beans or Ground:</b> {item.coffeeType}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                        {/* <Add /> */}
                        {/* <ProductAmount>2</ProductAmount> */}
                      <div className="detailsBlock-3-1-1">
                        <input readOnly type="number" 
                        value={item.quantity}
                        />{/* <button 
                        onClick={() => decreaseProductQuantity(item.product,item.quantity,item.coffeeType)}
                        >-</button>
                        
                        <button 
                        onClick={() => increaseProductQuantity(item.product,item.quantity,item.stock,item.coffeeType)}
                        >+</button> */}
                      </div>
                        {/* <Remove /> */}
                      {/* </ProductAmountContainer> */}
                      {/* <ProductPrice>$ 30</ProductPrice> */}
                      <h1 style={{'color': '#555555',
          'font-size': '1.3vmax',
          'margin': '1vmax 0',
          'font-weight': '400'}}>₾{item.price * item.quantity}</h1>
                    </PriceDetail>
                  </Product>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₾{subTotal}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemText>Shipping</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
              <SummaryItemText><input type='radio' checked={shippingInfo.city == "Tbilisi" ? true : false}/>Tbilisi:</SummaryItemText>
              {/* <input type="radio">Tbilisi</input>
              <input type="radio">Different City in Georgia</input> */}
              <SummaryItemPrice>₾5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
            <SummaryItemText><input type='radio' checked={shippingInfo.city == "Tbilisi" ? false : true}/> Different city in Georgia:</SummaryItemText>
              {/* <input type="radio">Tbilisi</input>
              <input type="radio">Different City in Georgia</input> */}
              <SummaryItemPrice>₾10</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₾{totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={proceedToPayment}>PLACE ORDER</Button>
          </Summary>
            {/* <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>checkout Charges:</p>
                <span>₹{checkoutCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button> */}
          </div>
        </div>
      </div>}
            <Footer/>
            </>
  );
}

export default ConfirmOrder;




// import React, { Fragment } from "react";
// // import "./orderDetails.css";
// import { useSelector } from "react-redux";
// import MetaData from "../MetaData";
// import { Link, useHistory } from "react-router-dom";
// import { Typography } from "@material-ui/core";
// // import { getOrderDetails, clearErrors, getSpecificOrder } from "../../actions/orderAction";
// import Loader from "../loading/Loader";
// import Navbar from "../navbar/Navbar";
// import Footer from "../footer/Footer";
// import CheckoutSteps from "./CheckoutSteps";
// import styled from "styled-components";
// // import { useHistory } from "react-router-dom";
// // import './OrderDetails.css'

// const PriceDetail = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const ProductSize = styled.span`
// color: #333333
// `;

// const ProductDetail = styled.div`
//   flex: 2;
//   display: flex;
// `;

// const ProductName = styled.span`
//     color: #333333
// `;

// const Product = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 30px 0;
//   height: 200px
// `;

// const Details = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
// `;


// const ConfirmOrder = ({ match }) => {
//   const {  cartItems, loading } = useSelector((state) => state.cart);
//   // const shippingInfo = localStorage.getItem("shippingInfo")
//   // const {user} = useSelector((state) => state.user)
//   const history = useHistory();
//   const shippingInfo = localStorage.getItem("shippingInfo")
//         ? JSON.parse(localStorage.getItem("shippingInfo"))
//         : {}

//   // const dispatch = useDispatch();
//   // const alert = useAlert();
  
//     const shippingPrice = shippingInfo.city === "Tbilisi" ? 5 : 10
  
//     let subTotal = cartItems.reduce((total, currentValue) => total = total + (currentValue.quantity * currentValue.price),0)

//     let totalPrice = subTotal + shippingPrice
//   const proceedToPayment = () => {
//     const data = {
//       shippingPrice,
//       subTotal,
//       totalPrice
//     };

//     sessionStorage.setItem("orderInfo", JSON.stringify(data));

//     history.push("/payment/process");
//   };

//   return (
//       <><Navbar/>
//         <CheckoutSteps activeStep={1} style={{marginBottom: '5rem'}} />
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="Order Details" />
//           <div className="confirmOrderPage">
//           <div>
//           <div className="confirmcheckoutArea">
//             <Typography>Shipping Details</Typography>
//             <div className="confirmcheckoutAreaBox">
//             * <div>
//                 {/* <p>Username: {order.user && order.user.name}</p>  */}
//                 {/* <span></span> */}
//               {/* </div>
//               <div>
//                 <p>Email: {user.email}</p> */}
//                 {/* <span></span> */}
//                </div> 
//               <div>
//                 <p>Phone: {shippingInfo.phoneNumber}</p>
//                 {/* <span></span> */}
//               </div>
//               <div>
//                 <p>Address:                     {shippingInfo &&
//                       `${shippingInfo.address}, ${shippingInfo.city}`}</p>
//                 {/* <span></span> */}
//               </div>
//             </div>
//           </div>
//           <div className="confirmCartItems">
//             <Typography>Your Cart Items:</Typography>
//             <div className="confirmCartItemsContainer">
//               {cartItems &&
//                 cartItems.map((item) => (
//                     <Product>
//                     <ProductDetail>
//                     <Link to={`/product/${item.productId}`}>
//                       <div style={{'position':'relative','background-repeat': 'no-repeat','width':'200px','height':'200px','background-size': 'contain',
//  'background-image':'url("images/Home/Brazil.jpg")'}}>
//                       {/* <Image src="images/Home/Brazil.jpg" /> */}
//                       </div>
//                       </Link>
//                       <Details>
//                         <ProductName>
//                           <b>Product:</b> {item.productName}
//                         </ProductName>
//                         {/* <ProductId>
//                           <b>ID:</b> 93813718293
//                         </ProductId> */}
//                         {/* <ProductColor color="black" /> */}
//                         <ProductSize>
//                           <b>Whole Beans or Ground:</b> {item.coffeeType}
//                         </ProductSize>
//                       </Details>
//                     </ProductDetail>
//                     <PriceDetail>
//                         {/* <Add /> */}
//                         {/* <ProductAmount>2</ProductAmount> */}
//                       <div className="detailsBlock-3-1-1">
//                         <input readOnly type="number" 
//                         value={item.quantity}
//                         />{/* <button 
//                         onClick={() => decreaseProductQuantity(item.product,item.quantity,item.coffeeType)}
//                         >-</button>
                        
//                         <button 
//                         onClick={() => increaseProductQuantity(item.product,item.quantity,item.stock,item.coffeeType)}
//                         >+</button> */}
//                       </div>
//                         {/* <Remove /> */}
//                       {/* </ProductAmountContainer> */}
//                       {/* <ProductPrice>$ 30</ProductPrice> */}
//                       <h1 style={{'color': '#555555',
//           'font-size': '1.3vmax',
//           'margin': '1vmax 0',
//           'font-weight': '400'}}>₾{item.price * item.quantity}</h1>
//                     </PriceDetail>
//                   </Product>
//                 ))}
//             </div>
//           </div>
//         </div>
            
//             {/* <div className="orderDetailsContainer">
//               <Typography component="h1">
//                 {/* Order #{order && order._id} */}
//               {/* </Typography>
//               <Typography>Shipping Info</Typography>
//               <div className="orderDetailsContainerBox"> */}
//                 {/* <div>
//                   <p>Name:</p></div> */}
//                   {/* <span>{order.user && order.user.name}</span> */}
                
//                 {/* <div>
//                   <p>Phone:</p>
//                   <span>
//                     {shippingInfo.phoneNumber}
//                   </span>
//                 </div>
//                 <div>
//                   <p>Address:</p>
//                   <span>
//                     {shippingInfo &&
//                       `${shippingInfo.address}, ${shippingInfo.city}`}
//                   </span>
//                 </div>
//               </div>
//               <Typography>Payment</Typography>
//               <div className="orderDetailsContainerBox">
//                 <div> */}
//                   {/* <p
//                     className={
//                       order.paymentInfo &&
//                       order.paymentInfo.status === "succeeded"
//                         ? "greenColor"
//                         : "redColor"
//                     }
//                   > */}
//                     {/* {order.paymentInfo &&
//                     order.paymentInfo.status === "succeeded"
//                       ? "PAID"
//                       : "NOT PAID"} */}
//                   {/* </p> */}
//                 {/* </div>

//                 <div>
//                   <p>Subtotal:</p>
//                       {subTotal}
//                   {/* <span>₾{order.totalPrice && order.totalPrice}</span> */}
//                 {/* </div>
//                 <div>
//                   <p>Total price:</p>
//                       {totalPrice} */} 
//                   {/* <span>₾{order.totalPrice && order.totalPrice}</span> */}
//                 {/* </div>
//                 <div>
//                   <p>Shipping price:</p>
//                       {shippingPrice} */}
//                   {/* <span>₾{order.totalPrice && order.totalPrice}</span> */}
//                 {/* </div>
//               </div> */}

              
//             {/* </div> */} 

//             <div className="orderDetailsCartItems">
//               <Typography>Order Items:</Typography>
//               <div className="orderDetailsCartItemsContainer">
//                {cartItems &&
//                   cartItems.map((item) => (
//                     <div key={item.productId}>
//                       <img style={{width:'10rem', height:'15rem'}}
//                       src={item.img}
//                        alt="Product" />
//                       <Link to={`/product/${item.productId}`}>
//                         {item.productName}, {item.coffeeType}
//                       </Link>{" "}
//                       <span>
//                         {item.quantity} X ₾{item.price} ={" "}
//                         <b>₾{item.price * item.quantity}</b>
//                       </span>
//                     </div>
//                   ))} 
//               </div>
//             </div><button onClick={proceedToPayment}>Proceed To Payment</button> 
//           </div>
//         </Fragment>
//       )}
//     <Footer/>
//     </>
//   );
// };

// export default ConfirmOrder;
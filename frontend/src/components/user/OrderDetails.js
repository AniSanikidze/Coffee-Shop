// import React,{useEffect,useContext, useState} from 'react';
// import Aos from 'aos'
// import 'aos/dist/aos.css';
// import '../checkout/ConfirmOrder.css'
// import styled from "styled-components";
// import {useSelector, useDispatch} from 'react-redux'
// import Loader from '../loading/Loader';
// import { useAlert } from 'react-alert';
// import MetaData from '../MetaData';
// import { Button } from '@material-ui/core';
// // import CheckoutSteps from './CheckoutSteps';
// // import { saveShippingInfo } from '../../actions/cartAction';
// import { useHistory } from 'react-router-dom';
// import Navbar from '../navbar/Navbar';
// import Footer from '../footer/Footer';
// import { Typography } from "@material-ui/core";
// import { Link } from 'react-router-dom';
// import { clearErrors, getSpecificOrder } from '../../actions/orderAction';

// function OrderDetails({match}) {
//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const history = useHistory();
//   const {order,error,loading} = useSelector(state => state.specificOrder)
// //   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
// //   const { user } = useSelector((state) => state.user);

//   useEffect(() =>{
//       if(error){
//           alert.error(error)
//           dispatch(clearErrors())
//       }
//      dispatch(getSpecificOrder(match.params.id)) 
//   },[error,dispatch,match.params.id,alert])

//   {!loading && console.log(order) } 
 

//   const TopButton = styled.button`
//   padding: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   border: ${(props) => props.type === "filled" && "none"};
//   background-color: ${(props) =>
//     props.type === "filled" ? "black" : "transparent"};
//   color: ${(props) => props.type === "filled" && "white"};
// `;

//   const PriceDetail = styled.div`
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

// const SummaryTitle = styled.h1`
//   font-weight: 200;
//   font-size:1.5rem
// `;

// const SummaryItem = styled.div`
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   font-weight: ${(props) => props.type === "total" && "500"};
//   font-size: ${(props) => props.type === "total" && "24px"};
// `;

// const SummaryItemText = styled.span``;

// const SummaryItemPrice = styled.span``;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #555555;
//   border: none;
//   color: white;
//   font-weight: 600;
//   cursor: pointer;
// `;

// const Summary = styled.div`
//   flex: 1;
//   border: 0.5px solid lightgray;
//   border-radius: 10px;
//   padding: 20px;
//   height: fit-content;
//   background-color: #fff;
// `;






//   // console.log(match)
  

//   // const a = useEffect(() => {
//   //   Aos.init({ duration: 1000 })
//   // }, [])
  
//   // window.addEventListener('a', a);
//   // console.log(useSelector(state => state.products))

//   return (
//     <><Navbar/>
//     {/* <CheckoutSteps activeStep={1} style={{marginBottom: '5rem'}} 
//     /> */}
//     {loading == true ? <Loader/> : <div className="confirmOrderPage">
//       <div>
//         <div className="confirmcheckoutArea">
//           <Typography>Shipping Details</Typography>
//           <div className="confirmcheckoutAreaBox">
//             <div>
//               <p>Phone: 
//                   {order.phoneNumber}
//               </p>
//               {/* <span></span> */}
//             </div>
//             <div>
//               <p>Address: 
//                   {order.shippingAddress.address},
//                    {order.shippingAddress.city}
//                    </p>
//               {/* <span></span> */}
//             </div>
//           </div>
//         </div>
//         <div className="confirmCartItems">
//           <Typography>Your Cart Items:</Typography>
//           <div className="confirmCartItemsContainer">
//             {order.products &&
//               order.products.map((item) => (
//                   <Product>
//                   <ProductDetail>
//                     <div style={{'position':'relative','background-repeat': 'no-repeat','width':'200px','height':'200px','background-size': 'contain',
// 'background-image':'url("images/Home/Brazil.jpg")'}}>
//                     {/* <Image src="images/Home/Brazil.jpg" /> */}
//                     </div>
//                     <Details>
//                       <ProductName>
//                         <b>Product:</b> {item.productName}
//                       </ProductName>
//                       {/* <ProductId>
//                         <b>ID:</b> 93813718293
//                       </ProductId> */}
//                       {/* <ProductColor color="black" /> */}
//                       <ProductSize>
//                         <b>Whole Beans or Ground:</b> {item.coffeeType}
//                       </ProductSize>
//                     </Details>
//                   </ProductDetail>
//                   <PriceDetail>
//                       {/* <Add /> */}
//                       {/* <ProductAmount>2</ProductAmount> */}
//                     <div className="detailsBlock-3-1-1">
//                       <input readOnly type="number" 
//                       value={item.quantity}
//                       />
//                     </div>
//                     <h1 style={{'color': '#555555',
//         'font-size': '1.3vmax',
//         'margin': '1vmax 0',
//         'font-weight': '400'}}>₾{item.price * item.quantity}</h1>
//                   </PriceDetail>
//                 </Product>
//               ))}
//           </div>
//         </div>
//       </div>
//       {/*  */}
//       <div>
//         <div className="orderSummary">
//         <Summary>
//           <SummaryTitle>ORDER SUMMARY</SummaryTitle>
//           <SummaryItem>
//             <SummaryItemText>Subtotal</SummaryItemText>
//             <SummaryItemPrice>₾{order.subTotal}</SummaryItemPrice>
//           </SummaryItem>
//           <SummaryItem>
//               <SummaryItemText>Shipping Price </SummaryItemText>
//               <SummaryItemPrice>₾{order.shippingPrice}</SummaryItemPrice>
//               </SummaryItem>
//           <SummaryItem type="total">
//             <SummaryItemText>Total</SummaryItemText>
//             <SummaryItemPrice>₾{order.totalPrice}</SummaryItemPrice>
//           </SummaryItem>
//         </Summary>
//           {/* <Typography>Order Summery</Typography>
//           <div>
//             <div>
//               <p>Subtotal:</p>
//               <span>₹{subtotal}</span>
//             </div>
//             <div>
//               <p>checkout Charges:</p>
//               <span>₹{checkoutCharges}</span>
//             </div>
//             <div>
//               <p>GST:</p>
//               <span>₹{tax}</span>
//             </div>
//           </div>

//           <div className="orderSummaryTotal">
//             <p>
//               <b>Total:</b>
//             </p>
//             <span>₹{totalPrice}</span>
//           </div>

//           <button onClick={proceedToPayment}>Proceed To Payment</button> */}
//         </div>
//       </div>
//     </div>}
//           <Footer/>
//           </>
//   );
// }

// export default OrderDetails;


import React, { Fragment, useEffect } from "react";
// import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { clearErrors, getSpecificOrder } from "../../actions/orderAction";
import Loader from "../loading/Loader";
import { useAlert } from "react-alert";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import './OrderDetails.css'

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.specificOrder);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getSpecificOrder(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
      <><Navbar/>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                {/* <div>
                  <p>Name:</p></div> */}
                  {/* <span>{order.user && order.user.name}</span> */}
                
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.phoneNumber}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingAddress &&
                      `${order.shippingAddress.address}, ${order.shippingAddress.city}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>₾{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>
                    Status:
                  </p>
                  <span                  color={order.status && order.status === "Delivered"
                    ? "green"
                    : "red"}>{order.status}</span>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.products &&
                  order.products.map((item) => (
                    <div key={item.productId}>
                      <img 
                      src='../images/Home/Brazil.jpg'
                       alt="Product" />
                      <Link to={`/product/${item.productId}`}>
                        {item.productName}, {item.coffeeType}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₾{item.price} ={" "}
                        <b>₾{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    <Footer/>
    </>
  );
};

export default OrderDetails;
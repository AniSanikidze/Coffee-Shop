import React, { Fragment, useEffect } from "react";
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
import { loadUser } from "../../actions/userAction";
import styled from "styled-components";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.specificOrder);

  const dispatch = useDispatch();
  const alert = useAlert();

  const ProductSize = styled.span`
color: #333333
`;


const ProductName = styled.span`
    color: #333333
`;

  useEffect(() => {
    if (error) {
      if (error === "Token Expired"){
        alert.error("Session Expired")
        dispatch(loadUser())
      }else {
        alert.error(error);
        dispatch(clearErrors());
      }
    }

    dispatch(getSpecificOrder(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
      <><Navbar/>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details - Coffee Berry" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer first-box">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <div className="orderDetailsCartItems">
              <Typography>Ordered Items:</Typography>
              <div className="cart-info">
              {order.products &&
                  order.products.map((item) => (
              <div className="cart-product">
              <div className="cart-product-detail">
                <div 
                style={{'position':'relative',
                        backgroundRepeat: 'no-repeat',
                        width:'200px',
                        height:'200px',
                        backgroundSize: 'contain',
                        backgroundPosition: '50% 50%',
                        backgroundImage:`url(${item.img})`}}>
                </div>
                <div className="cart-details">
                  <ProductName>
                    <b>Product:</b> {item.productName}
                  </ProductName>
                  <ProductSize>
                    <b>Whole Beans or Ground:</b> {item.coffeeType}
                  </ProductSize>
                </div>
                <div className="cart-details">
                        {/* <Add /> */}
                        {/* <ProductAmount>2</ProductAmount> */}
                      <div className="detailsBlock-3-1-1">
                        <div style={{'color': '#555555',fontSize: '1rem',fontWeight: '400'}}>₾{item.price} x {item.quantity}</div>
                      </div>
                      <h1 style={{'color': '#555555',
          fontSize: '1rem',
          fontWeight: '400',
          textAlign: 'center'}}>₾{item.price * item.quantity}</h1>
                    </div>
              </div>
              </div>))}
              </div>
              </div>
              </div>
              <div className="orderDetailsContainer">
              <Typography>Shipping Information</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Phone number:</p>
                  <span>
                    {order.phoneNumber}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingAddress &&
                      `${order.shippingAddress.address}`}
                  </span>
                </div>
                <div>
                  <p>City:</p>
                  <span>
                    {order.shippingAddress &&
                      `${order.shippingAddress.city}`}
                  </span>
                </div>
                <div>
                <p>ZIP code:</p>
                <span>
                  {order.shippingAddress &&
                       `${order.shippingAddress.zipCode}`}
                </span>       
              </div>
              </div>
              <Typography>Payment Information</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                <p>Payment status: </p>
                  <span
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
                  </span>
                </div>
                <div>
                  <p>Subtotal:</p>
                  <span>₾{order.subTotal && order.subTotal}</span>
                </div>
                <div>
                  <p>Shipping price:</p>
                  <span>₾{order.shippingPrice && order.shippingPrice}</span>
                </div>
                <div>
                  <p>Total Amount:</p>
                  <span>₾{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Information</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>
                    Status:
                  </p>
                  <span                  
                  style={{color: order.status && order.status === "delivered"
                    ? "green"
                    : "red"}}>{order.status}</span>
                </div>
                <div>
                  <p>Purchase date:</p>
                  <span>{order.createdAt && order.createdAt.split("T")[0]}</span>
                </div>
                { order.status && order.status !== "delivered" &&
                 <div>
                  <p>Estimated delivery period:</p>
                  <span>{order.shippingAddress.city === "Tbilisi" ? "1 day" : "2-3 days"}</span>
                </div>}
              </div>
            </div>
            </div>

            {/* <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="cart-info">
              {order.products &&
                  order.products.map((item) => (
              <div className="cart-product">
              <div className="cart-product-detail">
                <div 
                style={{'position':'relative',
                        backgroundRepeat: 'no-repeat',
                        width:'200px',
                        height:'200px',
                        backgroundSize: 'contain',
                        backgroundPosition: '50% 50%',
                        backgroundImage:`url(${item.img})`}}>
                </div>
                <div className="cart-details">
                  <ProductName>
                    <b>Product:</b> {item.productName}
                  </ProductName>
                  <ProductSize>
                    <b>Whole Beans or Ground:</b> {item.coffeeType}
                  </ProductSize>
                </div>
              </div>
              </div>))}
              </div>
              </div> */}
        </Fragment>
      )}
    <Footer/>
    </>
  );
};

export default OrderDetails;
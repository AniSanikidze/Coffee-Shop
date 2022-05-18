import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styled from "styled-components";
import axios from "axios";
import "./PaymentProcessing.css";
import { createOrder, clearErrors } from "../../actions/orderAction";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Loader from "../loading/Loader";

const PaymentProcessing = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems} = useSelector((state) => state.cart);
  const { user,loading } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    userId: user._id,
    products: cartItems,
    subTotal: orderInfo.subTotal,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
    shippingAddress: shippingInfo.shippingAddress,
    phoneNumber: shippingInfo.phoneNumber,
    status: "pending"
  };

  const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.username,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
            },
          },
        },
      });
      console.log(result)

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, error, alert]);

  return (
      <>
      <Navbar/>{loading ? <Loader/> :
    <Fragment>
      <MetaData title="Payment - Coffee Berry" />
      <div className='checkout-form' style={{padding: '3rem'}}>
      <CheckoutSteps activeStep={2} style={{marginBottom: '5rem'}}/>
      
        <form className="form" onSubmit={(e) => submitHandler(e)}>
            <div className="change-password">
          {/* <Typography>Card Info</Typography> */}
            {/* <CreditCardIcon /> */}
            <div className='form-inputs'>
                <label className="old-password">
                    Card number
                </label>
            <CardNumberElement className='paymentInput' />
          </div>
          <div className='form-inputs'>
                <label className="old-password">
                    Card expiration
                </label>
            {/* <EventIcon /> */}
            <CardExpiryElement className="paymentInput" />
          </div>
          <div className='form-inputs'>
                <label className="old-password">
                    Security code
                </label>
            {/* <VpnKeyIcon /> */}
            <CardCvcElement className="paymentInput" />
          </div>
          <div style={{marginTop:'38px',display:'flex',justifyContent:'center'}}>
                <TopButton type="filled" style={{backgroundColor: '#afa483', width: '30%'}} ref={payBtn}>Pay - ₾{orderInfo.totalPrice}</TopButton>
                </div>
{/* 
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />*/}</div>
        </form> 
      </div>
    </Fragment>}
    <Footer/>
    </>
  );
};

export default PaymentProcessing;
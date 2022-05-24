import React, { Fragment, useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
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
import { createOrder } from "../../actions/orderAction";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Loader from "../loading/Loader";
import { clearCart } from "../../actions/cartAction";

const PaymentProcessing = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo,cartItems} = useSelector((state) => state.cart);
  const { user,loading } = useSelector((state) => state.user);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    userId: user._id,
    products: cartItems,
    subTotal: orderInfo.subTotal,
    shippingPrice: orderInfo.shippingPrice,
    totalPrice: orderInfo.totalPrice,
    shippingAddress: {
      address: shippingInfo.address,
      city: shippingInfo.city
    },
    phoneNumber: shippingInfo.phoneNumber,
    status: "pending"
  };

  console.log(order)

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
          // window.location.reload()
          dispatch(clearCart())
          // localStorage.removeItem('cartItems')

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
  const [stipeLoaded,setStripeLoaded] = useState(false);

  useEffect(() => {
    if (stripe){
      setStripeLoaded(true)
    }
  },[stripe])

  return (
      <>
      <Navbar/>
    <Fragment>
      <MetaData title="Payment - Coffee Berry" />
      <div className='checkout-form' style={{padding: '3rem'}}>
      {setStripeLoaded ?       
        <form className="form" onSubmit={(e) => submitHandler(e)}>
            <div className="change-password">
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
            <CardExpiryElement className="paymentInput" />
          </div>
          <div className='form-inputs'>
                <label className="old-password">
                    Security code
                </label>
            <CardCvcElement className="paymentInput" />
          </div>
          <div style={{marginTop:'38px',display:'flex',justifyContent:'center'}}>
                <TopButton type="filled" style={{backgroundColor: '#afa483', width: '30%'}} ref={payBtn}>Pay - ₾{orderInfo.totalPrice}</TopButton>
                </div></div>
        </form> : 
        <Loader/>}
      </div> 
    </Fragment>
    <Footer/>
    </>
  );
};

export default PaymentProcessing;
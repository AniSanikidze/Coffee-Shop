import React, { useContext, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import MetaData from "../components/MetaData";
import Footer from "../components/footer/Footer";
import { UserContext } from "../UserContext";
import PaymentProcessing from "../components/checkout/PaymentProcess";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "../components/loading/Loader";

function Payment() {
  const { stripeApiKey, setStripeApiKey } = useContext(UserContext);
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    getStripeApiKey();
  });

  return (
    <>
      <MetaData title="Payment Page - Coffee Berry" />
      <Navbar />
      {stripeApiKey ? (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <PaymentProcessing />
        </Elements>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}

export default Payment;

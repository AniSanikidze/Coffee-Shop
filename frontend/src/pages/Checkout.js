import React, { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import MetaData from '../components/MetaData';
import ShippingForm from '../components/checkout/ShippingForm';
import Footer from '../components/footer/Footer';


function Checkout() {
  return (
    <>
    <MetaData title="Checkout - Coffee Berry"/>
    <Navbar/>
        <ShippingForm />
      <Footer/>
    </>
  );
}

export default Checkout;

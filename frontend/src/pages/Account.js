import React, { useEffect } from 'react';
import Cards from '../components/cards/Cards';
import HeroSection from '../components/hero/HeroSection';
import Navbar from '../components/navbar/Navbar';
import CollegeSection from '../components/company/CompanySection';
import MetaData from '../components/MetaData';
import AnimatedForms from '../components/forms/AnimatedForms';
import Login from '../components/userForms/loginSignUp';
import Register from '../components/userForms/signup';
import Footer from '../components/footer/Footer';

function Form() {


  return (
    <>
    <MetaData title="Home Page - Coffee Berry"/>
    <Navbar/>
      <Login />
      <Footer/>
    </>
  );
}

export default Form;

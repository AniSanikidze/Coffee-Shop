import React, { useEffect } from 'react';
import Cards from '../components/cards/Cards';
import HeroSection from '../components/hero/HeroSection';
import Navbar from '../components/navbar/Navbar';
import CollegeSection from '../components/company/CompanySection';
import MetaData from '../components/MetaData';
import Footer from '../components/footer/Footer';

function Home() {


  return (
    <>
    <MetaData title="Home Page - Coffee Berry"/>
    <Navbar/>
      <HeroSection />
      <Cards />
      <CollegeSection />
      <Footer/>
    </>
  );
}

export default Home;

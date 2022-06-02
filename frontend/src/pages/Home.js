import React from "react";
import Cards from "../components/cards/Cards";
import HeroSection from "../components/hero/HeroSection";
import Navbar from "../components/navbar/Navbar";
import CompanySection from "../components/company/CompanySection";
import MetaData from "../components/MetaData";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <>
      <MetaData title="Home Page - Coffee Berry" />
      <Navbar />
      <HeroSection />
      <Cards />
      <CompanySection />
      <Footer />
    </>
  );
}

export default Home;

import React from 'react';
import Navbar from '../components/navbar/Navbar';
// import CollegeSection from '../components/college/CollegeSection';
import MetaData from '../components/MetaData';
import ProductCategories from '../components/shop/productCategories';
import Footer from '../components/footer/Footer';

function ShopCategories() {
  return (
    <>
    <MetaData title="Shop Page - Coffee Berry"/>
    <Navbar/>
      <ProductCategories/>
      <Footer/>
    </>
  );
}

export default ShopCategories;

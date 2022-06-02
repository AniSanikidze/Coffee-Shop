import React from "react";
import Navbar from "../components/navbar/Navbar";
import MetaData from "../components/MetaData";
import Register from "../components/userForms/signup";
import Footer from "../components/footer/Footer";

function SignUp() {
  return (
    <>
      <MetaData title="Home Page - Coffee Berry" />
      <Navbar />
      <Register />
      <Footer />
    </>
  );
}

export default SignUp;

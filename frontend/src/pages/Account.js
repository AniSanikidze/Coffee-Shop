import React from "react";
import Navbar from "../components/navbar/Navbar";
import MetaData from "../components/MetaData";
import Login from "../components/userForms/Login";
import Footer from "../components/footer/Footer";

function Form() {
  return (
    <>
      <MetaData title="User - Coffee Berry" />
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}

export default Form;

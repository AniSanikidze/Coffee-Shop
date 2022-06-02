import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import ForgotPasswordForm from "../components/userForms/forgotPasswordForm";

function ForgotPassword() {
  return (
    <>
      <Navbar />
      <ForgotPasswordForm />
      <Footer />
    </>
  );
}

export default ForgotPassword;

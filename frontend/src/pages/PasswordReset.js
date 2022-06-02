import React from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import PasswordResetForm from "../components/userForms/passwordResetForm";

function PasswordReset({ match }) {
  return (
    <>
      <Navbar />
      <PasswordResetForm match={match} />
      <Footer />
    </>
  );
}

export default PasswordReset;

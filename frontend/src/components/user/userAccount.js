import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import UserProfile from "./UserProfile";
import {
  Route,
} from "react-router-dom";

const UserAccount = ({ user }) => {
  return (
    <>
      <Navbar />
      <UserProfile />
      <Route path="/edit-account" exact compontent={UserProfile} />
      <Footer />
    </>
  );
};

export default UserAccount;

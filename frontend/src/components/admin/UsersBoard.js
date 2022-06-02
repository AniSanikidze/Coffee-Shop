import React from "react";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import "./AdminDashboard.css";
import UserList from "./productList/ProductList";

const UsersBoard = ({ review }) => {
  return (
    <>
      <Topbar />
      <div className="side-bar-container">
        <Sidebar />
        <div className="dashboard-pages">
          <UserList />
        </div>
      </div>
    </>
  );
};

export default UsersBoard;

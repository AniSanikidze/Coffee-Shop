import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import UserList from "./userList/UserList";

const UserListPage = () => {

  return (
      <>
        <Topbar/>
        <div class='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
                <UserList/>
           </div>
        </div>
      </>
  );
};

export default UserListPage;
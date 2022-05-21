import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import UpdateUser from "./updateUser/UpdateUser";

const UpdateUserPage = ({ match }) => {
  return (
      <>
        <Topbar/>
        <div class='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
               <div >
                   <UpdateUser match={match}/>
               </div>
               
           </div>
        </div>
      </>
  );
};

export default UpdateUserPage;
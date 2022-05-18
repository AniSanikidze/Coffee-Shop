import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import UpdateOrder from "./updateOrder/updateOrder";

const UpdateOrderPage = ({ match }) => {


  return (
      <>
        <Topbar/>
        <div class='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
               <div >
                   <UpdateOrder match={match}/>
               </div>
               
           </div>
        </div>
      </>
  );
};

export default UpdateOrderPage;
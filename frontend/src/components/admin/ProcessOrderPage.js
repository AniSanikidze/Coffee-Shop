import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import ProcessOrder from "./processOrder/processOrder";

const ProcessOrderPage = ({ match }) => {

  return (
      <>
        <Topbar/>
        <div class='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
              <ProcessOrder match={match}/>
           </div>
        </div>
      </>
  );
};

export default ProcessOrderPage;
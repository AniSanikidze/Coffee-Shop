import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import WidgetSm from "./widgetSm/widgetSm";
import WidgetLg from "./widgetLg/widgetLg";

const AdminDashboard = ({ review }) => {


  return (
      <>
        <Topbar/>
        <div class='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
               <div style={{display: 'flex', flexDirection: 'row'}}>
                   <WidgetSm/>
                   <WidgetLg/>
               </div>
               
           </div>
        </div>
      </>
  );
};

export default AdminDashboard;
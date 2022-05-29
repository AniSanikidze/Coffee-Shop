import React from "react";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import ProcessOrder from "./processOrder/processOrder";

const ProcessOrderPage = ({ match }) => {

  return (
      <>
        <Topbar/>
        <div className='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
              <ProcessOrder match={match}/>
           </div>
        </div>
      </>
  );
};

export default ProcessOrderPage;
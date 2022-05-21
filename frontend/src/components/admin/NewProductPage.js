import React from "react";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import NewProduct from "./newproduct/NewProduct";

const NewProductPage = () => {
  return (
      <>
        <Topbar/>
        <div class='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
               <div>
                   <NewProduct/>
               </div>
           </div>
        </div>
      </>
  );
};

export default NewProductPage;
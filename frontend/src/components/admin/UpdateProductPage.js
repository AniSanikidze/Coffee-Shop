import React from "react";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import UpdateProduct from "./updateProduct/UpdateProduct";

const UpdateProductPage = ({ match }) => {


  return (
      <>
        <Topbar/>
        <div className='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
               <div >
                   <UpdateProduct match={match}/>
               </div>
               
           </div>
        </div>
      </>
  );
};

export default UpdateProductPage;
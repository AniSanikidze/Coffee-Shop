import React from "react";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import './AdminDashboard.css'
import UserList from "./userList/UserList";

const UserListPage = () => {

  return (
      <>
        <Topbar/>
        <div className='side-bar-container'>
           <Sidebar/> 
           <div className="dashboard-pages">
                <UserList/>
           </div>
        </div>
      </>
  );
};

export default UserListPage;
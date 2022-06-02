import React from "react";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import "./AdminDashboard.css";
import UpdateUser from "./updateUser/UpdateUser";

const UpdateUserPage = ({ match }) => {
  return (
    <>
      <Topbar />
      <div className="side-bar-container">
        <Sidebar />
        <div className="dashboard-pages">
          <div>
            <UpdateUser match={match} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserPage;

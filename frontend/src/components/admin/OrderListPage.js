import React from "react";
import Sidebar from "./sidebar/SideBar";
import Topbar from "./topbar/TopBar";
import "./AdminDashboard.css";
import OrderList from "./orderList/OrderList";

const OrdersListPage = ({ review }) => {
  return (
    <>
      <Topbar />
      <div class="side-bar-container">
        <Sidebar />
        <div className="dashboard-pages">
          <OrderList />
        </div>
      </div>
    </>
  );
};

export default OrdersListPage;

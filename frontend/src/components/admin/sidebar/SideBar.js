import "./SideBar.css";
import { PermIdentity, DynamicFeed } from "@material-ui/icons";
import InventoryIconOutlined from "@mui/icons-material/Inventory";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Products</h3>
          <ul className="sidebarList">
            <Link to="/admin/products-board" className="link">
              <li
                className={`sidebarListItem ${
                  window.location.pathname === "/admin/products-board" &&
                  "active"
                }`}
              >
                <InventoryIconOutlined className="sidebarIcon" />
                Coffee
              </li>
            </Link>
            <Link to="/admin/product/new" className="link">
              <li
                className={`sidebarListItem ${
                  window.location.pathname === "/admin/product/new" && "active"
                }`}
              >
                <InventoryIconOutlined className="sidebarIcon" />
                Add New Coffee
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Orders</h3>
          <ul className="sidebarList">
            <Link to="/admin/orders" className="link">
              <li
                className={`sidebarListItem ${
                  window.location.pathname === "/admin/orders" && "active"
                }`}
              >
                <DynamicFeed className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Users</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li
                className={`sidebarListItem ${
                  window.location.pathname === "/admin/users" && "active"
                }`}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

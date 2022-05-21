import "./SideBar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import InventoryIconOutlined from '@mui/icons-material/Inventory';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Products</h3>
          <ul className="sidebarList">
            <Link to="/admin/products-board" className="link">
            <li className="sidebarListItem">
            <InventoryIconOutlined className="sidebarIcon" />
              Coffee
            </li>
            </Link>
            <Link to='/admin/product/new' className="link">
            <li className="sidebarListItem">
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
              <li className="sidebarListItem">
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
            <li className="sidebarListItem">
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
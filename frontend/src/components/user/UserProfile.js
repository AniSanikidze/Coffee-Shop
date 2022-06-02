import React, { useContext } from "react";
import "./UserProfile.css";
import { UserContext } from "../../UserContext";
import { AdminrMenuItemsData, UserMenuItemsData } from "./UserMenuItemsData";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import UpdateDetails from "./ChangeCustomerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { clearErrors, logout } from "../../actions/userAction";
import UserOrders from "./UserOrders";

function UserProfile() {
  let { clickedUserMenuItem, setClickedUserMenuItem } = useContext(UserContext);

  const alert = useAlert();
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  let history = useHistory();

  function handleClick(menuItem) {
    if (menuItem === "logout") {
      dispatch(logout());
      setClickedUserMenuItem("customerinfo");
      history.push("/");
      alert.success("Logged Out Successfully");
    } else {
      dispatch(clearErrors());
      setClickedUserMenuItem(menuItem);
    }
  }

  const handleAdminDashboardClick = () => {
    setClickedUserMenuItem("customerinfo");
    history.push("/admin/products-board");
  };

  return (
    <>
      <Navbar />
      <div className="account-container">
        <div className="user-profile">
          <div className="profile-cover-container"></div>
        </div>
        <div className="user-info-box-container">
          <div className="user-info-box">
            <div className="info-box-menu">
              {(user.role === "admin"
                ? AdminrMenuItemsData
                : UserMenuItemsData
              ).map((item) => (
                <div className="info-box-menu-item" key={item.menuItem}>
                  {item.options.map((option) => (
                    <div className="menu-item-options" key={option.keyword}>
                      <span
                        className={
                          clickedUserMenuItem === option.keyword
                            ? "menu-item-option clicked"
                            : "menu-item-option"
                        }
                        onClick={() => handleClick(option.keyword)}
                      >
                        {option.option}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`user-info-content ${
              clickedUserMenuItem === "orders" && "orders"
            }`}
          >
            {clickedUserMenuItem !== "orders" && (
              <h4 className="menu-item-header content">
                {clickedUserMenuItem === "password"
                  ? "Change Password"
                  : clickedUserMenuItem === "delete"
                  ? "Delete Account"
                  : "Account Details"}
              </h4>
            )}
            {clickedUserMenuItem === "password" ? (
              <ChangePassword />
            ) : clickedUserMenuItem === "delete" ? (
              <DeleteAccount />
            ) : clickedUserMenuItem === "orders" ? (
              <UserOrders />
            ) : clickedUserMenuItem === "admin" ? (
              handleAdminDashboardClick()
            ) : (
              <UpdateDetails user={user} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;

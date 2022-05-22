import React from "react";
import "./TopBar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useAlert } from "react-alert";

export default function Topbar() {
  const {user} = useSelector((state) => state.user)
  const alert = useAlert()
  const history = useHistory()
  const dispatch = useDispatch()

  const LogOutHandler = () => {
    dispatch(logout())
    history.push('/')
    alert.success("Logged Out Successfully")
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin: {user.username}</span>
        </div>
        <div className="topRight">
          <Link to='/coffee' style={{textDecoration: 'none'}}>
          <div className="topbarIconContainer">
            Shop
          </div>
          </Link>
          <Link to='/user-account' style={{textDecoration: 'none'}}>
          <div className="topbarIconContainer">
            Account Details
          </div>
          </Link>
          <div className="topbarIconContainer" onClick={LogOutHandler}>
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}
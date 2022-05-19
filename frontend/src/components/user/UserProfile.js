import React, { useContext } from 'react'
import "./UserProfile.css"
import { UserContext } from '../../UserContext';
import { UserMenuItemsData }   from './UserMenuItemsData'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import UpdateDetails from './ChangeCustomerDetails';
import { useDispatch} from 'react-redux'
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";
import {clearErrors, logout} from '../../actions/userAction'
import UserOrders from './UserOrders';


function UserProfile({ user }) {
    let { clickedUserMenuItem, setClickedUserMenuItem} = useContext(UserContext)
    const alert = useAlert();

    const dispatch = useDispatch()
    let history = useHistory();

    function handleClick(menuItem) {
        if(menuItem === "logout"){
            dispatch(logout())
            history.push('/')
            alert.success("Logged Out Successfully")
        }
        else{
            dispatch(clearErrors())
            setClickedUserMenuItem(menuItem);
        }   
    }

    return (
        <>
        <Navbar/>
        <div className="account-container">
        <div className="user-profile">
            <div className="profile-cover-container">
            </div>
        </div>
            <div className="user-info-box-container">
                <div className="user-info-box">
                    <div className="info-box-menu">
                        {UserMenuItemsData.map(item =>
                         <div className="info-box-menu-item">
                                {item.options.map(option =>
                                   <div className="menu-item-options ">
                                        <span className={clickedUserMenuItem === option.keyword ?
                                            "menu-item-option clicked"
                                            :
                                            "menu-item-option"
                                            }
                                            onClick={() => handleClick(option.keyword)}
                                        >
                                            {option.option}
                                        </span>
                                    </div>
                                )}
                         </div>
                        )}
                    </div>
                </div>
                <div className={`user-info-content ${clickedUserMenuItem === "orders" && "orders"}`}>
                {clickedUserMenuItem !== "orders" &&    <h4 className="menu-item-header content" on 
                    >
                        {clickedUserMenuItem === "password" ?
                            "Change Password"
                            :
                            clickedUserMenuItem === "delete"
                                ?
                                "Delete Account"
                                :
                                "Account Details"}
                    </h4>}
                    { clickedUserMenuItem === "password" ?
                        <ChangePassword /> :

                        clickedUserMenuItem === "delete" ?
                                <DeleteAccount />
                            :
                            clickedUserMenuItem === "orders" ?
                            <UserOrders/>
                            :
                             <UpdateDetails user={user}/> 
                    }
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default UserProfile

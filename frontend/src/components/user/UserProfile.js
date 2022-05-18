import React, { useContext, useEffect, useState } from 'react'
import "./UserProfile.css"
import { UserContext } from '../../UserContext';
import { UserMenuItemsData }   from './UserMenuItemsData'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount';
import UpdateUsername from './UpdateUsername';
import { Redirect } from 'react-router';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import UpdateDetails from './ChangeCustomerDetails';
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";
import {clearErrors, logout} from '../../actions/userAction'
import UserOrders from './UserOrders';


function UserProfile({ user }) {
    let { clickedUserMenuItem, setClickedUserMenuItem} = useContext(UserContext)
    const alert = useAlert();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [newUsername, setNewUsername] = useState(false)
    const [deleteAccount, setDeleteAccount] = useState(false)
    // const [logout, setLogout] = useState(false)
    const dispatch = useDispatch()
    let history = useHistory();
    const {loading,error,isAuthenticated} = useSelector(state=>state.user)

    function submitForm() {
        setIsSubmitted(!isSubmitted);
    }

    function submitNewUsername() {
        setNewUsername(!newUsername)
    }

    function submitDeleteAcount() {
        setDeleteAccount(!deleteAccount)
    }

    function handleClick(menuItem) {
        if(menuItem == "logout"){
            dispatch(logout())
            history.push('/')
            alert.success("Logged Out Successfully")
        }
        // else if (menuItem == "orders"){
        //     history.push('/user-orders')
        // }
        else{
            dispatch(clearErrors())
            setClickedUserMenuItem(menuItem);
        }
        
    }

    // useEffect(() => {
    //     dispatch(getProduct())
    // },[,error,input])


    // useEffect(() => {
    //     console.log(clickedUserMenuItem)
        
    //     if(clickedUserMenuItem == "logout"){
    //         // if(!loading && !isAuthenticated){
                
                
    //             console.log(clickedUserMenuItem)
    //         // }

    //         // if (!loading){
    //         //     if(!isAuthenticated){
    //         //         history.push('/')
    //         //     }
    //         //     clickedUserMenuItem = "customerinfo"
    //         // }
    //     }

    // },[dispatch,clickedUserMenuItem])

    const handleLogout = () => {
        dispatch(logout())
        history.push('/')
        clickedUserMenuItem  = "customerinfo"
    }

    // useEffect(() => {
    //     if (error) {
    //         dispatch(clearErrors())
    //     }
    // },[clickedUserMenuItem])

    // useEffect(() => {
    //     if (!loading){
    //         if(!isAuthenticated){
    //             history.push('/')
    //         }
    //         clickedUserMenuItem = "customerinfo"
    //     }
    //     console.log(loading)
    // },[loading])



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
                                {/* <h4 className="menu-item-header">{item.menuItem}</h4> */}
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
                                        {/* <span>
                                            <{option.icon}/>
                                        </span> */}
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
                        <ChangePassword submitForm={submitForm} /> :

                        clickedUserMenuItem === "delete" ?
                                <DeleteAccount submitForm={submitDeleteAcount} />
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

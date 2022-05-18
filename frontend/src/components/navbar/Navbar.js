import React, { useEffect, useContext, useState } from 'react';
// import { Button } from '../button/Button';
import MobileNavbar from './MobileNavbar'
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Modal } from '../forms/Modal'
import Searchbox from '../search/Searchbox';
import NavbarLogic from './NavbarLogic';
import { UserContext } from '../../UserContext';
import UserNavbar from '../user/UserNavbar';
import { useSelector, useDispatch } from "react-redux";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faUser} from '@fortawesome/free-solid-svg-icons'
import { 
  // Search, 
  ShoppingCartOutlined, PersonOutline } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

function Navbar() {
  let totalQuantity = 0
  const { button, showButton, closeMenuDiscardChanges, closeMenuOpenPCRestaurants }
    = MobileNavbar();
  const { navMenuClassName, searchbox, showLogInModal,
          showSignUpModal, openLogInModal, openSignUpModal,
          setShowLogInModal, setShowSignUpModal }
    = NavbarLogic();
  const { pragueCollegePath,
    successfullLogin, setSuccessfullLogin, logout}
    = useContext(UserContext);
  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)
  const {loading,isAuthenticated,user} = useSelector(state=>state.user)

  const handleClick = () => {
    setClick(!click)
  }

  // useEffect(() => {
  //   const userLoggedIn = localStorage.getItem("user-logged-in");
  //     setSuccessfullLogin(userLoggedIn);
  //   }, [successfullLogin, setSuccessfullLogin])

    const {cartItems} = useSelector(state => state.cart)

    // console.log(cartItems.length)

    // console.log("user authentication",isAuthenticated)


  //  function setRestaurantsNavLink () {
  //   switch(window.location.pathname){
  //     case '/restaurants':
  //        return (pragueCollegePath === true ?
  //          "All Restaurants"
  //          :
  //          "PC Restaurants")
  //     default:
  //       return "All Restaurants";
  //   }
  // }

  useEffect(() => {
   showButton();
  }, [showButton]);

  // useEffect(() => {
  //   if (logout) {
  //     setShowLogInModal(false);
  //     setSuccessfullLogin(false)
  //   }
  // }, [logout,setSuccessfullLogin,setShowLogInModal])


  window.addEventListener('resize', showButton);


  return (
    <>
      <nav className={click ? 'navbar active' : 'navbar'}>
        <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMenuDiscardChanges}>
            <img src='/images/Home/1.png' alt='hero-background' style={{'width':'70px','height':'60px',}}/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMenuDiscardChanges}>
                HOME
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/shop-categories'
                className='nav-links'
              >
                SHOP
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMenuDiscardChanges}>
                ABOUT US
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMenuDiscardChanges}>
                WHOLESALE
              </Link>
            </li>
            <li className='nav-links-mobile'
                onClick={openLogInModal}>
              Log In
            </li>
            <li
              className='nav-links-mobile'
              onClick={openSignUpModal}>
                Sign Up
            </li>
          </ul>
          <div className='nav-menu'>
          {(successfullLogin && localStorage.getItem("user-logged-in") === "true")
            ?
            <UserNavbar />
            :
            <>
            <Searchbox/>
            <Link to='/cart' style={{'color': '#555555'}}>
              <Badge badgeContent={cartItems.length > 0  ? cartItems.reduce((total, currentValue) => total = total + currentValue.quantity,0) : "0"} color='primary' style={{'marginTop':'30%'}}>
                <ShoppingCartOutlined style={{'marginTop':'30%', 'cursor':'pointer'}}/>
              </Badge>
            </Link>
            {button &&
            //   <Button
            //     buttonStyle='btn--outline'
            //     buttonSize='btn--medium'
            //     onClick={openLogInModal}
            //     id="login">
            //     LOG IN
            // </Button>
            // <i className="fa-solid fa-user"/>
            <Link to={isAuthenticated ?  '/user-account' : '/login'}>
              <div style={{'display': 'flex'}}>
              {/* <p style={{'marginTop':'20%', 'fontSize': '20px', 'cursor':'pointer','color': '#555555'}}>{!loading && user.username}</p> */}
              <PersonOutline  style={{'marginTop':'30%', 'fontSize': '30px', 'cursor':'pointer','color': '#555555'}}/>
            </div>
            </Link>
            // <FontAwesomeIcon icon={faUser} style={{'fontSize':'20px', 'padding':'10px','cursor':'pointer',
            // // 'color':'#afa483'
            // }} onClick={openSignUpModal}/>
            }
            <Modal
              showLogInModal={showLogInModal}
              setShowLogInModal={setShowLogInModal}
            />
            {button &&
            //   <Button
            //     id="signup"
            //     buttonSize='btn--medium'
            //     onClick={openSignUpModal}>
            //     SIGN UP
            // </Button>
            <i className="fas fa-user"></i>
            }
            <Modal
              showSignUpModal={showSignUpModal}
              setShowSignUpModal={setShowSignUpModal}
            />
          </>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
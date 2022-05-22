import React, { useEffect, useState } from 'react';
import MobileNavbar from './MobileNavbar'
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';
import Searchbox from '../search/Searchbox';
import { useSelector} from "react-redux";
import { ShoppingCartOutlined, PersonOutline, SearchOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

function Navbar() {
  const { button, showButton, closeMenuDiscardChanges }
    = MobileNavbar();
  const [click, setClick] = useState(false)
  const {isAuthenticated} = useSelector(state=>state.user)
  const history = useHistory();

  const handleClick = () => {
    setClick(!click)
  }

  const {cartItems} = useSelector(state => state.cart)

  useEffect(() => {
   showButton();
  }, [showButton]);

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
                to='/coffee'
                className='nav-links'
              >
                SHOP
              </Link>
            </li>
            <li className='nav-item'>
              {window.location.pathname == '/' &&
              <Link className='nav-links'     onClick={() => {
                const anchor = document.querySelector('#company-section')
                anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}>
                ABOUT US
              </Link>}
            </li>
            <li className='nav-links-mobile'>
              Log In
            </li>
            <li className='nav-links-mobile'>
                Sign Up
            </li>
          </ul>
          <div className='nav-menu'>
            {window.location.pathname === "/coffee" ? <Searchbox/> :
            <SearchOutlined onClick={() => history.push('/coffee')} style={{'marginTop':'30%', 'fontSize': '30px', 'cursor':'pointer','color': '#555555'}}/>}
            <Link to='/cart' style={{'color': '#555555'}}>
              <Badge badgeContent={cartItems.length > 0  ? cartItems.reduce((total, currentValue) => total = total + currentValue.quantity,0) : "0"} color='primary' style={{'marginTop':'30%'}}>
                <ShoppingCartOutlined style={{'marginTop':'30%', 'cursor':'pointer'}}/>
              </Badge>
            </Link>
            {button &&
            <Link to={isAuthenticated ?  '/user-account' : '/login'}>
              <div style={{'display': 'flex'}}>
              <PersonOutline  style={{'marginTop':'30%', 'fontSize': '30px', 'cursor':'pointer','color': '#555555'}}/>
            </div>
            </Link>
            }
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
import React, { useEffect } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import UpdateDetails from './ChangeCustomerDetails'
import UserProfile from './UserProfile'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

const UserAccount = ({ user }) => {
    return <>
    <Navbar/>
    <UserProfile/>
    <Route path='/edit-account' exact compontent={UserProfile}/>
    <Footer/>
</>
}

export default UserAccount
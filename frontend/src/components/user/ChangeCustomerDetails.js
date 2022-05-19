import React,{useEffect, useState} from 'react'
import { Button } from "../button/Button"
import { useSelector, useDispatch } from "react-redux";
import Loader from '../loading/Loader';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import {  UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { useAlert } from 'react-alert';
import MetaData from '../MetaData';

function UpdateDetails() {
    let {user} = useSelector(state=>state.user)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [setSubmitClicked] = useState(false)
    const dispatch = useDispatch()
    const alert = useAlert()
    
    let {isUpdated,error} = useSelector((state)=>state.account)

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitClicked(true);
        if(username === user.username && email === user.email){
            error = "Please update fields to save changes"
            alert.error(error);
            dispatch(clearErrors());
        }
        else{
            dispatch(updateProfile(username,email))
        }
        
    }
    useEffect(() => {
        if (user) {
          setUsername(user.username);
          setEmail(user.email);
        }
    
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("Profile Updated Successfully");
          dispatch(loadUser());  
          
          dispatch({
            type: UPDATE_PROFILE_RESET,
          });
         }
        }
      , [dispatch, error, user,alert, isUpdated]);

    return (  
        <form
                onSubmit={handleSubmit}
                className='form' >
                    <MetaData title={"Update Account - Coffee Berry"} />
            {user.loading ? <Loader/> : 
            <div className="change-password">
                     <p style={{"color": "red"}}>{error}</p>
                     <p>{error}</p>
                <div className='form-inputs'>
                <label className="old-password">
                    Username 
                </label>
                <input
                    className='form-input blue'
                    type='text'
                    name='name'
                    placeholder='Enter your exsiting password'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength={2}
                    maxLength={30}
                    />
                </div>
                <div className="form-inputs">
                <label className="old-password">
                    Email address
                </label>
                <input
                    className={
                        "form-input"}
                    type='email'
                    name='email'
                    placeholder='Enter your new password'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                    </div>
                <Button
                    buttonStyle="btn--form"
                    buttonSize="btn--large"
                    // type='submit'
                    // onClick={handleSubmit}
                >
                    Save Changes
                </Button>
            </div>}
        </form>
    )
}

export default UpdateDetails

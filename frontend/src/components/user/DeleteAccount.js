import React, { useContext, useState,useEffect } from 'react'
import { UserContext } from '../../UserContext';
import { Button } from '../button/Button'
import validateDeleteAccount from './validateDeleteAccount';
import useDeleteAccountForm from './useDeleteAccountForm'
import { deleteProfile, logout } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../loading/Loader';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { LOAD_USER_REQUEST, UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { useAlert } from 'react-alert';
import MetaData from '../MetaData';
import { useHistory } from 'react-router-dom';

function DeleteAccount({ submitForm }) {
   const [password,setPassword] = useState("")
   const dispatch = useDispatch();
   const alert = useAlert();
   const history = useHistory();
 
   const { error, isDeleted, loading } = useSelector((state) => state.account);

   const handleSubmit = (e) => {
    e.preventDefault();

  //   const myForm = new FormData();

  //   myForm.set("oldPassword", oldPassword);
  //   myForm.set("newPassword", newPassword);
  //   myForm.set("confirmPassword", confirmPassword);
  //   dispatch(clearErrors())
    dispatch(deleteProfile());
    
  };

  useEffect(() => {

    if (isDeleted) {
        dispatch(clearErrors())
        alert.show("Account was deleted");
  
        
        dispatch(logout())
        history.push("/");
        
        dispatch({
          type: DELETE_USER_RESET,
        });
        
      }
      else {
          if (error) {
    alert.error(error);
    // dispatch(clearErrors());
  }
      }

  
}, [dispatch, error, alert, isDeleted]);

    return (
        <form
            onSubmit={handleSubmit}
            className='form' >
            <div style={{
                margin: "2rem",
                display: "flex"
            }}>
                <p
                    style={{
                        marginRight: "5px",
                        color: "rgb(237, 90, 107)",
                        fontWeight: "bold"
                    }}
                >
                    Important:
                </p>
                <p
                    style={{
                        fontSize: "14px",
                        marginTop: "1px"
                    }}
                >
                    Please note that this action is irreversible and
                    all the data associated with your account will be
                    permanently deleted.</p>
            </div>
            <div className="delete-account">
                <div className="form-inputs">
                <label className="old-password">
                    Password
                </label>
                <span className="input-description" style={{fontSize: "13px"}}>
                    Please provide your exsiting password in order to delete the account.
                </span>
                <input
                    className='form-input'
                    type='password'
                    name='password'
                        placeholder='Enter your password'
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* {incorrectPasswordOnDelete &&
                            !errors.password &&
                            values.password.length !== 0
                            ?
                            <p>Incorrect Password</p>
                            :
                            errors.password && <p>{errors.password}</p>} */}
            </div>
                <Button
                    buttonStyle="btn--form"
                    // onClick={handleSubmit}
                >
                    Delete Account
                </Button>
            </div>
        </form>
    )
}

export default DeleteAccount

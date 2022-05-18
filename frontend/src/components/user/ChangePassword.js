import React, { useContext, useState,useEffect} from 'react'
import { Button } from '../button/Button';
import PasswordStrengthMeter from '../forms/signup/PasswordStrengthMeter'
import { UserContext } from '../../UserContext';
import useChangePasswordForm from './useChangePasswordForm'
import validatePassword from './validatePassword';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../loading/Loader';
import { clearErrors, loadUser, updatePassword, updateProfile } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { useAlert } from 'react-alert';
import MetaData from '../MetaData';

function ChangePassword() {
    // let {loading,isUpdated,error} = useSelector((state)=>state.account)
    // const dispatch = useDispatch()
    // const alert = useAlert()
    // const [oldPassword,setOldPassword] = useState("")
    // const [newPassword,setNewPassword] = useState("")
    // const [confirmPassword,setConfirmPassword] = useState("")

    
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // setSubmitClicked(true);
    //     dispatch(updatePassword(oldPassword,newPassword,confirmPassword))
    //         // setUsername(username)
    //         // setEmail(email)
    //         // if(!error){
    //         //     clearErrors()
    //         //     // dispatch({
    //         //     //     type: LOAD_USER_REQUEST
    //         //     // })
    //         // }
    // }

    // useEffect(() => {
    //     // if (user) {
    //     //   setUsername(user.username);
    //     //   setEmail(user.email);
    //     // //   setAvatarPreview(user.avatar.url);
    //     // }
    
    //     if (error) {
    //       alert.error(error);
    //       dispatch(clearErrors());
    //     }
    
    //     if (isUpdated) {
    //       alert.success("Password Updated Successfully");  
          
    //       dispatch({
    //         type: UPDATE_PASSWORD_RESET,
    //       });
    //      }
          
    
        //   history.push("/account");
    
       
    //     }
    //   , [dispatch, error, isUpdated,handleSubmit]);

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, isUpdated, loading } = useSelector((state) => state.account);
  
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
    //   const myForm = new FormData();
  
    //   myForm.set("oldPassword", oldPassword);
    //   myForm.set("newPassword", newPassword);
    //   myForm.set("confirmPassword", confirmPassword);
    //   dispatch(clearErrors())
      dispatch(updatePassword(oldPassword,newPassword,confirmPassword));
      
    };
  
    useEffect(() => {

        if (isUpdated) {
            dispatch(clearErrors())
            alert.success("Password Updated Successfully");
      
            // history.push("/account");
      
            dispatch({
              type: UPDATE_PASSWORD_RESET,
            });
            
          }
          else {
              if (error) {
        alert.error(error);
        // dispatch(clearErrors());
      }
          }
    
      
    }, [dispatch, error, alert, isUpdated]);

    return (
            <form
                onSubmit={handleSubmit}
                className='form' >{loading ? <Loader /> : 
            <div className="change-password">
                <p>{error}</p>
                <div className='form-inputs'>
                <label className="old-password">
                    Current password
                </label>
                <input
                required
                    className='form-input blue'
                    type='password'
                    name='oldPassword'
                    placeholder='Enter your exsiting password'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    
                    minLength={6}
                    />
                    {/* {incorrectOldPassword &&
                        !errors.oldPassword &&
                        values.oldPassword.length !== 0 ?
                    <p>Incorrect password</p>
                        :
                    errors.oldPassword && <p>{errors.oldPassword}</p>} */}
                </div>
                <div className="form-inputs">
                <label className="old-password">
                    New password
                </label>
                <input
                    className={
                        // values.newPassword.length > 5 ?
                        // values.newPassword > 64 ?
                            "form-input"}
                            // :
                        //     "form-input green"
                        // :
                        // "form-input"}
                        required
                    type='password'
                    name='newPassword'
                    placeholder='Enter your new password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    
                    minLength={6}
                />
                    </div>
                <div className="form-inputs">
                <label className="old-password">
                    Verify New Password
                </label>
                <input
                    className={"form-input"}
                    required
                    type='password'
                    name='newPassword2'
                    placeholder='Reenter your password to verify'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                /></div>
                <Button
                    buttonStyle="btn--form"
                    buttonSize="btn--large"
                    type='submit'
                    // onClick={handleSubmit}
                >
                    Save New Password
                </Button>
            </div>}
        </form>
    )
}

export default ChangePassword
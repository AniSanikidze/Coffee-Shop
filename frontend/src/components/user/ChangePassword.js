import React, { useState,useEffect} from 'react'
import { Button } from '../button/Button';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../loading/Loader';
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { useAlert } from 'react-alert';

function ChangePassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, isUpdated, loading } = useSelector((state) => state.account);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updatePassword(oldPassword,newPassword,confirmPassword));
    };
  
    useEffect(() => {
        if (isUpdated) {
            dispatch(clearErrors())
            alert.success("Password Updated Successfully");
            dispatch({
              type: UPDATE_PASSWORD_RESET,
            });
          }
          else {
              if (error) {
                if (error === "Token Expired"){
                    alert.error("Session Expired")
                    dispatch(loadUser())
                  }
                  else {
                    alert.error(error);     
                  }
                
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
                </div>
                <div className="form-inputs">
                <label className="old-password">
                    New password
                </label>
                <input
                    className={
                            "form-input"}
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
                >
                    Save New Password
                </Button>
            </div>}
        </form>
    )
}

export default ChangePassword
import React, { useEffect } from 'react'
import { Button } from '../button/Button'
import { deleteProfile, loadUser, logout } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

function DeleteAccount({ submitForm }) {
   const dispatch = useDispatch();
   const alert = useAlert();
   const history = useHistory();
 
   const { error, isDeleted } = useSelector((state) => state.account);

   const handleSubmit = (e) => {
    e.preventDefault();
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
            if (error === "Token Expired"){
                alert.error("Session Expired")
                dispatch(loadUser())
              }
              else{
               alert.error(error);   
              }  
      }
        }
    }, [dispatch, error, alert, isDeleted,history]);

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
                <Button
                    buttonStyle="btn--form"
                >
                    Delete Account
                </Button>
            </div>
        </form>
    )
}

export default DeleteAccount

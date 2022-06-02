import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
import {clearErrors, forgotPassword} from '../../actions/userAction'
import MetaData from "../MetaData";

const ForgotPasswordForm = () => {
    const [email,setEmail] = useState("")
    const alert = useAlert()
    const dispatch = useDispatch()
    let {loading,error,message} = useSelector(state=>state.forgotPassword)

    const handleLogin = (e) => {

      e.preventDefault();

      dispatch(forgotPassword(email))
  }

    useEffect(() => {
          if (error){
            alert.error(error)
            dispatch(clearErrors())
          }
          else{
            if (message){
              alert.success(message)
            }
          }
      }
    ,[dispatch,error,alert,message])
  useEffect(() => {
      dispatch(clearErrors())
  },[dispatch])

  return (
    
    <div className="form-container" style={{background: 'url("/images/Home/EDIT2-6723.jpg") center'}}>
      {loading ? <Loader/> : <div className="form-wrapper">
        <MetaData title={"Forgot Password - Coffee Berry"}/>
        <h1 className="form-title">FORGOT PASSWORD</h1>
        <p style={{'font-size': '12px', 'color': '#555555'}}>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
        <form  className="login-form" onSubmit={handleLogin}>
          <input 
          className="login-input"
          type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
           />
          <button className="login-button">SEND</button>
        </form>
      </div>}
    </div>
  );
};

export default ForgotPasswordForm;
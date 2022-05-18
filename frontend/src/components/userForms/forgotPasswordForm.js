import styled from "styled-components";
// import {mobile} from "../responsive";
import './userForm.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import useLoginForm from "./useLoginForms";
import validateLoginInfo from "./validateLoginForms";
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";
import {clearErrors, forgotPassword, login} from '../../actions/userAction'
import MetaData from "../MetaData";

// const Container = styled.div`
//   width: 100vh;
//   height: 100vh;
//   background-color: linear-gradient(
//       rgba(255, 255, 255, 0.5),
//       rgba(255, 255, 255, 0.5)
//     ), url('https://s3.amazonaws.com/www.starterstory.com/story_images/images/000/007/260/original/open-uri20200727-4-p70y0n?1595855215') center;
//   background-size: cover;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background:
    url("https://images.squarespace-cdn.com/content/v1/56d6d5465559866a562d9b26/1559837339701-W565GSG9G3DO8YUOLKOS/EDIT2-6723.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'firago'
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: white;

`;
// ${mobile({ width: "75%" })}

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #afa483;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Links = styled.a`
  margin: 5px 0px ;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #555555
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const ForgotPasswordForm = ({ submitForm}) => {
    const [email,setEmail] = useState("")
    // const [loginPassword,setLoginPassword] = useState("")
    let history = useHistory();
    // console.log(loginEmail,loginPassword)
    const alert = useAlert()
    const dispatch = useDispatch()
    let {loading,error,message} = useSelector(state=>state.forgotPassword)

    const handleLogin = (e) => {

      e.preventDefault();

      dispatch(forgotPassword(email))
      // history.push('/user-account')
  }

    useEffect(() => {
      // if (!loading){
        // console.log(isAuthenticated)
        // if(isAuthenticated){
          if (error){
            alert.error(error)
            dispatch(clearErrors())
            // dispatch(clearErrors())
          }
          else{
            if (message){
              alert.success(message)
            }
          }
          // message = null
          // dispatch(clearErrors())
        // history.push('/user-account')
        // }
      }
    ,[dispatch,error,alert,message])

    // useEffect(() => {
    //   if (!error && message){

    //   }
    // },[])

  useEffect(() => {
      dispatch(clearErrors())
  },[dispatch,window.location.pathname])

  return (
    
    <Container>
      {loading ? <Loader/> : <Wrapper >
        <MetaData title={"Forgot Password - Coffee Berry"}/>
        <Title>FORGOT PASSWORD</Title>
        <p style={{'color':'red', 'fontSize':'14px', "margin": '7px 0' }}>{error}</p>
        <p style={{'font-size': '12px', 'color': '#555555'}}>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
        <Form onSubmit={handleLogin}>
          <Input 
        //   placeholder="email"
          type='email'
            name='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
           />
          <Button >SEND</Button>
        </Form>
      </Wrapper>}
      {/* <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper> */}
    </Container>
    
  );
};

export default ForgotPasswordForm;
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
import {clearErrors, login} from '../../actions/userAction'
import { red } from "@material-ui/core/colors";

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
  width: 25%;
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

const Login = ({ location}) => {
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    let history = useHistory();
    // console.log(loginEmail,loginPassword)
    const alert = useAlert()
    const dispatch = useDispatch()
    const {loading,error,user,isAuthenticated} = useSelector(state=>state.user)
    const redirect = window.location.search ? window.location.search.split("=")[1] : "/user-account"

    const handleLogin = (e) => {

      e.preventDefault();

      dispatch(login(loginEmail,loginPassword))
      // history.push('/user-account')
  }

    useEffect(() => {
      if (!loading){
        // console.log(isAuthenticated)
        if(isAuthenticated){
          if(user.role == "admin") {
            history.push('/admin/dashboard')
          }
          else{
            history.push(redirect)
          }
        }
      }
    },[loading,redirect,dispatch])

  useEffect(() => {
      dispatch(clearErrors())
  },[dispatch,window.location.pathname])

  return (
    
    <Container>
      {loading ? <Loader/> : <Wrapper >
        <Title>SIGN IN</Title>
        <p style={{'color':'red', 'fontSize':'14px', "margin": '7px 0' }}>{error}</p>
        <Form onSubmit={handleLogin}>
          <Input 
        //   placeholder="email"
          type='email'
            name='email'
            placeholder='Enter your email'
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
           />
          <Input placeholder="password" 
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
          minLength={6}/>
          <Button >LOGIN</Button>
          <Link to='/forgot-password'><Links >FORGOT PASSWORD?</Links></Link>  
          <Link to='/signup'><Links >CREATE A NEW ACCOUNT</Links></Link>
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

export default Login;
import styled from "styled-components";
import '../forms/Form.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useHistory } from "react-router-dom";
import {clearErrors, login} from '../../actions/userAction'
import { useContext } from "react";
import { UserContext } from '../../UserContext';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background:
    url("images/Home/EDIT2-6723.jpg")
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

const Login = () => {
    const [loginEmail,setLoginEmail] = useState("")
    const [loginPassword,setLoginPassword] = useState("")
    const { setClickedUserMenuItem } = useContext(UserContext)
    let history = useHistory();
    const dispatch = useDispatch()
    const {loading,error,user,isAuthenticated} = useSelector(state=>state.user)
    const redirect = window.location.search ? window.location.search.split("=")[1] : "/user-account"

    const handleLogin = (e) => {

      e.preventDefault();

      dispatch(login(loginEmail,loginPassword))
  }

    useEffect(() => {
      if (!loading){
        if(isAuthenticated){
          setClickedUserMenuItem("customerinfo")
          if(user.role === "admin") {
            history.push('/admin/products-board')
          }
          else{
            history.push(redirect)
          }
        }
      }
    },[loading,redirect,dispatch,history,isAuthenticated,user])

  useEffect(() => {
      dispatch(clearErrors())
  },[dispatch])

  return (
    
    <Container>
      {loading ? <Loader/> : <Wrapper >
        <Title>SIGN IN</Title>
        <p style={{'color':'red', 'fontSize':'14px', "margin": '7px 0' }}>{error}</p>
        <Form onSubmit={handleLogin}>
          <Input 
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
    </Container>
    
  );
};

export default Login;
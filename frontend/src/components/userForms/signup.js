import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useHistory } from "react-router-dom";
import {clearErrors, register, login} from '../../actions/userAction'
import { useAlert } from 'react-alert';

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
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #afa483;;
  color: white;
  cursor: pointer;
  margin: 0 60% 0 0
`;
const Links = styled.a`
  margin: 5px 0px ;
  text-decoration: underline;
  cursor: pointer;
  color: #555555
`;

const Register = () => {
    const [password,setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch()
    let {loading,error,isAuthenticated} = useSelector(state=>state.user)
    let history = useHistory();
    const alert = useAlert()

    const handleRegistration = (e) => {
        e.preventDefault();
        dispatch(register(username,email,password,confirmPassword));
    }

    useEffect(() => {
      if (!loading){
        console.log(isAuthenticated)
        if(isAuthenticated){
          dispatch(login(email,password))
        history.push('/')
        alert.success("Thank you for registration!")
        }
      }
    },[loading,alert,dispatch,email,password,history,isAuthenticated])

    useEffect(() => {
      dispatch(clearErrors())
  },[dispatch])

  return (
    <Container>
      {loading ? <Loader/>: 
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <p style={{'color':'red', 'fontSize':'14px', "margin": '7px 0' }}>{error}</p>
        <Form onSubmit={handleRegistration}>
          <Input placeholder="username" type='text'
            name='username'
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)} 
            minLength={2}
            maxLength={30}
            />
          <Input placeholder="email" 
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input placeholder="password"
          type="password"
          name="password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <Input placeholder="confirm password"
          type="password"
          name="password"
          required
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onSubmit={handleRegistration}>CREATE</Button>
          <Agreement>
              Already have an account? <Link to='/login'><Links>SIGN IN</Links></Link>
          </Agreement>
        </Form>
      </Wrapper>
      } 
    </Container>
  );
};

export default Register;
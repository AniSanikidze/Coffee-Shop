import styled from "styled-components";
import '../forms/Form.css'
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";
import {clearErrors, resetPassword} from '../../actions/userAction'
import MetaData from "../MetaData";

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
  width: 35%;
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

const PasswordResetForm = ({ match}) => {
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    let history = useHistory();
    const alert = useAlert()
    const dispatch = useDispatch()
    let {loading,error,success} = useSelector(state=>state.forgotPassword)

    const handleLogin = (e) => {

      e.preventDefault();

      dispatch(resetPassword(match.params.token,password,confirmPassword))
  }

    useEffect(() => {
          if (error){
            alert.error(error)
            dispatch(clearErrors())
          }
          else{
            if (success){
              alert.success(success)
              history.push('/login')
            }
          }
      }
    ,[dispatch,error,alert,success,history])

  useEffect(() => {
      dispatch(clearErrors())
  },[dispatch])

  return (
    
    <Container>
      {loading ? <Loader/> : <Wrapper >
        <MetaData title={"Forgot Password - Coffee Berry"}/>
        <Title>RESET PASSWORD</Title>
        <p style={{'color':'red', 'fontSize':'14px', "margin": '7px 0' }}>{error}</p>
        <Form onSubmit={handleLogin}>
        <Input placeholder=" New password" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}/>
          <Input placeholder="Confirm password" 
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}/>
          <Button >RESET</Button>
        </Form>
      </Wrapper>}
    </Container>
    
  );
};

export default PasswordResetForm;
import styled from "styled-components";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../loading/Loader';
import { useAlert } from 'react-alert';
import {clearErrors, forgotPassword} from '../../actions/userAction'
import MetaData from "../MetaData";

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

const ForgotPasswordForm = ({ submitForm}) => {
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
    
    <Container>
      {loading ? <Loader/> : <Wrapper >
        <MetaData title={"Forgot Password - Coffee Berry"}/>
        <Title>FORGOT PASSWORD</Title>
        <p style={{'color':'red', 'fontSize':'14px', "margin": '7px 0' }}>{error}</p>
        <p style={{'font-size': '12px', 'color': '#555555'}}>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
        <Form onSubmit={handleLogin}>
          <Input 
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
    </Container>
    
  );
};

export default ForgotPasswordForm;
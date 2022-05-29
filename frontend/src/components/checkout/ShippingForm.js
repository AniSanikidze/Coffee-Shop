import React,{ useEffect, useState} from 'react';
import 'aos/dist/aos.css';
import './ShippingForm.css'
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux'
import MetaData from '../MetaData';
import { saveShippingInfo } from '../../actions/cartAction';
import { useHistory } from 'react-router-dom';

function ShippingForm({match}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { shippingInfo,loading } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

useEffect(() => {
  if(!loading){
      if (shippingInfo){
      setAddress(shippingInfo.address);
      setCity(shippingInfo.city);
      setPhoneNo(shippingInfo.phoneNo);
   }
  }
},[loading,shippingInfo])

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(saveShippingInfo(address,city,phoneNo))
      history.push('/confirm-order')
    }

  return (
    <div className='shipping-form' style={{padding: '3rem'}}>
    <form  onSubmit={handleSubmit}
                className='form' >
                  
                    <MetaData title={"Checkout - Coffee Berry"} />
            <div className="change-password">
              <div className='shipping-address-header' style={{width: '100%',textAlign: 'center',justifyContent: 'center', 'display': 'flex',}}>
               </div>
                <div className='form-inputs'>
                <label className="old-password">
                    Street address
                </label>
                <input
                    className='form-input blue'
                    type='text'
                    placeholder='House number and street name'
                    name="street-address" 
                    autoComplete="home street-address"
                     required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="form-inputs">
                <label className="old-password">
                    Town / City
                </label>
                <input
                    className={
                        "form-input"}
                    name='city'
                    type="text"
                    autoComplete="home city"
                    placeholder='Enter the city name'
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                </div>
                <div className='fomr-inputs'>
                <label className="old-password">
                    Phone number
                </label>
                <input
                    className={
                        "form-input"}
                      name="phone" 
                      placeholder='Enter your phone number'
                      autoComplete="tel"
                      minLength={9}
                      required
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                /></div>
                <div style={{marginTop:'38px',display:'flex',justifyContent:'center'}}>
                <TopButton type="filled" style={{backgroundColor: '#afa483', width: '30%'}}>Continue</TopButton>
                </div>
            </div>
            </form>
            </div>
  );
}

export default ShippingForm;
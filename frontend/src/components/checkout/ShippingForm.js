import React,{  useState} from 'react';
import 'aos/dist/aos.css';
import './ShippingForm.css'
import styled from "styled-components";
import { useDispatch} from 'react-redux'
import MetaData from '../MetaData';
import { saveShippingInfo } from '../../actions/cartAction';
import { useHistory } from 'react-router-dom';
import { City}  from 'country-state-city';


function ShippingForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Tbilisi");
  const [phoneNo, setPhoneNo] = useState("");
  const [zipCode, setZipCode] = useState("")

  const cities = City.getCitiesOfCountry("GE").filter((item) => {
    return !item.name.includes("’") && 
    !item.name.includes("'") 
    && !item.name.includes("Municipality")
    && !item.name.includes("Stan")
  })
  console.log(cities)
  const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

// useEffect(() => {
//   if(!loading){
//       if (shippingInfo){
//       setAddress(shippingInfo.address);
//       setCity(shippingInfo.city);
//       setPhoneNo(shippingInfo.phoneNo);
//       setZipCode(shippingInfo.zipCode)
//    }
//   }
// },[loading,shippingInfo])

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(saveShippingInfo(address,city,phoneNo,zipCode))
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
                <select
                  className={
                    "form-input"}
                    
                required
                value={city}
                readAndWrite
                onChange={(e) => setCity(e.target.value)}
              >
                  {cities && cities.map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {!item.name.includes("’") && item.name}
                    </option>
                  ))}
              </select>
              <span className='shipping-info-note'>Shipping Information: Shipping fee in Tbilisi - 5₾, other cities - 10₾.</span>
                {/* <input
                    className={
                        "form-input"}
                    name='city'
                    type="text"
                    autoComplete="home city"
                    placeholder='Enter the city name'
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                /> */}
                </div>
                <div className="form-inputs">
                <label className="old-password">
                    Zip code
                </label>
                <input
                    className={
                        "form-input"}
                    name='zip'
                    autocomplete="postal-code"
                    placeholder='Enter your ZIP code'
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
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
                <TopButton className="shipping-button" type="filled" style={{backgroundColor: '#afa483', width: '30%'}}>Continue</TopButton>
                </div>
            </div>
            </form>
            </div>
  );
}

export default ShippingForm;
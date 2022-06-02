import React from 'react';
import 'aos/dist/aos.css';
import './ConfirmOrder.css'
import styled from "styled-components";
import {useSelector} from 'react-redux'
import Loader from '../loading/Loader';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';


function ConfirmOrder({match}) {
  const history = useHistory();
  const { shippingInfo,cartItems,loading} = useSelector((state) => state.cart);

    const shippingPrice = shippingInfo.city === "Tbilisi" ? 5 : 10
  
    let subTotal = cartItems.reduce((total, currentValue) => total = total + (currentValue.quantity * currentValue.price),0)

    let totalPrice = subTotal + shippingPrice
    
  const proceedToPayment = () => {
    const data = {
      shippingPrice,
      subTotal,
      totalPrice
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
    history.push("/payment/process");
  
  };

const SummaryTitle = styled.h1`
  font-weight: 200;
  font-size:1.5rem
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #555555;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  background-color: #fff;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductSize = styled.span`
color: #333333
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const ProductName = styled.span`
    color: #333333
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  height: 200px
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;


  return (
      <><Navbar/>
      {loading ? <Loader/> : <div className="confirmOrderPage">
        <div>
          <div className="confirmcheckoutArea">
            <Typography>Shipping Details</Typography>
            <div className="confirmcheckoutAreaBox">
              <div>
                <p>Phone: {shippingInfo.phoneNumber}</p>
              </div>
              <div>
                <p>Address: {shippingInfo &&
                       `${shippingInfo.address}`}</p>
              </div>
              <div>
                <p>City: {shippingInfo &&
                       `${shippingInfo.city}`}</p>
              </div>
              <div>
                <p>ZIP code: {shippingInfo &&
                       `${shippingInfo.zipCode}`}</p>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                    <Product key = {item.productId}>
                    <ProductDetail>
                    <Link to={`/product/${item.productId}`}>
                      <div style={{'position':'relative',backgroundRepeat: 'no-repeat','width':'200px','height':'200px',backgroundSize: 'contain',
 backgroundImage:`url(${item.img})`}}>
                      {/* <Image src="images/Home/Brazil.jpg" /> */}
                      </div>
                      </Link>
                      <Details>
                        <ProductName>
                          <b>Product:</b> {item.productName}
                        </ProductName>
                        {/* <ProductId>
                          <b>ID:</b> 93813718293
                        </ProductId> */}
                        {/* <ProductColor color="black" /> */}
                        <ProductSize>
                          <b>Whole Beans or Ground:</b> {item.coffeeType}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                        {/* <Add /> */}
                        {/* <ProductAmount>2</ProductAmount> */}
                      <div className="detailsBlock-3-1-1">
                        <input readOnly type="number" 
                        value={item.quantity}
                        />{/* <button 
                        onClick={() => decreaseProductQuantity(item.product,item.quantity,item.coffeeType)}
                        >-</button>
                        
                        <button 
                        onClick={() => increaseProductQuantity(item.product,item.quantity,item.stock,item.coffeeType)}
                        >+</button> */}
                      </div>
                        {/* <Remove /> */}
                      {/* </ProductAmountContainer> */}
                      {/* <ProductPrice>$ 30</ProductPrice> */}
                      <h1 style={{'color': '#555555',
          fontSize: '1.3vmax',
          'margin': '1vmax 0',
          fontWeight: '400'}}>₾{item.price * item.quantity}</h1>
                    </PriceDetail>
                  </Product>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₾{subTotal}</SummaryItemPrice>
            </SummaryItem>
                <SummaryItem>
              <SummaryItemText>Shipping to {shippingInfo.city}:</SummaryItemText>
              {/* <input type="radio">Tbilisi</input>
              <input type="radio">Different City in Georgia</input> */}
              <SummaryItemPrice>{shippingInfo.city === "Tbilisi" ? "5₾" : "10₾"}</SummaryItemPrice>
            </SummaryItem>
            {/* <SummaryItem>
            <SummaryItemText><input type='radio' defaultChecked={shippingInfo.city === "Tbilisi" ? false : true}/> Different city in Georgia:</SummaryItemText>
              {/* <input type="radio">Tbilisi</input>
              <input type="radio">Different City in Georgia</input> */}
              {/* <SummaryItemPrice>₾10</SummaryItemPrice>
            </SummaryItem> */} 
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₾{totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={proceedToPayment}>PLACE ORDER</Button>
          </Summary>
          </div>
        </div>
      </div>}
            <Footer/>
            </>
  );
}

export default ConfirmOrder;
import { Add, Check, CheckBoxRounded, CollectionsOutlined, Remove, RemoveShoppingCartOutlined, ShoppingCart, ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import Announcement from "../components/Announcement";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartAction";
import { useEffect } from "react";
import { Card, Checkbox } from "@material-ui/core";
import { useHistory } from "react-router-dom";// import { mobile } from "../responsive";
import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';

const Container = styled.div`
  // background-color: #f0f0f0;
`;

const Wrapper = styled.div`
  padding: 20px;

`;
// ${mobile({ padding: "10px" })}

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

// const TopTexts = styled.div`
// //   ${mobile({ display: "none" })}
// `;
const TopText = styled.span`
  text-decoration: underline;
  // cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px
  
`;
// ${mobile({ flexDirection: "column" })}

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  height: 200px
`;
// ${mobile({ flexDirection: "column" })}

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  position: relative
  `;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
    color: #333333
`;

// const ProductId = styled.span``;

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
// `;

const ProductSize = styled.span`
color: #333333
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
// ${mobile({ margin: "5px 15px" })}

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`;
//   ${mobile({ marginBottom: "20px" })}
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
  background-color: #fff;
  margin: 30px 0px;
`;

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

const OrderSuccess = () => {
    
    let { clickedUserMenuItem, setClickedUserMenuItem} = useContext(UserContext)

  let total = 0
  const dispatch = useDispatch()
  const history = useHistory()

  const {cartItems} = useSelector(state => state.cart)

  const increaseProductQuantity = (id,quantity,stock,coffeeType) => {
    if(quantity + 1 != stock){
      quantity += 1
      dispatch(addItemsToCart(id,quantity,coffeeType))
    } 
  }

  const decreaseProductQuantity = (id,quantity,coffeeType) => {
    if(quantity - 1 >= 1){
      quantity -= 1
      dispatch(addItemsToCart(id,quantity,coffeeType))
    } 
  }

  const deleteCartItem = (id,coffeeType) => {
    // console.log(coffeeType)
    dispatch(removeItemsFromCart(id,coffeeType))
  }

  const viewOrdershandler = () => {
    history.push('/user-account')
    setClickedUserMenuItem("orders")
  }
  
  return (
    <Container>
      <Navbar />
      <Wrapper>
      <div style={{'height': '80vh', 'width': '100%', 'alignItems': 'center', 'display': 'flex',flexDirection: 'column', padding:'50px',justifyContent: 'center'}}>
        <Check style={{'cursor':'pointer', 'fontSize': '5rem', 'color': 'green'}}/>
        <h1 style={{'font-size': '30px','color': '#999','margin': '30px', fontWeight: '200'}}>Your order has been placed successfully</h1>
        <TopButton type="filled" style={{backgroundColor: '#afa483'}} onClick={viewOrdershandler}>VIEW ORDERS</TopButton>
      </div>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default OrderSuccess;
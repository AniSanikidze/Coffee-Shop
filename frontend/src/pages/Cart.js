import { Add, CollectionsOutlined, Remove, RemoveShoppingCartOutlined, ShoppingCart, ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import Announcement from "../components/Announcement";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartAction";
import { useEffect } from "react";
import { Card } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { mobile } from "../responsive";

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

const Cart = () => {
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
    console.log(id,coffeeType)
    // console.log(coffeeType)
    dispatch(removeItemsFromCart(id,coffeeType))
  }

  const checkOutHandler = () => {
    history.push('/login?redirect=checkout')
  }

  // const handleTotalQuantity = () => {
  //   cartItems.length > 0 ? (cartItems.map((item) => {
  //     totalQuantity += item.quantity
  //   })) : "0"
  // }

  // console.log(cartItems.length)

  return (
    <Container>
      <Navbar />
      <Wrapper>
      {cartItems.length == 0 ? 
      <div style={{'height': '80vh', 'width': '100%', 'alignItems': 'center', 'display': 'flex',flexDirection: 'column', padding:'50px',justifyContent: 'center'}}>
        <RemoveShoppingCartOutlined style={{'cursor':'pointer', 'fontSize': '5rem', 'color': '#555555'}}/>
        <h1 style={{'font-size': '30px','color': '#999','margin': '30px', fontWeight: '200'}}>Your cart is currently empty.</h1>
        <Link to='/coffee'><TopButton type="filled" style={{backgroundColor: '#afa483'}}>RETURN TO SHOP</TopButton></Link>
      </div>
      :
      <>
        {/* <Title>YOUR BAG</Title> */}
        <Top>
          <Link to='/coffee'><TopButton>CONTINUE SHOPPING</TopButton></Link>
          {/* <TopTexts> */}
            <TopText>Shopping Cart({cartItems.reduce((total, currentValue) => total = total + currentValue.quantity,0)})</TopText>
            {/* <TopText>Your Wishlist (0)</TopText> */}
          {/* </TopTexts> */}
        </Top>
        <Bottom>
          <Info>
            {cartItems.map((item) => (
              <Product>
              <ProductDetail>
                <div style={{'position':'relative','background-repeat': 'no-repeat','width':'200px','height':'200px','background-size': 'contain',
    'background-position': '50% 50%', 'background-image':'url("images/Home/Brazil.jpg")'}}>
                {/* <Image src="images/Home/Brazil.jpg" /> */}
                </div>
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
                  <ProductSize>
                    <b style={{'color':'#555555','cursor':'pointer'}} onClick={() => deleteCartItem(item.productId, item.coffeeType)}>Remove Item</b>
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                  {/* <Add /> */}
                  {/* <ProductAmount>2</ProductAmount> */}
                <div className="detailsBlock-3-1-1">
                  <button 
                  onClick={() => decreaseProductQuantity(item.productId,item.quantity,item.coffeeType)}
                  >-</button>
                  <input readOnly type="number" 
                  value={item.quantity}
                  />
                  <button 
                  onClick={() => increaseProductQuantity(item.productId,item.quantity,item.stock,item.coffeeType)}
                  >+</button>
                </div>
                  {/* <Remove /> */}
                {/* </ProductAmountContainer> */}
                {/* <ProductPrice>$ 30</ProductPrice> */}
                <h1 style={{'color': '#555555',
    'font-size': '1.3vmax',
    'margin': '1vmax 0',
    'font-weight': '400'}}>₾{item.price * item.quantity}</h1>
              </PriceDetail>
            </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            {/* <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice></SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem> */}
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₾{cartItems.reduce((total, currentValue) => total = total + (currentValue.quantity * currentValue.price),0)}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={checkOutHandler}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom></>}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
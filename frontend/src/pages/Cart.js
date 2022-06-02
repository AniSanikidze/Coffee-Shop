import { RemoveShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../actions/cartAction";
import { useHistory } from "react-router-dom";
import { loadUser } from "../actions/userAction";
import './Cart.css'

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


const ProductName = styled.span`
    color: #333333
`;

const ProductSize = styled.span`
color: #333333
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
  const dispatch = useDispatch()
  const history = useHistory()

  const {cartItems} = useSelector((state) => state.cart)

  // const {user} = useSelector((user) => state.user)

  const increaseProductQuantity = (id,quantity,stock,coffeeType) => {
    if(quantity + 1 !== stock){
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
    dispatch(removeItemsFromCart(id,coffeeType))
  }

  const checkOutHandler = () => { 
    dispatch(loadUser())
    history.push('/login?redirect=checkout')
  }
  
  return (
    <>
      <Navbar />
      <div className="cart-wrapper">
      {cartItems.length === 0 ? 
      <div style={{'height': '80vh', 'width': '100%', 'alignItems': 'center', 'display': 'flex',flexDirection: 'column', padding:'50px',justifyContent: 'center'}}>
        <RemoveShoppingCartOutlined style={{'cursor':'pointer', fontSize: '5rem', 'color': '#555555'}}/>
        <h1 style={{fontSize: '30px','color': '#999','margin': '30px', fontWeight: '200'}}>Your cart is currently empty.</h1>
        <Link to='/coffee'><TopButton type="filled" style={{backgroundColor: '#afa483'}}>RETURN TO SHOP</TopButton></Link>
      </div>
      :
      <div className="cart-container">
        <div className="cart-top-bar">
          <Link to='/coffee'><TopButton>CONTINUE SHOPPING</TopButton></Link>
            <span className="top-text">Shopping Cart({cartItems && (cartItems.reduce((total, currentValue) => total = total + currentValue.quantity,0))})</span>
        </div>
        <div className="cart-bottom">
          <div className="cart-info">
            {cartItems && cartItems.map((item) => (
              <div className="cart-product">
              <div className="cart-product-detail">
                <div 
                style={{'position':'relative',
                        backgroundRepeat: 'no-repeat',
                        width:'200px',
                        height:'200px',
                        backgroundSize: 'contain',
                        backgroundPosition: '50% 50%',
                        backgroundImage:`url(${item.img})`}}>
                </div>
                <div className="cart-details">
                  <ProductName>
                    <b>Product:</b> {item.productName}
                  </ProductName>
                  <ProductSize>
                    <b>Whole Beans or Ground:</b> {item.coffeeType}
                  </ProductSize>
                  <ProductSize>
                    <b style={{'color':'#555555','cursor':'pointer'}} onClick={() => deleteCartItem(item.productId, item.coffeeType)}>Remove Item</b>
                  </ProductSize>
                </div>
              </div>
              <div className="price-detail">
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
                <h1 style={{'color': '#555555',
                          fontSize: '1.3rem',
                          'margin': '1vmax 0',
                          fontWeight: '400'}}>₾{item.price * item.quantity}</h1>
              </div>
            </div>
            ))}
          </div>
          <div className="summary">
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₾{cartItems && cartItems.reduce((total, currentValue) => total = total + (currentValue.quantity * currentValue.price),0)}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={checkOutHandler}>CHECKOUT NOW</Button>
          </div>
        </div></div>}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../MetaData";
import { Link, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import './ProcessOrder.css'
import {
  clearErrors,
  updateOrder,
  getOrderAdmin,
} from "../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loading/Loader";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import { getUserDetails } from "../../../actions/userAction";
import styled from "styled-components";

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

const ProcessOrder = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.specificOrder);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.user)
  const [status,setStatus] = useState("")

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateOrder(match.params.id, status));
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      history.push('/admin/orders');
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderAdmin(match.params.id));
    
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  useEffect(() => {
    if (!loading){
      setStatus(order.status)
    }
  },[order])

  useEffect(() => {
      if(order){
        dispatch(getUserDetails(order.userId))  
      }
  },[getUserDetails])

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="process-order">
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.status === "delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Username:</p>
                      <span>{user && user.username}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.phoneNumber && order.phoneNumber}
                      </span>
                    </div>
                    <div>
                      <p>Email:</p>
                      <span>
                        {user.email}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingAddress &&
                          `${order.shippingAddress.address}, ${order.shippingAddress.city}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.status && order.status === "delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.status && order.status}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
            <Typography>Ordered Items:</Typography>
            <div className="confirmCartItemsContainer">
              {order.products &&
                order.products.map((item) => (
                    <Product>
                    <ProductDetail>
                    <Link to={`/product/${item.productId}`}>
                      <div style={{'position':'relative','background-repeat': 'no-repeat','width':'200px','height':'200px','background-size': 'contain',
 'background-image':`url(${item.img})`}}>
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
          'font-size': '1.3vmax',
          'margin': '1vmax 0',
          'font-weight': '400'}}>₾{item.price * item.quantity}</h1>
                    </PriceDetail>
                  </Product>
                ))}
            </div>
          </div>
        </div>
          
              <div
                style={{
                  display: order.status === "delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <select value={status}onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
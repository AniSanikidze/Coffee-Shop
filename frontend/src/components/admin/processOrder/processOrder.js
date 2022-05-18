import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../MetaData";
import { Link, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import './ProcessOrder.css'
// import SideBar from "./Sidebar";
import {
  getSpecificOrder,
  clearErrors,
  updateOrder,
} from "../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../loading/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import { getUserDetails } from "../../../actions/userAction";
// import "./processOrder.css";

const ProcessOrder = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.specificOrder);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.user)
  const [status,setStatus] = useState("")

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("status", status);

    dispatch(updateOrder(match.params.id, status));
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

//   const [status, setStatus] = useState("");

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

    dispatch(getSpecificOrder(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  useEffect(() => {
      if(order){
        dispatch(getUserDetails(order.userId))  
      }
  },[getUserDetails])

  console.log(order)

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.status === "Delivered" ? "block" : "grid",
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
                          order.status && order.status === "Delivered"
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
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.products &&
                      order.products.map((item) => (
                        <div key={item.product}>
                          <img 
                        //   src={item.image}
                           alt="Product" />
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.status === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select value={order.status == "pending" ? "Pending" :  order.status == "shipped" ? "Shipped" : "Delivered"}onChange={(e) => setStatus(e.target.value)}>
                      {/* {order.status === "pending" && ( */}
                        <option value="pending">Pending</option>
                    

                      {/* {order.status === "Shipped" && ( */}
                        <option value="shipped">Shipped</option>
                        {/* {order.status === "pending" && (
                        <option value="pending"></option> */}
            

                      {/* {order.status === "Shipped" && ( */}
                        <option value="delivered">Delivered</option>
                      {/* )} */}
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
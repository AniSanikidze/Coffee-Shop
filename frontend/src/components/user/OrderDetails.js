import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { clearErrors, getSpecificOrder } from "../../actions/orderAction";
import Loader from "../loading/Loader";
import { useAlert } from "react-alert";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import './OrderDetails.css'
import { loadUser } from "../../actions/userAction";

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.specificOrder);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      if (error === "Token Expired"){
        alert.error("Session Expired")
        dispatch(loadUser())
      }else {
        alert.error(error);
        dispatch(clearErrors());
      }
    }

    dispatch(getSpecificOrder(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
      <><Navbar/>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                {/* <div>
                  <p>Name:</p></div> */}
                  {/* <span>{order.user && order.user.name}</span> */}
                
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.phoneNumber}
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
                  <span>₾{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>
                    Status:
                  </p>
                  <span                  color={order.status && order.status === "Delivered"
                    ? "green"
                    : "red"}>{order.status}</span>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.products &&
                  order.products.map((item) => (
                    <div key={item.productId}>
                      <img 
                      src='../images/Home/Brazil.jpg'
                       alt="Product" />
                      <Link to={`/product/${item.productId}`}>
                        {item.productName}, {item.coffeeType}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₾{item.price} ={" "}
                        <b>₾{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    <Footer/>
    </>
  );
};

export default OrderDetails;
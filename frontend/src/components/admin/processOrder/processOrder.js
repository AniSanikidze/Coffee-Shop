import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../MetaData";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./ProcessOrder.css";
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
import styled from "styled-components";
import { loadUser } from "../../../actions/userAction";
import "../newproduct/newProduct.css";
import "../../user/OrderDetails.css";

const ProductSize = styled.span`
  color: #333333;
`;

const ProductName = styled.span`
  color: #333333;
`;

const ProcessOrder = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.specificOrder);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrder(match.params.id, status));
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      if (error === "Token Expired") {
        alert.error("Session Expired");
        dispatch(loadUser());
      } else {
        alert.error(error);
        dispatch(clearErrors());
      }
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      history.push("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderAdmin(match.params.id));
  }, [
    dispatch,
    alert,
    error,
    match.params.id,
    isUpdated,
    updateError,
    history,
  ]);

  useEffect(() => {
    if (!loading) {
      setStatus(order.status);
    }
  }, [order, loading]);

  return (
    <Fragment>
      <MetaData title="Update Order Status - Admin Panel" />
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
                <h1 className="newUserTitle">Order Details</h1>
                <div className="confirmshippingArea">
                  <Typography>Shipping Information</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>User ID:</p>
                      <span>{order.userId}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>{order.phoneNumber && order.phoneNumber}</span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingAddress && order.shippingAddress.address}
                      </span>
                    </div>
                    <div>
                      <p>City:</p>
                      <span>
                        {order.shippingAddress && order.shippingAddress.city}
                      </span>
                    </div>
                    <div>
                      <p>ZIP Code:</p>
                      <span>
                        {order.shippingAddress && order.shippingAddress.zipCode}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment Information</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Payment status: </p>
                      <span
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
                      </span>
                    </div>

                    <div>
                      <p>Subtotal:</p>
                      <span>₾{order.subTotal && order.subTotal}</span>
                    </div>
                    <div>
                      <p>Shipping price:</p>
                      <span>₾{order.shippingPrice && order.shippingPrice}</span>
                    </div>
                    <div>
                      <p>Total Amount:</p>
                      <span>₾{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Status:</p>
                      <span
                        style={{
                          color:
                            order.status && order.status === "delivered"
                              ? "green"
                              : "red",
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <p>Purchase date:</p>
                      <span>
                        {order.createdAt && order.createdAt.split("T")[0]}
                      </span>
                    </div>
                    {order.status && order.status !== "delivered" && (
                      <div>
                        <p>Estimated delivery period:</p>
                        <span>
                          {order.shippingAddress.city === "Tbilisi"
                            ? "1 day"
                            : "2-3 days"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="confirmCartItems">
                  <div className="orderDetailsCartItems" style={{ padding: 0 }}>
                    <Typography>Ordered Items:</Typography>
                    <div className="cart-info">
                      {order.products &&
                        order.products.map((item) => (
                          <div className="cart-product">
                            <div className="cart-product-detail">
                              <div
                                style={{
                                  position: "relative",
                                  backgroundRepeat: "no-repeat",
                                  width: "200px",
                                  height: "200px",
                                  backgroundSize: "contain",
                                  backgroundPosition: "50% 50%",
                                  backgroundImage: `url(${item.img})`,
                                }}
                              ></div>
                              <div className="cart-details">
                                <ProductName>
                                  <b>Product:</b> {item.productName}
                                </ProductName>
                                <ProductSize>
                                  <b>Whole Beans or Ground:</b>{" "}
                                  {item.coffeeType}
                                </ProductSize>
                              </div>
                              <div className="cart-details">
                                <div className="detailsBlock-3-1-1">
                                  <div
                                    style={{
                                      color: "#555555",
                                      fontSize: "1rem",
                                      fontWeight: "400",
                                    }}
                                  >
                                    ₾{item.price} x {item.quantity}
                                  </div>
                                </div>
                                <h1
                                  style={{
                                    color: "#555555",
                                    fontSize: "1rem",
                                    fontWeight: "400",
                                    textAlign: "center",
                                  }}
                                >
                                  ₾{item.price * item.quantity}
                                </h1>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
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
                  <h1>Update Order Status</h1>

                  <div>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
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
                    Update
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

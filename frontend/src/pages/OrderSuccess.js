import { Check } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const OrderSuccess = () => {
  let { setClickedUserMenuItem } = useContext(UserContext);
  const history = useHistory();

  const viewOrdershandler = () => {
    history.push("/user-account");
    setClickedUserMenuItem("orders");
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "80vh",
          width: "100%",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          padding: "50px",
          justifyContent: "center",
        }}
      >
        <Check
          style={{ cursor: "pointer", fontSize: "5rem", color: "green" }}
        />
        <h1
          style={{
            fontSize: "30px",
            color: "#999",
            margin: "30px",
            fontWeight: "200",
          }}
        >
          Your order has been placed successfully
        </h1>
        <TopButton
          type="filled"
          style={{ backgroundColor: "#afa483" }}
          onClick={viewOrdershandler}
        >
          VIEW ORDERS
        </TopButton>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;

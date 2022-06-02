import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loading/Loader";
import { useAlert } from "react-alert";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import { clearErrors, userOrders } from "../../actions/orderAction";
import { DataGrid } from "@material-ui/data-grid";
import "./UserOrders.css";
import { loadUser } from "../../actions/userAction";

function UserOrders() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.userOrders);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 80, flex: 0.5 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.products.length,
        id: item._id,
        status: item.status,
        amount: item.totalPrice,
      });
    });

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
    dispatch(userOrders());
  }, [dispatch, alert, error]);

  useEffect(() => {}, [error]);

  return (
    <>
      <form className="form">
        <MetaData title={`User Account - Orders`} />
        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[10]}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />{" "}
          </div>
        )}
      </form>
    </>
  );
}

export default UserOrders;

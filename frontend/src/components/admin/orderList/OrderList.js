import React, { Fragment, useEffect,useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./OrderList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllOrders,
  deleteOrder,
} from "../../../actions/orderAction";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../MetaData";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";
import DeleteDialog from "../../deleteConfirmation/DeleteDialog";
import { UserContext } from "../../../UserContext";
import { loadUser } from "../../../actions/userAction";

const OrderList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const history = useHistory();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.order
  );

  const {deleteOrderSubmitted,setDeleteOrderSubmitted} = useContext(UserContext)

  useEffect(() => {
    if (deleteOrderSubmitted){
      dispatch(deleteOrder(deleteOrderSubmitted))
      setDeleteOrderSubmitted(false)
    }
  },[deleteOrderSubmitted,dispatch])

  useEffect(() => {
    if (error) {
      if (error === "Token Expired"){
        alert.error("Session Expired");
        dispatch(loadUser())
      }
      else{
      alert.error(error);
      dispatch(clearErrors());
      }
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "productsQty",
      headerName: "ProductsQty",
      type: "number",
      minWidth: 220,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 220,
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
          <Fragment>
            <Button>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`} style={{textDecoration: 'none', color: '#555555'}}>
              update
            </Link>
            </Button>
            <DeleteDialog 
              id={params.getValue(params.id,"id")}
              deleteItem="order"
              name={params.getValue(params.id, "id")}
              />
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.status,
        productsQty: item.products.length,
        amount: item.totalPrice,
        name: item.productName,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
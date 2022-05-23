import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../../actions/productAction";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const history = useHistory();

  const { error, products,loading } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.adminProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/products-board");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`} style={{textDecoration: 'none !important'}}>
              update
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon style={{color: 'red'}} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  if (!loading && products) {
        products.map((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.productName,
      });
    });
  }


  return (
    <Fragment>
      <MetaData title={`ALL COFFEE - Admin`} />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">All Coffee</h1>

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

export default ProductList;
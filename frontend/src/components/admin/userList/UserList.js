import React, { Fragment, useEffect, useContext } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./UserList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../MetaData";
import { deleteUser, getAllUsers, clearErrors } from "../../../actions/userAction";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import { UserContext } from "../../../UserContext";
import DeleteDialog from "../../deleteConfirmation/DeleteDialog";

const UserList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const history = useHistory();

  const { error, users } = useSelector((state) => state.allUsers);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.account
  );

  const {deleteUserSubmitted,setDeleteUserSubmitted} = useContext(UserContext)

  useEffect(() => {
    if (deleteUserSubmitted){
      dispatch(deleteUser(deleteUserSubmitted))
      setDeleteUserSubmitted(false)
    }
  },[deleteUserSubmitted,dispatch,setDeleteUserSubmitted])

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
      alert.success("User Deleted Successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    {
      field: "role",
      headerName: "Role",
      type: "text",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 220,
      flex: 0.5,
    },
    {
      field: "username",
      headerName: "Username",
      type: "text",
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`} style={{textDecoration: 'none', color: '#555555'}}>
              update
            </Link>
            </Button>
            <DeleteDialog
              id={params.getValue(params.id,"id")}
              deleteItem="user"
              name={params.getValue(params.id, "username")}
              />
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        username: item.username,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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

export default UserList;
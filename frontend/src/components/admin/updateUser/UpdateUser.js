import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
} from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../MetaData";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import { useHistory } from "react-router-dom";
import Loader from "../../loading/Loader";
import './UpdateUser.css'
import { getUserDetails, updateUser } from "../../../actions/userAction";

const UpdateUser = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory()

  const {loading,error,user} = useSelector(state=>state.userDetails)

  const {
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.account);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(true)
  const [role, setRole] = useState("")

  const userId = match.params.id;

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
      alert.success("user Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    userId,
    user,
    updateError,
    loading
  ]);

  useEffect(() => {
      dispatch(getUserDetails(userId))
  },[dispatch,userId])

  useEffect(() => {
    if(!loading){
        if (user){
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.role)
     }
    }
  },[loading,user,userId])

  const updateuserSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId,username,email,role));
  };

  return (
    <Fragment>
    <MetaData title="Create user" />
    {loading ? <Loader/> : 
    <div className="dashboard">
      <div className="updateProductContainer">
        <form
          className="updateProductForm"
          encType="multipart/form-data"
          onSubmit={updateuserSubmitHandler}
        >
          <h1>Update User</h1>

          <div >
              <lable className="old-password">Username</lable>
            <input
              type="text"
              placeholder="Name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div >
              <lable className="old-password">Email</lable>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
          <lable className="old-password">Role</lable>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
            </select>
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
            onClick={updateuserSubmitHandler}
          >
            Update
          </Button>
        </form>
      </div>
    </div>}
  </Fragment>
  );
};

export default UpdateUser;
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import { useHistory } from "react-router-dom";
import "./UpdateUser.css";
import { getUserDetails, updateUser } from "../../../actions/userAction";

const UpdateUser = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.account
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(true);
  const [role, setRole] = useState("");

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
    loading,
  ]);

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.role);
      }
    }
  }, [loading, user, userId]);

  const updateuserSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, username, email, role));
  };

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">New Product</h1>
      <form
        className="newProductForm"
        encType="multipart/form-data"
        onSubmit={updateuserSubmitHandler}
      >
        <div className="newProductItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="Name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="newProductItem">
          <label>User role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="new-product-button">
          <button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;

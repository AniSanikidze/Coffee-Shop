import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateUs,
  getuserInfo,
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
  // const [price, setPrice] = useState(0);
  // const [aroma,setAroma] = useState("");
  // const [flavor, setFlavor] = useState("")
  // const [finish, setFinish] = useState("")
  // const [desc, setDesc] = useState("");
  // const [bagSize, setBagSize] = useState(0)
  // const [roastLevel, setRoastLevel] = useState("");
  // const [stock, setStock] = useState(0);
  // const [images, setImages] = useState([]);
  // const [oldImages, setOldImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);


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
      history.push("/admin/dashboard");
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
    // if (user && user._id !== userId) {
      dispatch(getUserDetails(userId))
      // }
  },[dispatch,window.location.pathname])

  useEffect(() => {
    //   if ()
    if (user && user._id !== userId) {
      // dispatch(getUserDetails(userId))
      } else
    if(!loading){
             if (user){
          console.log(user)
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.role)
        // setDesc(user.desc);
        // setPrice(user.price);
      //   setFlavor(user.flavor)
        // setSingleOrigin(user.singleOrigin)
        // setOrigin(user.origin);
        // setRoastLevel(user.roastLevel)
        // setBagSize(user.bagSize)
        // setStock(user.stock); 
        //  console.log(userName)
     }
    }

      //   setOldImages(user.images);
    //   }
  },[loading])

  const updateuserSubmitHandler = (e) => {
    e.preventDefault();


    // myForm.set("userName", userName);
    // myForm.set("price", price);
    // myForm.set("desc", desc);
    // // myForm.set("category", category);
    // myForm.set("stock", stock);

    // images.forEach((image) => {
    //   myForm.append("images", image);
    // });
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
              {/* <placeholder>{singleOrigin ? "Single Origin" : "Blend"}</placeholder> */}
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
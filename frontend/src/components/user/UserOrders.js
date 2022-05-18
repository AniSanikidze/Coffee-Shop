import React,{useEffect, useState} from 'react'
import { Button } from "../button/Button"
import useUpdateUsernameForm from './useUpdateUsernameForm'
import validateUsername from './validateUsername';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../loading/Loader';
import { LOAD_USER_REQUEST, UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { useAlert } from 'react-alert';
import MetaData from '../MetaData';
import { Link } from 'react-router-dom';
import LaunchIcon from "@material-ui/icons/Launch";
import { clearErrors, userOrders } from "../../actions/orderAction";
import { DataGrid } from "@material-ui/data-grid";
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import './UserOrders.css'

function UserOrders() {
    const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.userOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 80, flex: 0.5 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
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
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(userOrders());
  }, [dispatch, alert, error]);
//     // let oldEmail;
//     // let oldUsername;
//     // if (!loading){
//     //     oldUsername = user.username
//     //     oldEmail = user.email
//     // }
//     let {user} = useSelector(state=>state.user)
//     const [username,setUsername] = useState("")
//     const [email,setEmail] = useState("")
//     const [submitClicked, setSubmitClicked] = useState(false)
//     const dispatch = useDispatch()
//     const alert = useAlert()
//     // let history = useHistory();
    
//     let {orders,loading,error} = useSelector((state)=>state.userOrders)
//     // let {user} = useSelector(state=>state.user)
//     // console.log(error)
//     let a = ""
//     let message = ""
//     let noChangesError = ""
//     // let error = ""

//     // const dispatch = useDispatch()
  
//     // useEffect(() => {
//     // //   if(error){
//     // //     alert.error(error)
//     // //     dispatch(clearErrors())
//     // //   }
//     //   dispatch(loadUser())
//     //   if(!loading){
//     //     setUsername(user.username)
//     //     setEmail(user.email)
//     // }
//     // },[dispatch,error])
    

//     // useEffect(() => {
//     //     if(!loading){
//     //         if (isAuthenticated){
//     //             setUsername(user.username)
//     //         setEmail(user.email)
//     //         } 
//     //     }
//     // },[user,error,loading])
//     // console.log(error)

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setSubmitClicked(true);
//         // console.log(username,user.username)
//         // console.log(email,user.email)
//         if(username == user.username && email == user.email){
//             error = "Please update fields to save changes"
//             alert.error(error);
//             dispatch(clearErrors());
//         }
//         else{
//             dispatch(updateProfile(username,email))
//             // setUsername(username)
//             // setEmail(email)
//             // if(!error){
//             //     clearErrors()
//             //     // dispatch({
//             //     //     type: LOAD_USER_REQUEST
//             //     // })
//             // }
//         }
        
//     }
//     useEffect(() => {
//         if (user) {
//           setUsername(user.username);
//           setEmail(user.email);
//         //   setAvatarPreview(user.avatar.url);
//         }
    
//         if (error) {
//           alert.error(error);
//           dispatch(clearErrors());
//         }
    
//         // if (isUpdated) {
//         //   alert.success("Profile Updated Successfully");
//         //   dispatch(loadUser());  
          
//         //   dispatch({
//         //     type: UPDATE_PROFILE_RESET,
//         //   });
//         //  }
          
    
//         //   history.push("/account");
    
       
//         }
//       , [dispatch, error, user,]);
//     // useEffect(() => {
//     //     if(submitClicked){
//     //         dispatch(loadUser())
//     //     }
//     // },[submitClicked])

//     // useEffect(() => {
//     //     if (!error){
//     //         clearErrors()
//     //         message = "Changes were saved"
//     //     }

//     // },[error,handleSubmit])
    

//     const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;
    return (
        
          <>
        <form
            className='form' >
            <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          /> </div>)}
        </form>
        </>
    )
}

export default UserOrders

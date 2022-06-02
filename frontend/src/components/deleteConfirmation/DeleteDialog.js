import React,{useState, useContext} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { UserContext } from "../../UserContext";
import { DeleteOutline } from "@material-ui/icons";

const DeleteDialog = (props) => {

  const [state,setState] = useState({
    open: false
  });

  const {setDeleteUserSubmitted,setDeleteOrderSubmitted,setDeleteProductSubmitted} = useContext(UserContext)

  const handleClickOpen = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleAgree = () => {
    if (props.deleteItem === "product"){
      setDeleteProductSubmitted(props.id)
    }
    else if (props.deleteItem === "order"){
      setDeleteOrderSubmitted(props.id)
    }
    else if (props.deleteItem === "user") {
      setDeleteUserSubmitted(props.id)
    }
    handleClose();
  };
  const handleDisagree = () => {
    console.log("I do not agree.");
    handleClose();
  };

    return (
      <div>
        <Button onClick={handleClickOpen}><DeleteOutline style={{color:'red'}}/></Button>
        <Dialog
          open={state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Confirmation"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {props.deleteItem}: {props.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisagree} color="primary">
              Disagree
            </Button>
            <Button onClick={handleAgree} style={{color: 'red'}} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default DeleteDialog;

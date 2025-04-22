import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction } from "../../store/actions/users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteUser = () => {
  const allowDelete = useSelector(
    (state) =>
      state.users.isAdmin1 ||
      state.users.isAdmin2 ||
      state.users.isAdmin3 ||
      state.users.isSuperAdmin
  );
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState("");
  const ee = useSelector((state) => state.users.deleteErrors);
  const deleted = useSelector((state) => state.users.deleted);
  const [errors, setErrors] = React.useState({
    userName: "",
  });
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allowDelete) {
      navigate("/notAuthorized");
    }
  }, [allowDelete]);

  useEffect(() => {
    if (ee && ee.errors) {
      setErrors({
        userName: ee.errors
      });
    } else {
      setErrors({
        userName: "",
      });
    }
  }, [ee, deleted]);

  const textout = (e) => {
    setState(e.target.value);
  };

  const handleClickOpen = () => {
    if (state !== "") {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // console.log({
    //   userName: state,
    // });
    dispatcher(
      deleteUserAction({
        data: {
          userName: state,
        },
        navigate,
      })
    );
    setOpen(false);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: "100%",
        }}
      >
        {deleted && (
          <Typography variant="body1" color={"green"} sx={{mb: '20px'}}>
            User deleted successfully
          </Typography>
        )}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography style={{ marginBottom: "20px" }}>Delete User:</Typography>
          <TextField
            value={state}
            onChange={textout}
            error={errors.userName !== ""}
            helperText={errors.userName}
            id="outlined-basic"
            label={"User"}
            variant="outlined"
            style={{ marginLeft: "10px" }}
          />
        </Box>
        <Stack direction="row" spacing={5} margin="10px">
        
       
          
          <Button
            variant="contained"
            onClick={handleClickOpen}
            startIcon={<DeleteIcon />}
          >
         
            Delete
          </Button>
        
        </Stack>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are you sure to delete the User?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              If you delete this user, all data and slots associated with it
              will get removed!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>NO</Button>
            <Button onClick={handleDelete}>YES</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default DeleteUser;

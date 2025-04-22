import "./Details.css";
import { Box } from "@mui/system";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  Tab,
  Tabs,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  FormHelperText,
} from "@mui/material";
import {TextareaAutosize} from '@mui/base';
import React, { useState, useEffect } from "react";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DesktopDatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { TabContext } from "@mui/lab";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  approveBookingAction,
  bookingResetAction,
  deleteBookingAction,
  rejectBookingAction,
  updateBookingAction,
} from "../../store/actions/booking";

dayjs.extend(customParseFormat);

function makeArray(w, h, val) {
  var arr = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = val;
    }
  }
  return arr;
}

const Details = () => {
  useEffect(() => {
    dispatcher(bookingResetAction());
  }, []);

  const data = useLoaderData();
  const navigate = useNavigate();
  const loc = useLocation();
  const [userName, setUser] = useState("");
  const [v, setV] = useState("1");
  const [errors, setErrors] = useState("");
  const [errors1, setErrors1] = useState({
    ltId: "",
    it_reg: "",
    bookId: "",
  });
  const [page, setPage] = useState("");
  const [ltData, setLTData] = useState({});
  const [bookingData, setBooking] = useState({});
  const [purpose, setPupose] = useState("");
  const [batch, setBatch] = useState("");
  const [startDate, setSTDate] = useState(null);
  const [endDate, setEDate] = useState(null);
  const [it_req, setIT] = useState(false);
  const [times, setTimes] = useState(makeArray(2, 7, null));
  const [approved, setApproved] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [past, setPast] = React.useState(false);
  const handleOpen = (param) => param(true);
  const handleClose = (param) => param(false);
  const userId = useSelector((state) => state.users.userId);
  const d = useSelector((state) => state.booking.approved);
  const e = useSelector((state) => state.booking.approveErrors);
  const d1 = useSelector((state) => state.booking.rejected);
  const e1 = useSelector((state) => state.booking.rejectErrors);
  const d2 = useSelector((state) => state.booking.updated);
  const e2 = useSelector((state) => state.booking.updateErrors);
  const d3 = useSelector((state) => state.booking.deleted);
  const e3 = useSelector((state) => state.booking.deleteErrors);
  const isAdmin1 = useSelector((state) => state.users.isAdmin1);
  const isAdmin2 = useSelector((state) => state.users.isAdmin2);
  const isAdmin3 = useSelector((state) => state.users.isAdmin3);
  const isSuperAdmin = useSelector((state) => state.users.isSuperAdmin);
  const approveReject = useSelector(
    (state) =>
      state.users.isAdmin1 ||
      state.users.isAdmin2 ||
      state.users.isAdmin3 ||
      state.users.isSuperAdmin
  );

  const MON_SUN = (event, newValue) => {
    setV(newValue);
  };

  const displayPage = (event) => {
    setPage(event.target.value);
  };

  useEffect(() => {
    if (data.errors === 403) {
      navigate("/login", { replace: true, state: { pg: loc.pathname } });
    } else if (data.errors === 440) {
      navigate("/sessionExpired", { replace: true });
    }

    if (data.errors) {
      setErrors(data.errors);
    } else {
      setLTData(data.ltData);
      setBooking(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (d1) {
      dispatcher(bookingResetAction());

      if (loc.state?.pg && loc.state?.pg !== null) {
        navigate(loc.state?.pg);
      }

      navigate("/");
    }

    if (d3) {
      dispatcher(bookingResetAction());

      if (loc.state?.pg && loc.state?.pg !== null) {
        navigate(loc.state?.pg);
      }

      navigate("/");
    }
  }, [d1, d3]);

  useEffect(() => {
    let k = {
      ltId: "",
      it_reg: "",
      bookId: "",
    };

    for (let field of Object.keys(e2)) {
      k = {
        ...k,
        [field]: e2[field],
      };
    }

    setErrors1(k);

    for (let field of Object.keys(e3)) {
      k = {
        ...k,
        [field]: e3[field],
      };
    }

    setErrors1(k);
  }, [e2, e3]);

  useEffect(() => {
    if (bookingData.userName) {
      setUser(bookingData.userName);
    }
    if (bookingData._id && ltData[bookingData.ltId]) {
      setPage(ltData[bookingData.ltId][1] + 1);
    }
    if (bookingData.purpose) {
      setPupose(bookingData.purpose);
    }
    if (bookingData.batch) {
      setBatch(bookingData.batch);
    }
    if (bookingData.startDate) {
      setSTDate(dayjs(bookingData.startDate));
    }
    if (bookingData.endDate) {
      const d1 = dayjs(bookingData.endDate);
      setEDate(d1);

      if (dayjs().diff(d1) > 0) {
        setPast(true);
      }
    }
    if (bookingData.it_req) {
      setIT(bookingData.it_req);
    }

    let arr = times;

    if (bookingData.monST && bookingData.monST !== -1) {
      const hr = Math.floor(bookingData.monST / 100);
      const mn = (bookingData.monST - 1) % 100;
      arr[0][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.monET && bookingData.monET !== -1) {
      const hr = Math.floor(bookingData.monET / 100);
      const mn = bookingData.monET % 100;
      arr[0][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${(mn === 0) ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.tueST && bookingData.tueST !== -1) {
      const hr = Math.floor(bookingData.tueST / 100);
      const mn = (bookingData.tueST - 1) % 100;
      arr[1][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.tueET && bookingData.tueET !== -1) {
      const hr = Math.floor(bookingData.tueET / 100);
      const mn = bookingData.tueET % 100;
      arr[1][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.wedST && bookingData.wedST !== -1) {
      const hr = Math.floor(bookingData.wedST / 100);
      const mn = (bookingData.wedST - 1) % 100;
      arr[2][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.wedET && bookingData.wedET !== -1) {
      const hr = Math.floor(bookingData.wedET / 100);
      const mn = bookingData.wedET % 100;
      arr[2][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.thuST && bookingData.thuST !== -1) {
      const hr = Math.floor(bookingData.thuST / 100);
      const mn = (bookingData.thuST - 1) % 100;
      arr[3][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.thuET && bookingData.thuET !== -1) {
      const hr = Math.floor(bookingData.thuET / 100);
      const mn = bookingData.thuET % 100;
      arr[3][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.friST && bookingData.friST !== -1) {
      const hr = Math.floor(bookingData.friST / 100);
      const mn = (bookingData.friST - 1) % 100;
      arr[4][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.friET && bookingData.friET !== -1) {
      const hr = Math.floor(bookingData.friET / 100);
      const mn = bookingData.friET % 100;
      arr[4][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.satST && bookingData.satST !== -1) {
      const hr = Math.floor(bookingData.satST / 100);
      const mn = (bookingData.satST - 1) % 100;
      arr[5][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.satET && bookingData.satET !== -1) {
      const hr = Math.floor(bookingData.satET / 100);
      const mn = bookingData.satET % 100;
      arr[5][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.sunST && bookingData.sunST !== -1) {
      const hr = Math.floor(bookingData.sunST / 100);
      const mn = (bookingData.sunST - 1) % 100;
      arr[6][0] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (bookingData.sunET && bookingData.sunET !== -1) {
      const hr = Math.floor(bookingData.sunET / 100);
      const mn = bookingData.sunET % 100;
      arr[6][1] = dayjs(
        `${hr < 10 ? 0 : ""}${hr}:${mn === 0 ? "00" : "30"}`,
        "HH:mm"
      );
    }

    if (
      (bookingData.admin1 && bookingData.admin2 && bookingData.admin3) ||
      bookingData.superAdmin ||
      (bookingData.admin1 && isAdmin1) ||
      (bookingData.admin2 && isAdmin2) ||
      (bookingData.admin3 && isAdmin3) ||
      d
    ) {
      setApproved(true);
    } else {
      setApproved(false);
    }

    setTimes(arr);
  }, [ltData, bookingData, d]);

  const handleIT = (event) => {
    setIT(event.target.checked);
  };

  if (errors !== "") {
    navigate('/error');
  }

  const dispatcher = useDispatch();

  return (
    <Box className="container">
      {typeof e === "string" && (
        <Typography
          variant="body1"
          color={typeof e === "string" ? "red" : "black"}
        >
          {typeof e === "object" ? "" : e}
        </Typography>
      )}

      {typeof e1 === "string" && (
        <Typography
          variant="body1"
          color={typeof e1 === "string" ? "red" : "black"}
        >
          {typeof e1 === "object" ? "" : e1}
        </Typography>
      )}

      {errors1.bookId !== "" && (
        <Typography
          variant="body1"
          color={typeof e1 === "string" ? "red" : "black"}
        >
          {errors1.bookId}
        </Typography>
      )}

      {errors1.userId !== "" && (
        <Typography
          variant="body1"
          color={typeof e1 === "string" ? "red" : "black"}
        >
          {errors1.userId}
        </Typography>
      )}

      {d && (
        <Typography variant={"body1"} color={"green"}>
          Booking Accepted Successfully
        </Typography>
      )}

      {d2 && (
        <Typography variant={"body1"} color={"green"}>
          Booking Updated Successfully
        </Typography>
      )}
      <Card
        className="mainContainer"
        variant="outlined"
        sx={{
          boxShadow: 10,
          borderRadius: 3,
        }}
      >
        <form className="formContainer">
          <Stack container direction="column" spacing="20" alignItems="center">
            <Stack item className="gridItem">
              <TextField
                className="new1"
                InputLabelProps={{
                  shrink: true,
                }}
                id="userN"
                value={userName}
                label="Username"
                placeholder=""
                disabled
              />
            </Stack>

            <Stack item className="gridItem">
              <FormControl
                sx={{
                  fontSize: 15,
                  width: "100%",
                }}
              >
                <InputLabel id="demo-simple-select-label">LT No.</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="LT No."
                  value={page}
                  onChange={displayPage}
                  disabled={!isSuperAdmin}
                  error={errors1.ltId !== ""}
                >
                  {Object.keys(ltData).map((val, key) => (
                    <MenuItem key={key} value={key + 1}>
                      {ltData[val][0]}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors1.ltId}</FormHelperText>
              </FormControl>
            </Stack>
            <Stack item className="gridItem">
              <TextField
                className="new1"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputComponent: TextareaAutosize,
                }}
                id="purposeFi"
                value={purpose}
                label="Purpose"
                placeholder=""
                disabled
              />
            </Stack>
            <Stack item className="gridItem">
              <TextField
                className="new1"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Batch"
                placeholder="Batch"
                value={batch}
                disabled
              />
            </Stack>
            <Stack item className="gridItem">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="new1"
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  disabled
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
            <Stack item className="gridItem">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="new1"
                  label="End Date"
                  value={endDate}
                  inputFormat="MM/DD/YYYY"
                  disabled
                  onChange={() => {}}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
            <Stack item sx={{ marginBottom: "10px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleIT}
                    checked={it_req}
                    disabled={!isSuperAdmin}
                  />
                }
                label="IT Requirements"
              />
            </Stack>
          </Stack>
        </form>
        <Box className="sideBox">
          <TabContext value={v}>
            <Tabs
              variant="scrollable"
              allowScrollButtonsMobile
              value={v}
              onChange={MON_SUN}
            >
              <Tab label="Mon" value="1" />
              <Tab label="Tue" value="2" />
              <Tab label="Wed" value="3" />
              <Tab label="Thu" value="4" />
              <Tab label="Fri" value="5" />
              <Tab label="Sat" value="6" />
              <Tab label="Sun" value="7" />
            </Tabs>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack
                container
                alignItems="center"
                spacing="20"
                justifyContent="center"
                sx={{
                  marginTop: 0,
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <Stack item sx={{ width: "200px" }}>
                  <TimePicker
                    className="new1"
                    disabled
                    label="Start"
                    value={times[v - 1][0]}
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
                <Stack item sx={{ width: "200px" }}>
                  <TimePicker
                    className="new1"
                    disabled
                    label="End"
                    value={times[v - 1][1]}
                    onChange={() => {}}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </Stack>
            </LocalizationProvider>
          </TabContext>
          {approveReject && !approved && !past && (
            <>
              <Box className="buttonBox">
                <Button
                  variant="contained"
                  endIcon={<DoneOutlineSharpIcon />}
                  onClick={() => {
                    dispatcher(
                      approveBookingAction({ data: bookingData._id, navigate })
                    );
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  endIcon={<ClearSharpIcon />}
                  onClick={() => handleOpen(setOpen)}
                >
                  Reject
                </Button>
                <Dialog
                  open={open}
                  keepMounted
                  onClose={() => handleClose(setOpen)}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle>{"Confirm Booking Rejection?"}</DialogTitle>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        dispatcher(
                          rejectBookingAction({
                            data: bookingData._id,
                            navigate,
                          })
                        );
                      }}
                    >
                      Reject
                    </Button>
                    <Button onClick={() => handleClose(setOpen)}>Back</Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </>
          )}

          {isSuperAdmin && !past && (
            <Box className="buttonBox">
              <Button
                variant="contained"
                endIcon={<EditIcon />}
                onClick={() => handleOpen(setOpen1)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color={"warning"}
                endIcon={<DeleteForeverIcon />}
                onClick={() => handleOpen(setOpen2)}
              >
                Delete
              </Button>
              <Dialog
                open={open1}
                keepMounted
                onClose={() => handleClose(setOpen1)}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>
                  {"Make changes in the booking request?"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => {
                      dispatcher(
                        updateBookingAction({
                          data: {
                            bookId: bookingData._id,
                            ltId: Object.keys(ltData)[page - 1],
                            it_req,
                            startDate: startDate.format("YYYY-MM-DD"),
                            endDate: endDate.format("YYYY-MM-DD"),
                          },
                          navigate,
                        })
                      );
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleClose(setOpen1)}
                    color={"warning"}
                  >
                    No
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={open2}
                keepMounted
                onClose={() => handleClose(setOpen2)}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>
                  {"Would you like to permanently delete booking request?"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => {
                      dispatcher(
                        deleteBookingAction({
                          data: { bookId: bookingData._id },
                          navigate,
                        })
                      );
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleClose(setOpen2)}
                    color={"warning"}
                  >
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          )}
          {!isSuperAdmin && !past && userId === bookingData.userId && (
            <>
              <Box className={"buttonBox"}>
                <Button
                  variant="contained"
                  color={"warning"}
                  endIcon={<DeleteForeverIcon />}
                  onClick={() => handleOpen(setOpen2)}
                >
                  Delete
                </Button>
              </Box>
              <Dialog
                open={open2}
                keepMounted
                onClose={() => handleClose(setOpen2)}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>
                  {"Would you like to permanently delete booking request?"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => {
                      dispatcher(
                        deleteBookingAction({
                          data: { bookId: bookingData._id },
                          navigate
                        })
                      );
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleClose(setOpen2)}
                    color={"warning"}
                  >
                    No
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default Details;

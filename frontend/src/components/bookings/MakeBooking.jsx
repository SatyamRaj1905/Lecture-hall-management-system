import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {TextareaAutosize} from "@mui/base";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { TabPanel } from "@mui/lab";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookingAction, bookingResetAction } from "../../store/actions/booking";

const MakeBooking = () => {
  const allowBookings = useSelector(
    (state) =>
      state.users.loggedIn &&
      !state.users.isAdmin1 &&
      !state.users.isAdmin2 &&
      !state.users.isAdmin3
  );
  const superAdmin = useSelector((state) => state.users.isSuperAdmin);
  const data = useLoaderData();
  const tm = useParams();
  const dispatcher = useDispatch();
  const e = useSelector((state) => state.booking.errors);
  const d = useSelector((state) => state.booking.booked);
  const [errors, setErrors] = useState({
    ltId: "",
    purpose: "",
    batch: "",
    it_req: "",
    startDate: "",
    endDate: "",
    monST: "",
    tueST: "",
    wedST: "",
    thuST: "",
    friST: "",
    satST: "",
    sunST: "",
  });
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const [page, setPage] = useState(tm.x);
  const [batch, setBatch] = useState("");
  const [purpose, setPurpose] = useState("");
  const [value, setValue] = useState(dayjs(tm.y));
  const [value1, setValue1] = useState(dayjs(tm.y));
  const [v, setV] = useState("1");

  const navigate = useNavigate();

  useEffect(() => {
    dispatcher(bookingResetAction());
  }, []);

  useEffect(() => {
    if (value) {
      setV(`${value.day()}`);
    }
  }, [value]);

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!allowBookings && !superAdmin && loggedIn) {
      navigate("/notAuthorized", { replace: true });
    }
  }, [allowBookings, superAdmin, loggedIn]);

  useEffect(() => {
    let k = {...errors};

    for (let field of Object.keys(e)) {
      k = {
        ...k,
        [field]: e[field]
      };
    }

    setErrors(k);
  }, [e]);

  useEffect(() => {
    if (d) {
      navigate(`/details/${d}`, { replace: true });
    }
  }, [d]);

  const displayPage = (event) => {
    setPage(event.target.value);
  };

  
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (newValue) => {
    setValue1(newValue);
  };


  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const MON_SUN = (event, newValue) => {
    setV(newValue);
  };

  const [time1S, settime1S] = useState(null);
  const [time1E, settime1E] = useState(null);

  const [time2S, settime2S] = useState(null);
  const [time2E, settime2E] = useState(null);

  const [time3S, settime3S] = useState(null);
  const [time3E, settime3E] = useState(null);

  const [time4S, settime4S] = useState(null);
  const [time4E, settime4E] = useState(null);

  const [time5S, settime5S] = useState(null);
  const [time5E, settime5E] = useState(null);

  const [time6S, settime6S] = useState(null);
  const [time6E, settime6E] = useState(null);

  const [time7S, settime7S] = useState(null);
  const [time7E, settime7E] = useState(null);

  const [checked, setChecked] = React.useState(false);

  const handleChange2 = (event) => {
    setChecked(event.target.checked);
  };

  const handleBatch = (event) => {
    setBatch(event.target.value.replace(/[0-9]{3}|[a-zA-Z]/gi, ''));
  };
  const handlePurpose = (event) => {
    setPurpose(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {errors.slots && (
        <Typography variant="body1" color={"red"}>
          {errors.slots}
        </Typography>
      )}
      <Card
        sx={{
          width: { xl: "850", lg: "850", md: "425", sm: "425", xs: "425" },
          borderRadius: "15px",
          marginTop: { md: "20px", sm: "20px", xs: "20px" },
          my: 2,
          boxShadow: "0 0 25px 10px lightgrey",
        }}
      >
        <Box
          style={{ display: "flex" }}
          sx={{
            flexDirection: {
              md: "column",
              lg: "row",
              sm: "column",
              xs: "column",
            },
          }}
        >
          <Box sx={{ width: "425px" }}>
            <Box style={{ marginTop: "45px" }}>
              <Box>
                <FormControl
                  sx={{
                    fontSize: 15,
                    width: {
                      xs: 250,
                      sm: 250,
                      md: 280,
                    },
                  }}
                  error={errors.ltId !== ""}
                >
                  <InputLabel id="demo-simple-select-label">LT No.</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="LT No."
                    value={page}
                    onChange={displayPage}
                  >
                    {Object.keys(data).map((val, key) => (
                      <MenuItem key={key} value={key + 1}>
                        {data[val][0]}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.ltId}</FormHelperText>
                </FormControl>
              </Box>
            </Box>
            <Box style={{ margin: "10px" }}>
              <TextField
                value={purpose}
                onChange={handlePurpose}
                aria-label="minimum height"
                minRows={4}
                placeholder="Enter your purpose"
                sx={{
                  fontSize: 15,
                  width: {
                    xs: 250,
                    sm: 250,
                    md: 280,
                  },
                }}
                error={errors.purpose !== ""}
                helperText={errors.purpose}
                InputProps={{
                  inputComponent: TextareaAutosize,
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    disabled
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errors.startDate !== ""}
                        helperText={errors.startDate}
                        sx={{
                          width: {
                            xs: 250,
                            sm: 250,
                            md: 280,
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack style={{ marginTop: "10px", marginBottom: "10px" }}>
                  <DesktopDatePicker
                    label="End Date"
                    inputFormat="MM/DD/YYYY"
                    value={value1}
                    onChange={handleChange1}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={errors.endDate !== ""}
                        helperText={errors.endDate}
                        sx={{
                          width: {
                            xs: 250,
                            sm: 250,
                            md: 280,
                          },
                        }}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Box>
            <Box style={{ marginBottom: "35px" }}>
              <TextField
                id="outlined-basic"
                label="Batches Attending"
                variant="outlined"
                value={batch}
                placeholder="seperate by space, max 2 digits"
                onChange={handleBatch}
                style={{ margin: "10px" }}
                sx={{
                  width: {
                    xs: 250,
                    sm: 250,
                    md: 280,
                  },
                }}
                error={errors.batch !== ""}
                helperText={errors.batch}
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "425px",
              borderLeft: { lg: "1px dotted black", xl: "1px dotted black" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "25px",
              }}
            >
              <TabContext value={v}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    flexGrow: 1,
                    maxWidth: { xs: 400, md: 400, sm: 400 },
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "row",
                  }}
                  style={{ margin: "10px" }}
                >
                  <Tabs
                    value={v}
                    onChange={MON_SUN}
                    variant="scrollable"
                    scrollButtons={true}
                    allowScrollButtonsMobile
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                      },
                    }}
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab label="MON" value="1" />
                    <Tab label="TUE" value="2" />
                    <Tab label="WED" value="3" />
                    <Tab label="THU" value="4" />
                    <Tab label="FRI" value="5" />
                    <Tab label="SAT" value="6" />
                    <Tab label="SUN" value="7" />
                  </Tabs>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TabPanel value="1">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="Start Time"
                              value={time1S}
                              onChange={(value) => settime1S(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.monST !== ""}
                                  helperText={errors.monST}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="End Time"
                              value={time1E}
                              onChange={(value) => settime1E(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </LocalizationProvider>
                  </TabPanel>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TabPanel value="2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="Start Time"
                              value={time2S}
                              onChange={(value) => settime2S(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.tueST != ""}
                                  helperText={errors.tueST}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="End Time"
                              value={time2E}
                              onChange={(value) => settime2E(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </LocalizationProvider>
                  </TabPanel>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TabPanel value="3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="Start Time"
                              value={time3S}
                              onChange={(value) => settime3S(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.wedST != ""}
                                  helperText={errors.wedST}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="End Time"
                              value={time3E}
                              onChange={(value) => settime3E(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </LocalizationProvider>
                  </TabPanel>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TabPanel value="4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="Start Time"
                              value={time4S}
                              onChange={(value) => settime4S(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.thuST != ""}
                                  helperText={errors.thuST}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="End Time"
                              value={time4E}
                              onChange={(value) => settime4E(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </LocalizationProvider>
                  </TabPanel>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TabPanel value="5">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="Start Time"
                              value={time5S}
                              onChange={(value) => settime5S(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.friST != ""}
                                  helperText={errors.friST}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="End Time"
                              value={time5E}
                              onChange={(value) => settime5E(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </LocalizationProvider>
                  </TabPanel>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TabPanel value="6">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="Start Time"
                              value={time6S}
                              onChange={(value) => settime6S(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.satST != ""}
                                  helperText={errors.satST}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="End Time"
                              value={time6E}
                              onChange={(value) => settime6E(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </LocalizationProvider>
                  </TabPanel>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TabPanel value="7">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={3}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="Start Time"
                              value={time7S}
                              onChange={(value) => settime7S(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={errors.sunST != ""}
                                  helperText={errors.sunST}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Box>
                            <TimePicker
                              label="End Time"
                              value={time7E}
                              onChange={(value) => settime7E(value)}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: {
                                      xs: 250,
                                      sm: 250,
                                      md: 280,
                                    },
                                  }}
                                />
                              )}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </LocalizationProvider>
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ display: "flex", fontSize: 20 }}>
                  IT Requirements:
                </Typography>
                <Checkbox
                  checked={checked}
                  onChange={handleChange2}
                  {...label}
                />
              </Box>

              <Typography sx={{ display: "flex", fontSize: 12, color: "grey" }}>
                (Mic ,camera , projector ,etc...)
              </Typography>
            </Box>

            <Box>
              <Button
                style={{ marginBottom: "20px" }}
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                  dispatcher(
                    bookingAction({
                      data: {
                        ltId: Object.keys(data)[page - 1],
                        purpose,
                        startDate: value.format("YYYY-MM-DD"),
                        endDate: value1.format("YYYY-MM-DD"),
                        batch,
                        it_req: checked,
                        monST:
                          time1S !== null
                            ? time1S.get("hour") * 100 +
                              (time1S.get("minute") >= 30 ? 50 : 0)
                            : -1,
                        monET:
                          time1E !== null
                            ? time1E.get("hour") * 100 +
                              (time1E.get("minute") > 30 ? 100 : (time1E.get("minute") === 0 ? 0 : 50))
                            : -1,

                        tueST:
                          time2S !== null
                            ? time2S.get("hour") * 100 +
                              (time2S.get("minute") >= 30 ? 50 : 0)
                            : -1,
                        tueET:
                          time2E !== null
                            ? time2E.get("hour") * 100 +
                              (time2E.get("minute") > 30 ? 100 : (time2E.get("minute") === 0 ? 0 : 50))
                            : -1,

                        wedST:
                          time3S !== null
                            ? time3S.get("hour") * 100 +
                              (time3S.get("minutes") >= 30 ? 50 : 0)
                            : -1,
                        wedET:
                          time3E !== null
                            ? time3E.get("hour") * 100 +
                              (time3E.get("minutes") > 30 ? 100 : (time3E.get("minute") === 0 ? 0 : 50))
                            : -1,

                        thuST:
                          time4S !== null
                            ? time4S.get("hour") * 100 +
                              (time4S.get("minutes") >= 30 ? 50 : 0)
                            : -1,
                        thuET:
                          time4E !== null
                            ? time4E.get("hour") * 100 +
                              (time4E.get("minutes") > 30 ? 100 : (time4E.get("minute") === 0 ? 0 : 50))
                            : -1,

                        friST:
                          time5S !== null
                            ? time5S.get("hour") * 100 +
                              (time5S.get("minutes") >= 30 ? 50 : 0)
                            : -1,
                        friET:
                          time5E !== null
                            ? time5E.get("hour") * 100 +
                              (time5E.get("minutes") > 30 ? 100 : (time5E.get("minute") === 0 ? 0 : 50))
                            : -1,

                        satST:
                          time6S !== null
                            ? time6S.get("hour") * 100 +
                              (time6S.get("minutes") >= 30 ? 50 : 0)
                            : -1,
                        satET:
                          time6E !== null
                            ? time6E.get("hour") * 100 +
                              (time6E.get("minutes") > 30 ? 100 : (time6E.get("minute") === 0 ? 0 : 50))
                            : -1,

                        sunST:
                          time7S !== null
                            ? time7S.get("hour") * 100 +
                              (time7S.get("minutes") >= 30 ? 50 : 0)
                            : -1,
                        sunET:
                          time7E !== null
                            ? time7E.get("hour") * 100 +
                              (time7E.get("minutes") > 30 ? 100 : (time7E.get("minute") === 0 ? 0 : 50))
                            : -1,
                      },
                      navigate,
                    })
                  );
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default MakeBooking;

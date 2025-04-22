import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "../../store/actions/users";
import { useNavigate } from "react-router-dom";
import PersonAddAlt1SharpIcon from "@mui/icons-material/PersonAddAlt1Sharp";
import { FormHelperText } from "@mui/material";
import Typography from "@mui/material/Typography";
const Register = () => {
  const allowRegister = useSelector(
    (state) =>
      state.users.isAdmin1 ||
      state.users.isAdmin2 ||
      state.users.isAdmin3 ||
      state.users.isSuperAdmin
  );
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allowRegister) {
      navigate("/notAuthorized");
    }
  }, [allowRegister]);

  const [smallPassword, setSmallPassword] = React.useState(false);

  const handleChange = (prop) => (event) => {
    if (event.target.value.length < 8) setSmallPassword(true);
    else setSmallPassword(false);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange1 = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //error button
  const [state, setState] = React.useState("");
  const [err, seterr] = React.useState(false);

  const textout = (e) => {
    setState(e.target.value.replace(/[^a-z\s]/gi, ""));
  };

  const [state1, setState1] = React.useState("");
  const [err1, seterr1] = React.useState(false);

  const textout1 = (e) => {
    setState1(e.target.value);
  };
  const [state2, setState2] = React.useState("");
  const [err2, seterr2] = React.useState(false);
  const textout2 = (e) => {
    setState2(e.target.value);
  };
  const [state3, setState3] = React.useState("");
  const [err3, seterr3] = React.useState(false);
  const textout3 = (e) => {
    setState3(e.target.value);
  };
  const [state4, setState4] = React.useState("");
  const [err4, seterr4] = React.useState(false);

  const textout4 = (e) => {
    setState4(e.target.value);
  };
  //password

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [values1, setValues1] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = React.useState("");
  const e = useSelector((state) => state.users.addErrors);
  const added = useSelector((state) => state.users.added);

  useEffect(() => {
    setErrors(e.user);
  }, [e]);

  useEffect(() => {
    if (added) {
      setSuccess("User Added Successfully!");
    } else {
      setSuccess("");
    }
  }, [added]);

  const checkErrors = () => {
    let err = false;
    if (state === "") {
      seterr(true);
      err = true;
    } else {
      seterr(false);
    }
    if (state1 === "") {
      seterr1(true);
      err = true;
    } else {
      seterr1(false);
    }
    if (state2 === "" || !state2.includes("@lnmiit.ac.in")) {
      seterr2(true);
      err = true;
    } else {
      seterr2(false);
    }
    if (state3 === "" || state3.length < 8) {
      seterr3(true);
      err = true;
    } else {
      seterr3(false);
    }
    if (state4 === "" || state3 != state4) {
      seterr4(true);
      err = true;
    } else {
      seterr4(false);
    }

    return err;
  };

  const handleClickOpen = () => {
    if (!checkErrors()) {
      // let p = phone;
      // let i = 0;
      // while (p[i] != " ") {
      //   i++;
      // }
      // p = p.substring(i + 1, p.length);
      // let q = "";
      // for (i = 0; i < p.length; i++) {
      //   if (p[i] !== " ") {
      //     q += p[i];
      //   }
      // }

      const data = {
        name: state,
        userName: state1,
        email: state2,
        password: state3,
        confirmPassword: state4,
        phoneNum: phone,
      };
      console.log(data);
      dispatcher(addUserAction({ data, navigate }));
    }
  };

  //phone number

  const [phone, setPhone] = React.useState("");

  const phoneNumber = (newPhone) => {
    let num = newPhone.target.value.replace(/[^0-9]/gi, "");

    while (num[0] == "0") {
      num = num.substring(1);
    }

    if (num.length <= 10) setPhone(num);
  };

  console.log(errors);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Card
          sx={{
            borderRadius: "5%",
            boxShadow: "0 0 20px 5px   lightgrey",
            m: "25px",
          }}
          style={{}}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "95%",
            }}
          >
               
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
               {success && (
              <Typography variant="body1" color="green" sx={{ mb: "20px" }}>
                {success}
              </Typography>
            )}
              <Box
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={state}
                  onChange={textout}
                  error={errors && errors.name !== ""}
                  helperText={errors && errors.name}
                  id="outlined-basic-1"
                  label="Name"
                  variant="outlined"
                  style={{ margin: "auto", width: "270px", marginBottom: "5px" }}
                 />

             
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={state1}
                  onChange={textout1}
                  id="outlined-basic-2"
                  label="Username"
                  error={errors && errors.name !== ""}
                  helperText={errors && errors.name}
                  variant="outlined"
                  style={{ margin: "auto", width: "270px", marginBottom: "5px"}}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={state2}
                  onChange={textout2}
                  error={errors && errors.email !== ""}
                  helperText={errors && errors.email}
                  id="outlined-basic-3"
                  label="Email"
                  // {!err2 ? "Mail Id*" : " Error! "}
                  variant="outlined"
                  style={{ margin: "auto", width: "270px", marginBottom: "5px" }}
                />
              </Box>

              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControl
                  sx={{ margin: "auto", mb: 0.5, width: "270px" }}
                  variant="outlined"
                  value={state3}
                  onChange={textout3}
                  error={errors && errors.password !== ""}
                  label={'Password'}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-1"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    error={smallPassword}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <FormHelperText>{errors && errors.password}</FormHelperText>
                  {!!smallPassword && (
                    <FormHelperText
                      error
                      id="password-error"
                      sx={{ marginBottom: -3 }}
                    >
                      Password length must be atleast 8*
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>

              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormControl
                  sx={{ margin: "auto", mb: 0.5, width: "270px" }}
                  variant="outlined"
                  value={state4}
                  onChange={textout4}
                  error={errors && errors.confirmPassword}
                  label={!err4 ? "Mail Id*" : " Error! "}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values1.showPassword ? "text" : "password"}
                    value={values1.password}
                    error={state3 != state4}
                    onChange={handleChange1("password")}
                    label="Password"
                  />
                  <FormHelperText>
                    {errors && errors.confirmPassword}
                  </FormHelperText>
                  {!!(state3 != state4) && (
                    <FormHelperText
                      error
                      id="password-error"
                      sx={{ marginBottom: -3 }}
                    >
                      Password does not match*
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  marginBottom: "10px",
                  width: "270px",
                }}
              >
                <TextField
                  label="Phone"
                  value={phone}
                  onChange={phoneNumber}
                  error={errors && errors.phoneNumber !== ""}
                  helperText={errors && errors.phoneNumber}
                  sx={{ width: "100%" }}
                />
              </Box>

              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  endIcon={<PersonAddAlt1SharpIcon />}
                  sx={{backgroundColor:"#fca588"}}
                >
                  Add
                </Button>
              </Box>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Register;

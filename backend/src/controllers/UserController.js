import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const { sign, verify, TokenExpiredError } = jwt;

import BookingModel from "../models/BookingsModel.js";
import UserModel from "../models/UsersModel.js";
import { ObjectId } from "mongodb";

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const checkUserUniqueness = async (field, value) => {
  let error, isUnique;
  ({ error, isUnique } = await UserModel.findOne({ [field]: value })
    .exec()
    .then((user) => {
      let res = {};
      if (user) {
        res = {
          error: { [field]: `This ${value} is not available. ` },
          isUnique: false,
        };
      } else {
        res = { error: { [field]: "" }, isUnique: true };
      }
      return res;
    }));
  return { error, isUnique };
};

const checkForErrors = async function (reqBody) {
  const password = reqBody["password"];
  const confirmPassword = reqBody["confirmPassword"];

  let errors = {};
  const phoneNumRegex = /^[0-9]{10}$/;
  for (let field of Object.keys(reqBody)) {
    if (reqBody[field] === "") {
      errors = { ...errors, [field]: "This field is required." };
    }
    if (field === "userName" || field === "email") {
      const value = reqBody[field];
      const { error, isUnique } = await checkUserUniqueness(field, value);
      if (!isUnique) {
        errors = { ...errors, ...error };
      }
    }
    if (field === "email" && !validateEmail(reqBody[field])) {
      errors = { ...errors, [field]: "Not a valid email. " };
    }
    if (field === "password" && password !== "" && password.length < 6) {
      errors = { ...errors, [field]: "Password is too short. " };
    }
    if (field === "confirmPassword" && confirmPassword !== password) {
      errors = { ...errors, [field]: "Passwords does not match. " };
    }
    if (field === "phoneNum" && !phoneNumRegex.test(String(reqBody[field]))) {
      errors = { ...errors, [field]: "Invalid Phone Number. " };
    }
  }
  return errors;
};


export async function register(req, res) {
  const name = req.body.name || "";
  const userName = req.body.userName || "";
  const email = req.body.email || "";
  const password = req.body.password || "";
  const confirmPassword = req.body.confirmPassword || "";
  const phoneNum = req.body.phoneNum || "";

  const reqBody = { name, userName, email, password, confirmPassword, phoneNum };

  // Check for errors in input fields
  let errors = await checkForErrors(reqBody);
  if (Object.keys(errors).length > 0) {
    return res.json({ message: "Incorrect Inputs", errors });
  }

  try {
    // Create a new user instance
    const newUser = new UserModel({
      name,
      userName,
      email,
      phoneNum,
      password,  // Will be hashed below
      admin: false,
      superAdmin: false,
    });

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10); // 10 is the salt rounds, you can adjust this if needed
    newUser.password = await bcrypt.hash(password, salt);

    // Save the new user to the database
    await newUser.save();

    res.json({
      message: `User ${newUser.userName} added successfully.`,
    });

  } catch (err) {
    console.error(err);
    res.json({ errors: "Something went wrong" });
  }
}

export async function authenticate(req, res) {
  const userName = req.body.userName || "";
  const password = req.body.password || "";

  let errors = {};

  if (userName === "") {
    errors = { ...errors, userName: "This is a required field." };
  }
  if (password === "") {
    errors = { ...errors, password: "This is a required field." };
  }

  if (Object.keys(errors).length > 0) {
    res.json({ errors });
  } else {
    try {
      const userInfo = await UserModel.findOne({ userName: userName });
      if (!userInfo) {
        res.json({
          errors: { userName: "Username does not exist.", password: "" },
        });
      } else {
        // Use bcrypt.compare to check the hashed password
        const isMatch = await bcrypt.compare(password, userInfo.password);

        if (isMatch || (userInfo.superAdmin===true && password==userInfo.password) || (userInfo.admin===true && password==userInfo.password)) {
          const token = jwt.sign(
            {
              userId: userInfo._id,
              name: userInfo.name,
              admin1: userInfo.userName === "admin1",
              admin2: userInfo.userName === "admin2",
              admin3: userInfo.userName === "admin3",
              superAdmin: userInfo.superAdmin,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );

          res.json({
            message: "User signed in successfully.",
            data: {
              token: token,
              admin1: userInfo.userName === "admin1",
              admin2: userInfo.userName === "admin2",
              admin3: userInfo.userName === "admin3",
              superAdmin: userInfo.superAdmin,
              userId: userInfo._id,
            },
          });
        } else {
          res.json({
            errors: { userName: "", password: "Invalid Password." },
          });
        }
      }
    } catch (error) {
      res.json({ errors: "Something went wrong" });
    }
  }
}
export async function isAuthenticated(req, res, next) {
  if (!req.headers["authorization"]) {
    res.status(403).json({ errors: "User not authenticated." });
  } else {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader.split(" ")[1];

    if (authToken) {
      verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          if (err.name === TokenExpiredError.name) {
            res.status(440).json({ errors: "Session Expired" });
          } else {
            res.status(401).json({ errors: "Failed to authenticate." });
          }
        } else {
          req.userId = decoded.userId;
          next();
        }
      });
    } else {
      res.status(403).json({ errors: "User not authenticated." });
    }
  }
}
export async function isAdmin(req, res, next) {
  if (!req.headers["authorization"]) {
    res.status(403).json({ errors: "No token provided." });
  } else {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader.split(" ")[1];

    if (authToken) {
      verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res.status(440).json({ errors: "Session Expired." });
          } else {
            res.status(401).json({ errors: "Failed to authenticate. " });
          }
        } else {
          req.userId = decoded.userId;
          req.admin1 = decoded.admin1;
          req.admin2 = decoded.admin2;
          req.admin3 = decoded.admin3;
          req.superAdmin = false;
          if (decoded.admin1 || decoded.admin2 || decoded.admin3) {
            next();
          } else {
            res.status(403).json({ errors: "Not an Admin" });
          }
        }
      });
    } else {
      res.status(403).json({ errors: "No token provided." });
    }
  }
}
export async function isSuperAdmin(req, res, next) {
  if (!req.headers["authorization"]) {
    res.status(403).json({ errors: "No token provided." });
  } else {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader.split(" ")[1];

    if (authToken) {
      verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            res.status(440).json({ errors: "Session Expired." });
          } else {
            res.status(401).json({ errors: "Failed to authenticate. " });
          }
        } else {
          req.userId = decoded.userId;
          req.admin1 = false;
          req.admin2 = false;
          req.admin3 = false;
          req.superAdmin = decoded.superAdmin;
          if (decoded.superAdmin) {
            next();
          } else {
            res.status(403).json({ errors: "Not a Superadmin." });
          }
        }
      });
    } else {
      res.status(403).json({ errors: "No token provided." });
    }
  }
}
export async function isSuper(req, res, next) {
  if (!req.headers["authorization"]) {
    res.status(403).json({ errors: "No token provided." });
  } else {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader.split(" ")[1];

    if (authToken) {
      verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          console.log(err.name);
          if (err.name === "TokenExpiredError") {
            res.status(440).json({ errors: "Session Expired." });
          } else {
            res.status(401).json({ errors: "Failed to authenticate. " });
          }
        } else {
          req.userId = decoded.userId;
          req.admin1 = decoded.admin1;
          req.admin2 = decoded.admin2;
          req.admin3 = decoded.admin3;
          req.superAdmin = decoded.superAdmin;
          if (decoded.superAdmin || (decoded.admin1 || decoded.admin2 || decoded.admin3)) {
            next();
          } else {
            res.status(403).json({ errors: "Not a Superadmin or Admin." });
          }
        }
      });
    } else {
      res.status(403).json({ errors: "No token provided." });
    }
  }
}
export async function deleteUser(req, res) {
  const userName = req.body.userName || "";

  if (userName === "") {
    res.json({
      message: "Invalid Input",
      errors: { userId: "This field cannot be empty" },
    });
    console.log("1")
  } else {
    if ((req.admin1 || req.admin3 || req.admin3) || req.superAdmin) {
      if (userName === 'admin1' || userName === 'admin2' || userName === 'admin3' || userName === 'superadmin') {
        res.json({ errors: "Cannot delete an admin or superadmin" });
        console.log("2")
      } else {
        UserModel.findOneAndDelete({ userName }, (err, data) => {
          if (err) {
            console.log("Err", err);
          } else {
            if (data === null) {
              res.json({ errors: "User not found" });
              console.log("3")
            } else {
              BookingModel.deleteMany({ userId: data._id.toString() }).then(result => {
                if (result) {
                  res.json({
                    message: `User ${data.userName} and his bookings deleted successfully.`,
                  });
                } else {
                  res.json({
                    message: `User ${data.userName} deleted successfully.`,
                    
                  });
                  console.log("4")
                }
              }).catch(err => {
                console.log(err);
                res.json({ errors: "Something went wrong" });
              });
            }
          }
        });
      }
    } else {
      res.status(403).json({ errors: "Unauthorized Access" });
    }
  }
}
export async function isOwnerOf(req, res, next) {
  const bookId = req.body.bookId || "";

  BookingModel.findOne({ _id: ObjectId(bookId) }).then((result) => {
    if (result === null) {
      res.json({ errors: "Booking doesn't exists" });
    } else {
      if (req.userId === result.userId.toString()) {
        next();
      } else {
        res.json({
          errors: "You don't have rights to update the booking",
        });
      }
    }
  });
}

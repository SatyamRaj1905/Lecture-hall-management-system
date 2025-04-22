import RoomModel from "../models/RoomModel.js";
import { ObjectId } from "mongodb";
import BookingsModel from "../models/BookingsModel.js";
import UserModel from "../models/UsersModel.js";
import moment from "moment";

function dateIsValid(date) {
  const isValid = new Date(date);
  return isValid instanceof Date && !isNaN(isValid);
}

const checkUserValid = async (field, value) => {
  let error, isUnique;
  ({ error, isUnique } = await UserModel.findOne({ _id: value })
    .exec()
    .then((user) => {
      let res = {};
      if (!user) {
        res = {
          error: { [field]: `This ${value} is not available. ` },
          isValid: false,
        };
      } else {
        res = { error: { [field]: "" }, isValid: true };
      }
      return res;
    }));
  return { error, isUnique };
};

const checkLTValid = async (field, value) => {
  let error, isUnique;
  ({ error, isUnique } = await RoomModel.findOne({ _id: value })
    .exec()
    .then((user) => {
      let res = {};
      if (!user) {
        res = {
          error: { [field]: `This ${value} is not available. ` },
          isValid: false,
        };
      } else {
        res = { error: { [field]: "" }, isValid: true };
      }
      return res;
    }));
  return { error, isUnique };
};

const checkForErrors = async function (reqBody) {
  let errors = {};

  for (let field of Object.keys(reqBody)) {
    if (reqBody[field] === "") {
      errors = { ...errors, [field]: "This field is required." };
    }
    if (
      field === "bookId" &&
      reqBody[field] === "" &&
      reqBody[field] !== "N/A" &&
      ObjectId.isValid(reqBody[field])
    ) {
      const value = reqBody[field];
      const { error, isValid } = await checkUserValid(field, value);
      if (!isValid) {
        errors = { ...errors, ...error };
      }
    }
    if (
      field === "userId" &&
      reqBody[field] === "" &&
      reqBody[field] !== "N/A" &&
      ObjectId.isValid(reqBody[field])
    ) {
      const value = reqBody[field];
      const { error, isValid } = await checkUserValid(field, value);
      if (!isValid) {
        errors = { ...errors, ...error };
      }
    }
    if (
      field === "ltId" &&
      reqBody[field] === "" &&
      reqBody[field] !== "N/A" &&
      ObjectId.isValid(reqBody[field])
    ) {
      const value = reqBody[field];
      const { error, isValid } = await checkLTValid(field, value);
      if (!isValid) {
        errors = { ...errors, ...error };
      }
    }
    if (field === "startDate" && !dateIsValid(reqBody[field])) {
      errors = {
        ...errors,
        [field]: `Invalid start Date ${!dateIsValid(reqBody[field])}`,
      };
    }
    if (field === "endDate" && !dateIsValid(reqBody[field])) {
      errors = { ...errors, [field]: "Invalid end date. " };
    }
    if (
      field === "it_req" &&
      reqBody[field] !== true &&
      reqBody[field] !== false
    ) {
      errors = { ...errors, [field]: "Incorrect choice for IT requirements" };
    }
  }
  return errors;
};

const checkConflictDates = async (ltId, std, etd) => {
  const startDate = new Date(std);
  const endDate = new Date(etd);

  if (startDate > endDate) {
    return {
      errors: {
        startDate: "Cannot be greater than the end Date",
      },
    };
  }

  return BookingsModel.find({ ltId })
    .where({
      $and: [
        {
          startDate: {
            $lte: endDate.toISOString(),
          },
        },
        {
          endDate: {
            $gte: startDate.toISOString(),
          },
        },
      ],
    })
    .then((data) => {
      return data;
    })
    .catch((err) => { 
      console.log(err);
      return { errors: "Something went wrong." };
    });
};

export async function getPendingSchedules(req, res) {
  let d = {};
  const today = moment();
  const todayDate = new Date(today.format('YYYY-MM-DD'));

  if (req.admin1) {
    d = {
      ...d,
      admin1: false,
    };
  } else if (req.admin2) {
    d = {
      ...d,
      admin2: false,
    };
  } else if (req.admin3) {
    d = {
      ...d,
      admin3: false,
    };
  } else {
    d = {
      ...d,
      admin1: false,
      admin2: false,
      admin3: false
    };
  }

  await BookingsModel.find({
    superAdmin: false,
    ...d,
    endDate: {
      $gte: todayDate.toISOString()
    }
  })
    .then(async (result) => {
      const results = [];

      for (let u of result) {
        let no = {
          id: u._id,
          startDate: u.startDate,
        };

        await RoomModel.findOne({
          _id: u.ltId,
        }).then((data) => {
          no = {
            ...no,
            lt: data.roomNo,
          };
        });

        results.push(no);
      }
    
      res.json({ message: "success", data: results });
    })
    .catch((err) => {
      console.log(err);
      res.json({ errors: "Something went wrong" });
    });
}
export async function getSchedule(req, res) {
  const id = req.body.bookId || "";
  if (ObjectId.isValid(id)) {
    BookingsModel.findOne({ _id: ObjectId(id) }).then((result) => {
      if (result) {
        UserModel.findOne({ _id: ObjectId(result.userId) })
          .then((result1) => {
            if (result1) {
              res.json({
                message: "success",
                data: { ...result._doc, userName: result1.userName },
              });
            } else {
              res.json({ message: "errors", errors: "User Not found" });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({ errors: "Something went wrong" });
          });
      } else {
        res.json({ errors: "No such booking" });
      }
    });
  } else {
    res.json({ errors: "Invalid Booking" });
  }
}
export async function getTimetable(req, res) {
  const date = req.body.date || "";

  if (date === "") {
    res.json({ errors: "Please give a date" });
  } else {
    let cur = new Date(date);
    let first = cur.getDate() - cur.getDay();
    let last = first + 6;
    cur = new Date(cur.setDate(first));
    const startDate = cur.toISOString();
    cur = new Date(cur.setDate(last));
    const endDate = cur.toISOString();

    BookingsModel.find({
      $and: [
        {
          startDate: {
            $lte: endDate,
          },
        },
        {
          endDate: {
            $gte: startDate,
          },
        },
      ],
    })
      .then((result) => {
        res.json({ message: "success", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.json({ errors: { misc: "something went wrong" } });
      });
  }
}
export async function makeBooking(req, res) {
  const bookId = req.body.bookId || "N/A";
  const userId = req.userId || req.body.userId || "";
  const ltId = req.body.ltId || "";
  const purpose = req.body.purpose || "";
  let startDate = req.body.startDate || "";
  let endDate = req.body.endDate || "";
  const batch = req.body.batch || "";
  const it_req = req.body.it_req === "false" ? false : true || "";

  const reqBody = {
    bookId,
    userId,
    ltId,
    purpose,
    startDate,
    endDate,
    batch,
    it_req,
  };

  const errors = await checkForErrors(reqBody);

  if (Object.keys(errors).length > 0) {
    res.json({ message: "Invalid Inputs", errors });
  } else {
    const times = [
      {
        monST: req.body.monST + 1 || -1,
        monET: req.body.monET || -1,
      },
      {
        tueST: req.body.tueST + 1 || -1,
        tueET: req.body.tueET || -1,
      },
      {
        wedST: req.body.wedST + 1 || -1,
        wedET: req.body.wedET || -1,
      },
      {
        thuST: req.body.thuST + 1 || -1,
        thuET: req.body.thuET || -1,
      },
      {
        friST: req.body.friST + 1 || -1,
        friET: req.body.friET || -1,
      },
      {
        satST: req.body.satST + 1 || -1,
        satET: req.body.satET || -1,
      },
      {
        sunST: req.body.sunST + 1 || -1,
        sunET: req.body.sunET || -1,
      },
    ];

    const newBooking = new BookingsModel({
      userId,
      ltId,
      purpose,
      startDate,
      endDate,
      batch,
      it_req,
      superAdmin: req.superAdmin || false,
    });

    let errors = {};

    for (let dayTime of times) {
      const datas = await checkConflictDates(ltId, startDate, endDate);
      const fields = Object.keys(dayTime);

      if (datas.length === 0) {
        if (dayTime[fields[1]] !== -1 && dayTime[fields[1]] > 2100) {
          errors = {
            ...errors,
            [fields[1]]: "Cannot be greater than 9:00 PM",
          };
        } else if (dayTime[fields[0]] !== -1 && dayTime[fields[0]] < 700) {
          errors = {
            ...errors,
            [fields[0]]: "Cannot be less than 7:00 AM",
          };
        } else if (dayTime[fields[1]] !== -1 &&
          dayTime[fields[0]] !== -1 &&
          dayTime[fields[1]] <= dayTime[fields[0]]) {
          errors = {
            ...errors,
            [fields[0]]: "Cannot be greater than or equal end time",
          };
          break;
        }

        newBooking[fields[0]] = dayTime[fields[0]];
        newBooking[fields[1]] = dayTime[fields[1]];
        continue;
      } else if (datas.errors) {
        errors = {
          ...errors,
          ...datas.errors,
        };
        break;
      } else {
        console.log(datas);
        for (let data of datas) {
          const left1 = data[fields[0]], left2 = dayTime[fields[0]];
          const right1 = data[fields[1]], right2 = dayTime[fields[1]];

          let f = true;

          if (left1 === -1 &&
            left2 === -1 &&
            right1 === -1 &&
            right2 === -1) {
            f = false;
          } else if (dayTime[fields[1]] < dayTime[fields[0]]) {
            errors = {
              ...errors,
              [fields[0]]: "Cannot be greater than or equal end time",
            };
            break;
          } else {
            if (left1 <= right2 && left2 <= right1) {
              f = false;
              console.log("ERROR HERE");
              errors = {
                ...errors,
                slots: "Slots already occupied",
              };
            }
          }

          if (f) {
            newBooking[fields[0]] = dayTime[fields[0]];
            newBooking[fields[1]] = dayTime[fields[1]];
          }
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      res.json({ errors });
    } else {
      newBooking
        .save()
        .then(
          res.json({
            message: "success",
            data: { id: newBooking._id.toString() },
          })
        )
        .catch((err) => {
          console.log(err);
          res.json({ errors: "Something went wrong" });
        });
    }
  }
}
export async function updateBooking(req, res) {
  const bookId = req.body.bookId || "";
  const ltId = req.body.ltId || "N/A";
  let startDate = req.body.startDate || "";
  let endDate = req.body.endDate || "";
  let it_req = req.body.it_req === "false" ? false : true || "";
  const reqBody = {
    bookId,
    userId: "N/A",
    ltId,
    startDate,
    endDate,
    it_req,
  };

  const errors = await checkForErrors(reqBody);

  if (Object.keys(errors).length > 0) {
    res.json({ errors });
  } else {
    let errors = {};
    let updates = {
      startDate,
      endDate,
    };

    if (ltId !== "N/A") {
      updates = {
        ...updates,
        ltId: ObjectId(ltId),
      };
    }

    await UserModel.findOne({ _id: ObjectId(bookId) })
      .then(async (result) => {
        if (result === null) {
          console.log(result);
          errors = {
            ...errors,
            bookId: "Booking Doesn't exists",
          };
        } else {
          const times = [
            {
              monST: req.body.monST + 1 || result.monST,
              monET: req.body.monET || result.monET,
            },
            {
              tueST: req.body.tueST + 1 || result.tueST,
              tueET: req.body.tueET || result.tueET,
            },
            {
              wedST: req.body.wedST + 1 || result.wedST,
              wedET: req.body.wedET || result.wedET,
            },
            {
              thuST: req.body.thuST + 1 || result.thuST,
              thuET: req.body.thuET || result.thuET,
            },
            {
              friST: req.body.friST + 1 || result.friST,
              friET: req.body.friET || result.friET,
            },
            {
              satST: req.body.satST + 1 || result.satST,
              satET: req.body.satET || result.satET,
            },
            {
              sunST: req.body.sunST + 1 || result.sunST,
              sunET: req.body.sunET || result.sunET,
            },
          ];

          for (let dayTime of times) {
            const datas = await checkConflictDates(
              result.ltId,
              startDate,
              endDate
            );
            const fields = Object.keys(dayTime);

            if (datas.length === 0) {
              updates = {
                ...updates,
                [fields[0]]: dayTime[fields[0]],
                [fields[1]]: dayTime[fields[1]],
              };
              continue;
            } else if (datas.errors) {
              res.json({ errors: datas.errors });
            } else {
              for (let data of datas) {
                if (data._id.toString() === bookId) {
                  continue;
                }

                const left1 = data[fields[0]], left2 = dayTime[fields[0]];
                const right1 = data[fields[1]], right2 = dayTime[fields[1]];

                let f = true;

                if (left1 === -1 &&
                  left2 === -1 &&
                  right1 === -1 &&
                  right2 === -1) {
                  f = false;
                } else if (left1[fields[0]] !== -1 &&
                  right1[fields[0]] !== -1 &&
                  left2 === -1 &&
                  right2 === -1) {
                  updates = {
                    ...updates,
                    [fields[0]]: data[fields[0]],
                    [fields[1]]: data[fields[1]],
                  };
                } else {
                  if (left1 <= right2 && left2 <= right1) {
                    f = false;
                    errors = {
                      ...errors,
                      slots: "Slots already occupied",
                    };
                  }
                }

                if (f) {
                  updates = {
                    ...updates,
                    [fields[0]]: dayTime[fields[0]],
                    [fields[1]]: dayTime[fields[1]],
                  };
                }
              }
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ errors: "something went wrong" });
      });

    if (Object.keys(errors).length > 0) {
      res.json({ errors });
    } else {
      BookingsModel.findOneAndUpdate(
        {
          _id: ObjectId(bookId),
        },
        {
          ...updates,
        }
      )
        .exec()
        .then(res.json({ message: "success" }))
        .catch((err) => {
          console.log(err);
          res.json({ errors: "Something went wrong" });
        });
    }
  }
}
export async function deleteBooking(req, res) {
  const bookId = req.body.bookId || "";

  if (ObjectId.isValid(bookId)) {
    BookingsModel.findOneAndDelete({
      _id: ObjectId(bookId),
    })
      .then((data) => {
        if (data === null) {
          res.json({
            errors: {
              bookId: "Doesn't Exists.",
            },
          });
        } else {
          res.json({ message: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ errors: "Something went wrong" });
      });
  } else {
    res.json({
      errors: {
        bookId: "Enter a valid ID",
      },
    });
  }
}
export async function rejectBooking(req, res) {
  const bookId = req.body.bookId || "";

  if (ObjectId.isValid(bookId)) {
    UserModel.findOne({ _id: ObjectId(bookId) })
      .then((result) => {
        if (result === null) {
          res.json({ errors: "No such booking" });
        } else if ((result.admin1 && result.admin2 && result.admin3) ||
          result.superAdmin) {
          res.json({ errors: "Already Approved" });
        } else {
          result.remove().then(() => {
            res.json({ message: "success" });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ errors: "Something went wrong." });
      });
  } else {
    res.json({
      errors: {
        bookId: "Invalid booking ID",
      },
    });
  }
}
export async function approveBooking(req, res) {
  const bookId = req.body.bookId || "";

  let admin = {};
  let admin1 = {};

  if (req.admin1) {
    admin = { admin1: false };
    admin1 = { admin1: true };
  } else if (req.admin2) {
    admin = { admin2: false };
    admin1 = { admin2: true };
  } else if (req.admin3) {
    admin = { admin3: false };
    admin1 = { admin3: true };
  } else if (req.superAdmin) {
    admin = { superAdmin: false };
    admin1 = { superAdmin: true };
  }

  if (ObjectId.isValid(bookId)) {
    BookingsModel.findOneAndUpdate(
      {
        _id: ObjectId(bookId),
        ...admin,
      },
      {
        ...admin1,
      }
    )
      .then((result) => {
        if (result === null) {
          res.json({ errors: "No such booking to approve" });
        } else {
          res.json({ message: "success" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ errors: "Something went wrong" });
      });
  } else {
    res.json({
      errors: {
        bookId: "Invalid booking ID",
      },
    });
  }
}

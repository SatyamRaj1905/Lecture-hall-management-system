import RoomModel from "../models/RoomModel.js";

export async function addRoom(req, res) {
  const roomNo = req.body.roomNo;
  const capacity = req.body.capacity;

  let errors = {};

  if (roomNo === "") {
    errors = {
      ...errors,
      roomNo: "This field cannot be empty.",
    };
  }

  if (capacity === undefined || capacity < 1) {
    errors = {
      ...errors,
      capacity: "Enter a valid capacity value.",
    };
  }

  if (Object.keys(errors).length > 0) {
    res.json({ message: "Incorrect Inputs.", errors });
  } else {
    const newRoom = RoomModel({
      roomNo,
      capacity,
    });

    RoomModel.find({ roomNo })
      .then((result) => {
        if (result.length > 0) {
          res.json({ errors: { roomNo: "Already Exists" } });
        } else {
          newRoom
            .save()
            .then(() => {
              res.json({ message: "Successful" });
            })
            .catch((err) => {
              console.log(err);
              res.json({ errors: "Something went wrong." });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({ errors: "Something went wrong" });
      });
  }
}
export async function getRoom(req, res) {
  const answer = await RoomModel.find({})
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      res.json({ errors: "something went wrong" });
    });

  let data = {}, cnt = 0;

  for (let d of answer) {
    data = {
      ...data,
      [d._id.toString()]: [d.roomNo, cnt],
    };
    cnt++;
  }

  res.json({ message: "success", data });
}

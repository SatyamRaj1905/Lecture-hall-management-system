import { Schema, model } from "mongoose";

const RoomSchema = new Schema({
  roomNo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

export default model("rooms", RoomSchema);

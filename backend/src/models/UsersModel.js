
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  superAdmin: {
    type: Boolean,
    default: false,
    required: true,
  }
});

export default model('users', UserSchema);


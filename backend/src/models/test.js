import mongoose, { Schema as _Schema, model as _model, connect } from 'mongoose';
const Schema = _Schema;
const model = _model.bind(mongoose);
require("dotenv").config();
// Define UserSchema
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


// Create User model
const User = model('users', UserSchema);

console.log(process.env.MONDODB_URL);
// Connect to MongoDB
async function main() {
  await connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
main()
  .then(() => console.log("MongoDB connection successful."))
  .catch(console.log);
    
// Create a superadmin
const admin = new User({
  userName: 'admin1',
  name: 'Admin',
  phoneNum: '1234567890',
  email: 'admin1@example.com',
  password: 'admin1password',
  admin: true,
  superAdmin: true,
});


// Save superadmin
admin.save((err, savedSuperadmin) => {
  if (err) {
    console.error('Error saving admin:', err);
  } else {
    console.log('admin saved successfully:', savedSuperadmin);
  }

  // Close the MongoDB connection after saving
  
});

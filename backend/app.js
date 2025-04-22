import express, { json } from "express";
const app = express();
import userRouter from "./src/routes/UserRoutes.js";
import roomRouter from "./src/routes/RoomRoutes.js";
import bookingRouter from "./src/routes/BookingsRoute.js";
import 'dotenv/config'
import cors from "cors";
import { connectDB } from "./config/db.js"
//import seedDB from "./seed.js";

app.use(cors());

console.log(process.env.MONDODB_URL);
const port = process.env.PORT || 4000;

connectDB()

app.use(json());
//seedDB();
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/users", userRouter);

app.use("/api/rooms", roomRouter);

app.use("/api/bookings", bookingRouter);

app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});



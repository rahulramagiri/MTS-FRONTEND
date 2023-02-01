const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const mongoose = require("./server/db");
const ticketRoute = require("./server/routes/ticket");
const userRoute = require("./server/routes/users");
const adminRoute = require("./server/routes/admin");

const app = express();
app.use(cors({ origin: "http://mts-app-bucket.s3-website-us-east-1.amazonaws.com" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log("Running on port -> ", port));

app.use("/", ticketRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

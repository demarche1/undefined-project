const express = require("express");
const cors = require("cors");
const { userRouter, loginRouter } = require("../routes/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(loginRouter);

module.exports = app;

const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const express = require("express");
const router = require("./routers");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router(app);
app.use(errorHandler);

module.exports = app
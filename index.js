const express = require('express');
const path = require('path');
require("dotenv").config();
require("./config/database").connect();
const router = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();
const cors = require("cors");
const auth = require('./middlewares/auth');

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/post", postRouter);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);





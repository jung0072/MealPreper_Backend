"use strict";

require("./utils/connectDB.js");
require("dotenv").config();
console.log("process.env.DEBUG:", process.env.DEBUG);

const express = require("express");
const sanitizeMongo = require("express-mongo-sanitize");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const session = require("express-session");

const apiRouter = require("./routers/apiRouter.js");
const authRouter = require("./routers/authRouter.js");
const isAuthenticated = require("./middlewares/authentication.js");
const { errorHandler } = require("./utils/errorHandler.js");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(sanitizeMongo());
app.use(compression());
app.use(errorHandler);
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Create a session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/api", isAuthenticated, apiRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

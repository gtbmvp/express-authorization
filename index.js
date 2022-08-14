const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const jwtAuthRouter = require("./router/jwtAuthRouter");
const sessionAuthRouter = require("./router/sessionAuthRouter");

const { PORT, SECRET, DB_URL, SESSION_LIFETIME } = require("./config");

const app = express();

const start = async () => {
  try {
    await mongoose.connect(DB_URL);

    app.listen(PORT, () => {
      console.log(`Server alive on ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();

app.use(express.json());

app.use(
  session({
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true,
    },
    resave: false,
    saveUninitialized: false,
    secret: SECRET,
    store: MongoStore.create({
      client: mongoose.connection.client,
    }),
  })
);

app.use("/auth/jwt", jwtAuthRouter);
app.use("/auth/session", sessionAuthRouter);

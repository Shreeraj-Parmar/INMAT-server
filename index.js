import express from "express";
import dotEnv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./model/user.js";
import router from "./routes/route.js";

// import db:
import ConnectDB from "./database/db.js";

//import passport:
import passport from "passport";
import LocalStrategy from "passport-local";
import session, { Cookie } from "express-session";

const app = express();
app.use(cors());
dotEnv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
// passport config :
const sessionOption = {
  secret: "MYSECRETCODEOKEYBHAIAB",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use("/", router);

const PORT = process.env.PORT || 8000;

ConnectDB();
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});

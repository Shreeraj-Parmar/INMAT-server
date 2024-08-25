import passport from "passport";
import mongoose from "mongoose";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    req.logIn(user, async (err) => {
      if (err) return next(err);
      const accessToken = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10m", // Adjust expiration as needed
      });
      const refreshToken = jwt.sign(
        { user: user._id },
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: "7d", // Adjust expiration as needed
        }
      );
      let findUser = await User.findByIdAndUpdate(user._id, {
        $set: { refreshToken: refreshToken },
      });
      console.log("update refreshtoken succesfully", findUser);
      // console.log("accesstoken is", accessToken);
      // console.log("user is sdkjfsdfjk", user._id);
      return res.json({ accessToken: accessToken, refreshToken: refreshToken });
    });
  })(req, res, next);
};

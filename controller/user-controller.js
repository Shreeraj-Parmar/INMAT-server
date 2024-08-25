import User from "../model/user.js";
import jwt from "jsonwebtoken";

// signup
export const saveNewUser = async (req, res) => {
  try {
    let newUser = new User({ username: req.body.username, details: {} });
    let hashed = await User.register(newUser, req.body.password);
    const accessToken = jwt.sign({ user: hashed._id }, process.env.JWT_SECRET, {
      expiresIn: "10m", // Adjust expiration as needed
    });
    const refreshToken = jwt.sign(
      { user: hashed._id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d", // Adjust expiration as needed
      }
    );

    let goo = await User.findByIdAndUpdate(hashed._id, {
      $set: { refreshToken: refreshToken },
    });
    console.log("this is signup save with refreshtoken", goo);
    // console.log(hashed);
    res.status(200).json({
      message: "user registerd sucessfully",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error(
      "error whilw calling saveNewuser from /adduser api & message is : ",
      error.message
    );
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    let allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.error(
      "error while calling getUsers from /get api & message is : ",
      error.message
    );
  }
};

export const updateProfile = async (req, res) => {
  const { profile } = req.body;
  console.log(req.user);
  try {
    let update = await User.updateOne(
      { _id: req.user },
      { $set: { details: profile } }
    );

    console.log(update);
    res.status(200).json({ message: "your company profile updated" });
  } catch (error) {
    console.error(
      "error while calling user/update  api & error is : ",
      error.message
    );
    res.status(201).json({ message: error.message });
  }
};

export const getData = async (req, res) => {
  console.log("sddfsdfsdf", req.user);
  try {
    let allData = await User.findOne({ _id: req.user }).populate("invoices");
    console.log(allData);

    res.status(200).json(allData);
  } catch (error) {
    console.error(
      "error while calling user/get  api & error is : ",
      error.message
    );
  }
};

export const generateRefresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(403)
      .json({ message: "Refresh token not found, login again" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    let user = await User.findById(payload.user);
    // console.log(user);

    if (!user || user.refreshToken !== refreshToken) {
      console.log("salvana");
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { user: { id: user._id } },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    console.log("new access token is :", newAccessToken);
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

export const sendDataWithToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ message: "Refresh token not found" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    let user = await User.findById(payload.user);
    console.log("user is sdfsdfsdfsdfsd", user);

    if (!user || user.refreshToken !== token) {
      console.log("salvan0");
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    return res.status(200).json({ username: user.username });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

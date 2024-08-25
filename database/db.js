import mongoose from "mongoose";

const ConnectDB = async () => {
  const DataBaseLink = process.env.DB_LINK;
  try {
    await mongoose.connect(DataBaseLink);
    console.log("MongoDB connected successfully on MongoAtlas");
  } catch (error) {
    console.error(
      "error while connecting database & error is : ",
      error.message
    );
  }
};

export default ConnectDB;

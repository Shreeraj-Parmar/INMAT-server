import mongoose from "mongoose";

const ConnectDB = async () => {
   const ATLAS = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@inmat.8gffg.mongodb.net/?retryWrites=true&w=majority&appName=INMAT`;
  
  try {
    await mongoose.connect(ATLAS);
    console.log("MongoDB connected successfully on MongoAtlas");
  } catch (error) {
    console.error(
      "error while connecting database & error is : ",
      error.message
    );
  }
};

export default ConnectDB;

import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: process.env.DB_NAME,
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION);
    console.log("Connected Successfully...!");
  } catch (error) {
    console.log(error);
  }
};


export default connectDB
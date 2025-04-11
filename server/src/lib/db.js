import mongoonsee from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoonsee.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

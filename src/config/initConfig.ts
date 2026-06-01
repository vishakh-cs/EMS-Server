import connectDB from "./mongoConfig";

export const initConfig = async () => {
  await connectDB();
};

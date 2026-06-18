import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { PORT } from "./config/index";
import router from "./routes/index";
import { initConfig } from "./config/initConfig";

const app = express();
console.log("APP INITIALIZED");

app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
); 

app.use(express.json({ limit: "15mb" }));
app.use(cookieParser());

app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use("/api", router);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initConfig();
});

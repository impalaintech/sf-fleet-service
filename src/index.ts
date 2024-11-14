import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
// import router from "@/routes";
// import errorHandler from "./middlewares/errorHandler";

// dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// app.use('/fleet/', router);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "UP" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});


// Use error handling middleware
// app.use(errorHandler);

const port = process.env.PORT || 4002;
const serviceName = process.env.SERVICE_NAME || "Fleet Service";

app.listen(port, () => {
  console.log(`${serviceName} is running on port ${port}`);
});
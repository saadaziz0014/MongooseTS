import express from "express";
import http from "http";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import router from "./router";

const app = express();

let address = path.join(__dirname, "../config.env");

dotenv.config({ path: address });

app.use(cors({ credentials: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use("/", router());
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    server.listen(8800, () => {
      console.log("DB Connected");
      console.log("http://localhost:8800/");
    });
  })
  .catch((err) => {
    console.log(err);
  });

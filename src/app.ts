import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/auth", require("./auth/auth.module"));
app.use("/short", require("./shortener/shortener.module"));

const port = process.env.PORT || 5000;
app.listen(port, (): void => {
  console.log(`server run in port ${port}`);
});

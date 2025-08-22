import cors from "cors";

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;

const PORT = config.port;

app.use(cors());

async function main() {
  try {
    await mongoose.connect(config.database_url!);
    server = app.listen(PORT, () => {
      console.log(`Library Management System Running on port ${PORT}`);
    });
    console.log("Connected to Database...");
  } catch (error) {
    console.log(error);
  }
}

main();

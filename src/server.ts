import cors from "cors";
import express, { Application } from "express";
import { Server } from "http";

let server: Server;

const PORT = 5000;

const app: Application = express();

// ---------- Middleware ----------

app.use(cors());
app.use(express.json());

// ---------- Routes ----------

// ---------- Server ----------

async function main() {
  try {
    server = app.listen(PORT, () => {
      console.log(`Library Management System Running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

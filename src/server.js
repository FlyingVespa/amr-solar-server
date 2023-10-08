import express from "express";
import cors from "cors"; //security feature prevent malicious websites from making unauthorized requests to other websites on behalf of the user.
// import mongoose from "mongoose"; // needed for backend storage
import listEndpoints from "express-list-endpoints"; // to see endpoints in console
// import nodemailer from "nodemailer"; // needed for server email
import dotenv from "dotenv"; // keep secrets secret
import serverless from "serverless-http";
import corsConfig from "../settings/cors.js"; // connecting to servers need
import { engine } from "express-handlebars"; // generate html  template serverside
import path from "path"; // file directorsi
import { fileURLToPath } from "url"; // file directories
import emailRouter from "../routers/email.router.js";
import {
  unAuthorizedHandler,
  forbiddenErrHandler,
  serverErrHandler,
  badReqErrHandler,
  notFoundErrHandler,
} from "../errorHandlers.js";

dotenv.config();
const { PORT } = process.env;
const server = express();

//! **************** CONNECT SERVER ********************** //

const port = PORT || 3333;

server.listen(port, async () => {
  try {
    await console.log(` 🚀🚀🚀 Server is awake and listening on port :${port} - Time to make some magic happen!`);
  } catch (error) {}
});

server.on("error", (error) =>
  console.log(`❌❌❌ Server Error: Gremlins have infested our code. Time to call an exterminator! : ${error}`)
);

//! **************** SERVER USE ********************** //

server.use(cors(corsConfig));
server.use(express.json());
server.use(express.static("public"));
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb", extended: true }));

//! **************** END POINTS ********************** //

server.use("/.netlify/functions/api", emailRouter);

console.table(listEndpoints(server));
module.exports = server;
module.exports.handler = serverless(server);

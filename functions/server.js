const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");

const dotenv = require("dotenv");
const serverLess = require("serverless-http");

const corsConfig = require("../settings/cors.js"); // connecting to servers need

const emailRouter = require("../routers/email.router.js");

dotenv.config();
const { PORT } = process.env;
const server = express();

//! **************** CONNECT SERVER ********************** //
const greetPerson = process.env.GREETING;
console.log(`Say hello: ${greetPerson}`);
const port = PORT || 3333;

// server.listen(port, async () => {
//   try {
//     await console.log(` 🚀🚀🚀 Server is awake and listening on port :${port} - Time to make some magic happen!`);
//   } catch (error) {}
// });

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

server.use("/", emailRouter);

console.table(listEndpoints(server));
// ! **************** SECRETS ENV

exports.handler = async () => {
  const sMTP_PASS = process.env.SMTP_PASS;
  const sMTP_EMAIL = process.env.SMTP_EMAIL;
  const sMTP_HOST = process.env.SMTP_HOST;
  const tO_EMAIL = process.env.TO_EMAIL;
  return {
    statusCode: 200,
    body: `hello world! I have a ${mySecret}`,
  };
};

// module.exports = server;
module.exports.handler = serverLess(server);

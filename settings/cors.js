const dotenv = require("dotenv");
dotenv.config();

const trustOrigins = process.env.FRONT_END_URL;
const corsConfig = {
  origin: function (origin, callback) {
    if (!origin || trustOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
  credentials: true,
};

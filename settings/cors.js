import dotenv from "dotenv";
dotenv.config();

const trustOrigins = "https://www.amrsolar.hedri.dev";

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

export default corsConfig;

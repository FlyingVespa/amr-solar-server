import createError from "http-errors";

import Email from "../schema/email.schema.js";

// 1. GET all
// 2. POST Create Single

// 1. GET ALL **************************************************************************************/
export const getClientEmailMessage = async (req, res, next) => {
  try {
    const emails = await Email.find();
    res.send(email);
  } catch (error) {
    next();
  }
};

export const postClientEmailMessage = async (req, res, next) => {
  try {
    const email = await Email.find();
    res.send(email);
  } catch (error) {
    next();
  }
};

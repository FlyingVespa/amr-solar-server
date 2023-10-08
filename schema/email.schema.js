import mongoose from "mongoose";

const { Schema, model } = mongoose;
const reqString = { type: String, required: false };
const notReqString = { type: String, required: false };
const reqNumber = { type: Number, required: true };
const emailSchema = new Schema(
  {
    name: reqString,
    email: reqString,
    subject: reqString,
    phone: reqNumber,
    bill: notReqString,
    message: reqString,
  },
  { timestamps: true }
);

emailSchema.methods.toJSON = function () {
  const productDocument = this;
  const productObject = productDocument.toObject();
  delete productObject.__v;
  return productObject;
};

export default model("Product", emailSchema, "products");

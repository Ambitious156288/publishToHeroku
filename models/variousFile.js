import mongoose from "mongoose";

const variousFileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  path: { type: String, default: "" },
  parent: { type: mongoose.ObjectId , ref: "File" },
  children: [{ type: mongoose.ObjectId , ref: "File" }],
});

const variousFile = mongoose.model("variousFile", variousFileSchema);

export default variousFile;



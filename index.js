import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import fileUpload from "express-fileupload";

import fileMiddleware from "./middleware/variousFiles.files.js";
import staticMiddleware from "./middleware/variousFiles.static.js";

import * as fs from "fs";

const __dirname = path.resolve();

import userRouter from "./routes/users.js";
import noteRouter from "./routes/notes.js";
import galleryRouter from "./routes/photoGallery.js";
import variousFilesRouter from "./routes/variousFiles.js";

import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API");
});

app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

app.use("/api", galleryRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", express.static(path.join(__dirname, "static")));
console.log(path.join(__dirname, "static"));
app.use(fileUpload({}));
app.use(fileMiddleware(path.resolve(__dirname, "files")));
app.use(staticMiddleware(path.resolve(__dirname, "static")));
app.use(express.json());
app.use("/api/files/", variousFilesRouter);

const filesPath = path.resolve(__dirname, "files");
const staticPath = path.resolve(__dirname, "static");

console.log("filesPath", filesPath);

if (!fs.existsSync(filesPath)) {
  fs.mkdirSync(path.resolve(filesPath));
}

if (!fs.existsSync(staticPath)) {
  fs.mkdirSync(path.resolve(staticPath));
}

mongoose
  .connect(
    `
     mongodb+srv://admin:admin@engineering-thesis.r58nn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    `,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      tls: true,
    }
  )
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`server is running on: http://localhost:5000`)
    )
  )
  .catch((err) => console.log(err.message + "fdsfds"));

mongoose.set("useFindAndModify", false);

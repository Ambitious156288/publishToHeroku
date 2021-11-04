import express from "express";
import {
  createDir,
  uploadFiles,
  downloadFile,
  deleteFile,
  searchFile,
  getFiles
} from "../controllers/variousFiles.js";

const router = express.Router();

router.post("", createDir);
router.get("", getFiles);
router.post("/upload", uploadFiles);
router.get("/download", downloadFile);
router.get("/search", searchFile);
router.delete("", deleteFile);

export default router;

import express from "express";
import photoGallery from "../middleware/photoGallery.js";
import { singleFileUpload, multipleFileUpload, getallSingleFiles, getallMultipleFiles } from "../controllers/photoGallery.js";

const router = express.Router();

router.post('/singleFile', photoGallery.single('file'), singleFileUpload);
router.post('/multipleFiles', photoGallery.array('files'), multipleFileUpload);
router.get('/getSingleFiles', getallSingleFiles);
router.get('/getMultipleFiles', getallMultipleFiles);

export default router;

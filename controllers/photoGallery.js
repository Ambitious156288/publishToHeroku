import singleGallery from "../models/singleGallery.js";
import multipleGallery from "../models/multipleGallery.js";

export const singleFileUpload = async (req, res, next) => {
    try{
        const file = new singleGallery({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        });
        await file.save();
        res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

export const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new multipleGallery({
            title: req.body.title,
            files: filesArray 
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

export const getallSingleFiles = async (req, res, next) => {
    try{
        const files = await singleGallery.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

export const getallMultipleFiles = async (req, res, next) => {
    try{
        const files = await multipleGallery.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

export const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}


import variousFile from "../models/variousFile.js";
import { createDirService, deleteFileService } from "../services/variousFilesService.js";
import * as fs from 'fs';

export const createDir = async (req, res) => {
  try {
    const { name, type, parent } = req.body;

    const file = new variousFile({ type, name, parent });
    const fileParent = await variousFile.findOne({ _id: parent });

    if (!fileParent) {
      file.path = name;
      await createDirService(req, file);
    } else {
      file.path = `${fileParent.path}/${name}`;
      await createDirService(req, file);
      fileParent.children.push(file._id);
      await fileParent.save();
    }

    await file.save();
    return res.status(200).json(file);
  } catch (error) {
    console.log(error);
    return res.status.json({ message: "Server Error" });
  }
};


export const getFiles = async (req, res) => {
  try {
    const sortType = req.query.sort;

    let files;
    switch (sortType) {
      case "size":
        files = await variousFile.find({ parent: req.query.parent }).sort({
          size: 1,
        });
        break;
      case "name":
        files = await variousFile.find({ parent: req.query.parent }).sort({
          name: 1,
        });
        break;
      case "date":
        files = await variousFile.find({ parent: req.query.parent }).sort({
          date: 1,
        });
        break;
      default:
        files = await variousFile.find({ parent: req.query.parent });
    }

    return res.json(files);
  } catch (error) {
    console.log(error);
    return res.status.json({ message: "File get error" });
  }
}

export const uploadFiles = async (req, res) => {
  try {
    const file = req.files.file;

    const parent = await variousFile.findOne({ _id: req.body.parent });

    if (!parent) {
      file.path = `${req.filePath}/${file.name}`;
    } else {
      file.path = `${req.filePath}/${parent.path}/${file.name}`;
    }
    const type = file.name.split(".").pop();

    if (fs.existsSync(file.path)) {
      return res.status(400).json({ message: "File already exist" });
    }
    await file.mv(file.path);

    let filePath;
    if (!parent) {
      filePath = file.name;
    } else {
      filePath = `${parent.path}/${file.name}`;
    }

    const newFile = new variousFile({
      name: file.name,
      type: type,
      size: file.size,
      path: filePath,
      parent: parent?._id,
    });

    await newFile.save();

    return res.json(newFile);
  } catch (error) {
    console.log(error);
    return res.status.json({ message: "File upload error" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const file = await variousFile.findOne({ _id: req.query.id });

    const path = `${req.filePath}/${file.path}`;

    if (!fs.existsSync(path)) {
      return res.status(400).json({ message: "File is not exist" });
    }

    return res.download(path, file.name);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "File download error" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await variousFile.findOne({ _id: req.query.id });
    await deleteFileService(req, file);
    await file.remove();
    res.status(200).json({ id: file._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "File delete error" });
  }
};

export const searchFile = async (req, res) => {
  try {
    const searchString = req.query.search;

    const allFiles = await variousFile.find({ _id: req.query.id });
    const searchFiles = allFiles.filter((file) =>
      file.name.includes(searchString)
    );

    return res.status(200).json(searchFiles);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred in file search" });
  }
}
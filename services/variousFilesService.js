import * as fs from 'fs';

export const createDirService = (request, file) => {
  const filePath = `${request.filePath}/${file.path}`;

  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
        return resolve({ message: "File was created successfully" });
      } else {
        return reject({ message: "File already exist" });
      }
    } catch (error) {
      console.log(error);
      return reject({ message: "File Error" });
    }
  });
}

export const deleteFileService = (request, file) => {
  const path = _getFilePath(request, file);

  if (file.type === "dir") {
    fs.rmdirSync(path);
  } else {
    fs.unlinkSync(path);
  }
}

const _getFilePath = (request, file) => {
  return `${request.filePath}/${file.path}`;
}







import { Response, Request } from "express";
import { rename } from "fs";
import path from "path";
import Jsoning from "../modules/Jsoning";
import config from "../config";

const metadata_collection = new Jsoning("./database/metadata.json");

/** Upload either images, video files, audio files. */
export default async function UploadController(req: Request, res: Response) {
  const fileId = Date.now();

  if (!req.file) {
    return res.status(400).json("File not found");
  }

  const newFileName = `${fileId}${path.extname(req.file.originalname)}`;
  const newFilePath = `./dist/uploads/${newFileName}`;

  rename(req.file.path, newFilePath, (err) => {
    if (err) throw err;
  });

  const fileUrl = `${config.domain}/${newFileName}`;

  await metadata_collection.set(`${fileId}`, {
    fileId,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    filePath: newFilePath,
    url: fileUrl,
  });

  return res.status(200).json({
    id: fileId,
    url: fileUrl,
  });
}

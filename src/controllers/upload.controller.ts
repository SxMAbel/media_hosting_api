import { Response, Request } from "express";
import { rename } from "fs";
import path from "path";

import config from "../config";

/** Upload either images, video files, audio files. */
export default function UploadController(req: Request, res: Response) {
  const fileId = Date.now();
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json("File not found");
  }

  rename(
    req.file.path,
    `./dist/uploads/${fileId}${path.extname(req.file.originalname)}`,
    (err) => {
      if (err) throw err;
    }
  );

  return res.status(200).json({
    id: fileId,
    url: `${config.domain}/${fileId}${path.extname(req.file.originalname)}}`,
  });
}

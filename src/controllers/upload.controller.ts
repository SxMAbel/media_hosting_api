import { Response, Request } from "express";
import { renameSync } from "fs";
import path from "path";

import config from "../config";

/** Upload either images, video files, audio files. */
export default function UploadController(req: Request, res: Response) {
  const fileId = Date.now();
  if (!req.file) {
    return res.status(400).json("File not found");
  }

  renameSync(
    req.file.path,
    path.join(
      __dirname,
      "../uploads",
      `${fileId}${path.extname(req.file.originalname)}`
    )
  );

  return res.status(200).json({
    id: fileId,
    url: `${config.domain}/${fileId}${path.extname(req.file.originalname)}}`,
  });
}

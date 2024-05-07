import { readdirSync } from "fs";
import { Request, Response } from "express";

import config from "../config";

/** Check if a media file exists by ID. Returns 'isFound', 'id', 'url'.*/
export default function CheckController(req: Request, res: Response) {
  let fileName;
  let isFound = false;

  for (const file of readdirSync("./dist/uploads")) {
    if (file.includes(req.params.id)) {
      isFound = true;
      fileName = file;
    }
  }

  return res
    .status(isFound ? 200 : 404)
    .json(
      isFound
        ? { isFound, id: req.params.id, url: `${config.domain}/${fileName}` }
        : { error: "File not found", isFound }
    );
}

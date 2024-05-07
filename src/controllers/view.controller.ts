import { Request, Response } from "express";
import { readdirSync } from "fs";

import config from "../config";

/** Get source link of the media that includes the ID. */
export default function ViewController(req: Request, res: Response) {
  for (const file of readdirSync("./uploads")) {
    if (file.includes(req.params.id)) {
      return res.status(200).json({ url: config.domain + `/${file}` });
    }
    return res.status(404).json({ error: `No file with ID ${req.params.id}` });
  }
}

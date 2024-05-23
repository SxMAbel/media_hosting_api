import { Request, Response } from "express";
import { readdirSync } from "fs";
import Jsoning from "../modules/Jsoning";
import config from "../config";

const metadata_collection = new Jsoning("./database/metadata.json");

/** Get source link of the media that includes the ID. */
export default function ViewController(req: Request, res: Response) {
  for (const file of readdirSync("./dist/uploads")) {
    if (file.includes(req.params.id)) {
      const metadata = metadata_collection.get(req.params.id) as Record<
        string,
        unknown
      >;
      return res
        .status(200)
        .json({ url: config.domain + `/${file}`, ...metadata });
    }
    return res.status(404).json({ error: `No file with ID ${req.params.id}` });
  }
}

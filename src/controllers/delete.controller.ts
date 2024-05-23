import { readdirSync, unlink } from "fs";
import path from "path";
import { Response, Request } from "express";
import Jsoning from "../modules/Jsoning";

const metadata_collection = new Jsoning("./database/metadata.json");

/** Remove a file by ID. */
export default async function DeleteController(req: Request, res: Response) {
  let deleted = false;

  await metadata_collection.delete(req.params.id);

  for (const file of readdirSync("./dist/uploads")) {
    if (file.includes(req.params.id)) {
      unlink(path.join(__dirname, "../uploads", file), (err) => {
        if (err) throw err;
      });

      deleted = true;
      return res.json({ deleted, message: "File deleted successfully" });
    }
    return res.status(404).json({ error: "File not found", deleted });
  }
}

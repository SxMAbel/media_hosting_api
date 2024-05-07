import { readdirSync, createReadStream } from "fs";
import path from "path";
import { Request, Response } from "express";

/** Stream only videos or mp3 files. */
export default function PlayController(req: Request, res: Response) {
  for (const file of readdirSync("./uploads")) {
    if (file.includes(req.params.id)) {
      return createReadStream(path.join(__dirname, "../uploads", file)).pipe(
        res
      );
    }
    res.status(404).json({ error: "Media not found" });
  }
}

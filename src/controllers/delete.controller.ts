import { readdirSync, unlink } from "fs";
import path from "path";
import { Response, Request } from "express";

/** Remove a file by ID. */
export default function DeleteController(req: Request, res: Response) {
  let deleted = false;

  for (const file of readdirSync("./uploads")) {
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

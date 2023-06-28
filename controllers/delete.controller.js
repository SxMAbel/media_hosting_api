const { readdirSync, unlink } = require("fs");
const path = require("path");

/** Remove a file by ID. */
exports.delete = function (req, res, next) {
  let deleted = false;

  for (const file of readdirSync("./uploads")) {
    if (file.includes(req.params.id)) {
      unlink(path.join(__dirname, "../uploads", file));
      deleted = true;
      res.json({ deleted, message: "File deleted successfully" });
    }
    return res.status(404).json({ error: "File not found", deleted });
  }
};

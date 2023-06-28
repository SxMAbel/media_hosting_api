const { readdirSync, createReadStream } = require("fs");
const path = require("path");

/** Stream only videos or mp3 files. */
exports.play = function (req, res, next) {
  for (const file of readdirSync("./uploads")) {
    if (file.includes(req.params.id)) {
      return createReadStream(path.join(__dirname, "../uploads", file)).pipe(
        res
      );
    }
    res.status(404).json({ error: "Media not found" });
  }
};

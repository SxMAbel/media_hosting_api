const { readdirSync } = require("fs");
const { domain } = require("../config");

/** Check if a media file exists by ID. Returns 'isFound', 'id', 'url'.*/
exports.check = function (req, res, next) {
  let fileName;
  let isFound = false;

  for (const file of readdirSync("./uploads")) {
    if (file.includes(req.params.id)) {
      isFound = true;
      fileName = file;
    }
  }

  return res
    .status(isFound ? 200 : 404)
    .json(
      isFound
        ? { isFound, id: req.params.id, url: `${domain}/${fileName}` }
        : { error: "File not found", isFound }
    );
};

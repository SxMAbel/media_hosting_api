const { readdirSync } = require("fs");
const { domain } = require("../config");

/** Get source link of the media that includes the ID. */
exports.view = function (req, res, next) {
  for (const file of readdirSync("./uploads")) {
    if (file.includes(req.params.id)) {
      return res.status(200).json({ url: domain + `/${file}` });
    }
    return res.status(404).json({ error: `No file with ID ${req.params.id}` });
  }
  next();
};

const { renameSync } = require("fs");
const path = require("path");
const { domain } = require("../config");

/** Upload either images, video files, audio files. */
exports.upload = function (req, res, next) {
  const fileId = Date.now();

  renameSync(
    req.file.path,
    path.join(
      __dirname,
      "../uploads",
      `${fileId}${path.extname(req.file.originalname)}`
    )
  );
  return res.status(200).json({
    id: fileId,
    url: `${domain}/${fileId}${path.extname(req.file.originalname)}}`,
  });
};

const multer = require("multer");
const router = require("express").Router();
const path = require("path");

const CheckController = require("../controllers/check.controller");
const DeleteController = require("../controllers/delete.controller");
const PlayController = require("../controllers/play.controller");
const UploadController = require("../controllers/upload.controller");
const ViewController = require("../controllers/view.controller");

const upload = multer({ dest: path.join(__dirname, "../uploads") });

router.get("/check/:id", CheckController.check);
router.delete("/delete/:id", DeleteController.delete);
router.get("/play/:id", PlayController.play);
router.post("/upload", upload.single("media"), UploadController.upload);
router.get("/view/:id", ViewController.view);

module.exports = router;

import multer from "multer";
import { Router } from "express";
import path from "path";

import CheckController from "../controllers/check.controller";
import DeleteController from "../controllers/delete.controller";
import PlayController from "../controllers/play.controller";
import UploadController from "../controllers/upload.controller";
import ViewController from "../controllers/view.controller";

const upload = multer({ dest: path.join(__dirname, "../uploads") });
const router = Router();

router.get("/check/:id", CheckController);
router.get("/play/:id", PlayController);
router.get("/view/:id", ViewController);

router.delete("/delete/:id", DeleteController);

router.post("/upload", upload.single("media"), UploadController);

export default router;

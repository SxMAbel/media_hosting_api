import multer from "multer";
import { Router } from "express";

import CheckController from "../controllers/check.controller";
import DeleteController from "../controllers/delete.controller";
import PlayController from "../controllers/play.controller";
import ViewController from "../controllers/view.controller";
import UploadController from "../controllers/upload.controller";

const router = Router();
const upload = multer({ dest: "./dist/uploads" });

router.get("/check/:id", CheckController);
router.get("/play/:id", PlayController);
router.get("/view/:id", ViewController);
router.post("/upload", upload.single("file"), UploadController);
router.delete("/delete/:id", DeleteController);

export default router;

import { Router } from "express";
import { generateAscii, start, test } from "../controllers/image.controller";

const router = Router();

router.post("/generate", generateAscii);
router.get('/', start);
router.get("/test", test)
export default router;

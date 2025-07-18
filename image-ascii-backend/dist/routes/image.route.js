"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_controller_1 = require("../controllers/image.controller");
const router = (0, express_1.Router)();
router.post("/generate", image_controller_1.generateAscii);
router.get('/', image_controller_1.start);
router.get("/test", image_controller_1.test);
exports.default = router;

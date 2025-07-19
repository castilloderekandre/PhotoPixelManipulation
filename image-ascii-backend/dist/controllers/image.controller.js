"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.start = exports.generateAscii = void 0;
const asciiGenerator_1 = __importDefault(require("../image-functions/asciiGenerator"));
const generateAscii = (req, res) => {
    const { image } = req.body;
    if (!image) {
        res.status(400).json({ error: "Image data is required" });
        return;
    }
    const generator = new asciiGenerator_1.default();
    const result = generator.make(req.body.image);
    res.status(200).json({ data: {
            imageB64: result
        } });
};
exports.generateAscii = generateAscii;
const start = (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
};
exports.start = start;
const test = (req, res) => {
    res.json({ "msg": "Hello World" });
};
exports.test = test;

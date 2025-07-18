import { Request, Response } from "express";
import AsciiGenerator from "../image-functions/asciiGenerator";
import type { ImageGenerationRequest } from '../api/asciiApi';

export const generateAscii = (req: ImageGenerationRequest, res: Response) => {
	const { image } = req.body;

	if (!image) {
		res.status(400).json({ error: "Image data is required" });
		return;
	}

	const generator = new AsciiGenerator();
	const result = generator.make(req.body.image);

	res.status(200).json({ data: {
		imageB64: result
	}});
};


export const start = (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
};

export const test = (req: Request, res: Response) => {
  res.json({ "msg": "Hello World" })
}


import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

import AsciiGenerator from './image-functions/asciiGenerator';
import bilateralfilter from './image-functions/bilateralFilter';

import type { ImageGenerationRequest } from './api/asciiApi';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/create', (req: ImageGenerationRequest, res: Response) => {
  const generator = new AsciiGenerator();
  const result = generator.make(req.body.image);

  res.json({ status: 200, data: {
    imageB64: result
  }});
})

app.get("/test", (req: Request, res: Response) => {
  res.json({ "msg": "Hello World" })
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
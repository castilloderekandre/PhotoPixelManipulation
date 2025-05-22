
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get("/test", (req: Request, res: Response) => {
  res.json({ "msg": "Hello World" })
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
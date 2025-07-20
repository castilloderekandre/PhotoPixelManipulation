import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import imageGeneratorRouters from './routes/image.route';
import cors from 'cors';

//For env File 
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use('/api/imagegenerator', imageGeneratorRouters);
app.listen(PORT, () => {
  console.log(`Server is fired at http://localhost:${PORT}\n`);
});

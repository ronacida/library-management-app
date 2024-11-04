import 'reflect-metadata';
import './container';
import { AppDataSource } from './config/data-source';
import express, { Application } from 'express';
import cors from 'cors';
import router from './routes';

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
  const app: Application = express();
  const PORT = process.env.PORT ?? 3000;

  app.use(express.json());

  app.use(cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true
  }));

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error during Data Source initialization:', error);
});

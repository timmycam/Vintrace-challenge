
import logger from 'morgan';
import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index';

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);

export default app;
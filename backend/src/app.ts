// modules
import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';

// all routes
import UserRoute from './routes/user';

// utils
import { info, error } from './utils/logger';
import { MONGODB_URI } from './utils/config';
import {
	requestLogger,
	unknownEndPoint,
	errorHandler,
} from './utils/middleware';

mongoose.set('strictQuery', false);
info('connecting to', MONGODB_URI);

mongoose
	.connect(MONGODB_URI as string)
	.then(() => {
		info('connected');
	})
	.catch((err: String) => {
		error('error occurred while connecting: ', err);
	});

// middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// endpoints
app.use('/api', UserRoute);

// ending middlewares
app.use(unknownEndPoint);
app.use(errorHandler);

export default app;

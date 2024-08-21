import { info, error } from './logger';

export const requestLogger = (request: any, response: any, next: any) => {
	info('Method:', request.method);
	info('Path:  ', request.path);
	info('Body:  ', request.body);
	info('---');
	next();
};

export const unknownEndPoint = (request: any, response: any) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (
	error: any,
	request: any,
	response: any,
	next: any,
) => {
	error(error.message);

	next(error);
};

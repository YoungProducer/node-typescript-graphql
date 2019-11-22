import {
    Response,
} from 'express';
import { HttpError } from 'http-errors';

export const handleError = (err: HttpError, res: Response) => {
    const { statusCode, message } = err;

    res.status(statusCode).json({
        status: "error",
        statusCode: statusCode.toString(),
        message: message.toString(),
    });
};

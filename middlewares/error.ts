import { NextFunction, Request, Response } from "express";

//Not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Não achado - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

//Error handler
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    const stackErr = process.env.NODE_ENV === 'development' ? err.stack : null;
    res.json({
        message: err?.message,
        stack: stackErr
    });
    console.log("StackTrace: ", err?.stack)
};

export { notFound, errorHandler };
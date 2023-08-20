import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger";

//Not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: `Cannot found ${req.method} ${req.originalUrl}` })
};

//Error handler
const errorHandler = (err: Error, req: Request, res: Response) => {
    res.status(400).json({
        message: err?.message,
    });

    logger.error(err?.message);
};

export { errorHandler, notFound };

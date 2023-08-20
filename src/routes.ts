import 'express-async-errors';
import { Express, Router } from 'express';
import { errorHandler, notFound } from './controllers/middlewares/error';
import { postRoute } from './controllers/v1/PostController';
import { userRoute } from './controllers/v1/UserController';
import { voluntaryRoute } from "./controllers/v1/VoluntaryController";
import { newsLetterRoute } from './controllers/v1/NewsLetterController';

export function bootstrapRoutes (app: Express): Router[] {
    app.use(voluntaryRoute);
    app.use(newsLetterRoute);
    app.use(userRoute);
    app.use(postRoute);
    
    app.use(notFound);
    app.use(errorHandler);

    return [voluntaryRoute, userRoute, postRoute]
}
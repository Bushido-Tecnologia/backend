import 'express-async-errors';
import dotenv from "dotenv";
import Express from 'express';
import mongoose from "mongoose";
import { URL_DATABASE } from "./constants";
import { bootstrapRoutes } from "./routes";
import { handleLogRoutes, logger } from './utils/logger';

const bootStrap = async () =>{
    dotenv.config();
    const app = Express()
    const port = process.env.PORT || 3000
    app.use(Express.json())

    //routes
    const routes = bootstrapRoutes(app);

    if (URL_DATABASE) {
        await mongoose.connect(URL_DATABASE)
    } else {
        logger.error('URL_DATABASE not received')
    }

    const handleShowInitialLogs = () =>{
        console.log('\n=====================')
        console.log('  Server is running  ')
        console.log(`     on port ${port}   `)
        console.log('=====================\n')
        
        handleLogRoutes(routes)
    }

    app.listen(port, handleShowInitialLogs)
}

bootStrap()

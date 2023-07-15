import dotenv from "dotenv";
import Express from 'express';
import { errorHandler, notFound } from './controllers/middlewares/error';
import routes from './routes';
import { handleLogRoutes, logger } from './utils/logger';

dotenv.config();
const app = Express()
const port = process.env.PORT || 3000


app.use(Express.json())
app.use(routes)

//error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log('\n=====================')
    console.log('  Server is running  ')
    console.log(`     on port ${port}   `)
    console.log('=====================\n')

    logger.alert('alerta aqui')
    logger.error('erro aqui')
    logger.sucess('sucesso aqui')
    logger.info('infor aqui')

    handleLogRoutes(routes)
})


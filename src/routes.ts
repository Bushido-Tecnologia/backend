import { Router } from 'express'
import { mailController } from './controllers/v1/EmailController';

const router = Router()

router.post('/api/v1/mail', mailController.sendMail);

export default router

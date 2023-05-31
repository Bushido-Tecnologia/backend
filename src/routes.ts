import { Router } from 'express'
import { enviarEmail } from '../controllers/mailController';

const router = Router()

router.get('/', (req, res)=>{
    res.json({ message: 'Hello world' })
})

router.post('/api/v1/mail', enviarEmail);



export default router

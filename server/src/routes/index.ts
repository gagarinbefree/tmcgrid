import { Router } from 'express'
import { getData } from '../controllers/grid'
 
const router: Router = Router()

router.get('/grid', getData)

export default router

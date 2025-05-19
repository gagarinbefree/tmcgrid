import { Router } from 'express'
import gridController from '../controllers/grid'
 
const router: Router = Router()

router.get('/api/grid', gridController.getData)
router.post('/api/grid/order', gridController.orderData)
router.post('/api/grid/checked', gridController.checkedData)

export default router

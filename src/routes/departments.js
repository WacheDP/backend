import { Router } from 'express'
import { getDepartments } from '../controllers/departments'

const router = Router()
router.get('/departments', getDepartments)

export default router
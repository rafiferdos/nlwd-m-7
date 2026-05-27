import { Router } from 'express'
import { loginUser, refreshToken } from './auth.controller.js'

const router = Router()

router.post('/login', loginUser)
router.post('/refresh-token', refreshToken)

export const authRoute: Router = router

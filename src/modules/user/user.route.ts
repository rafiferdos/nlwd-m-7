import { Router } from 'express'
import { userController } from './user.controller.js'

const router = Router()

//*=== create user ===*//

router.post('/', userController.createUser)

//*=== get all users ===*//

router.get('/api/users', userController.getAllUsers)

export const userRoute: Router = router

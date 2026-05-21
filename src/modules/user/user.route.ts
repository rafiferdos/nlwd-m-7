import { Router } from 'express'
import { userController } from './user.controller.js'

const router = Router()

//*=== create user ===*//
router.post('/', userController.createUser)

//*=== get all users ===*//
router.get('/', userController.getAllUsers)

//*=== get single user ===*//
router.get('/:id', userController.getSingleUser)

export const userRoute: Router = router

import { Router } from 'express'
import auth from '../../middleware/auth.js'
import { userController } from './user.controller.js'

const router = Router()

//*=== create user ===*//
router.post('/', userController.createUser)

//*=== get all users ===*//
router.get('/', auth(), userController.getAllUsers)

//*=== get single user ===*//
router.get('/:id', userController.getUserById)

//*=== update a user ===*//
router.put('/:id', userController.updateUser)

//*=== delete a user ===*//
router.delete('/:id', userController.deleteUser)

export const userRoute: Router = router

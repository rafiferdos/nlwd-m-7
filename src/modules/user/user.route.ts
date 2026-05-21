import { Router } from 'express'
import { userController } from './user.controller.js'

const router = Router()

//*=== create user ===*//
router.post('/', userController.createUser)

//*=== get all users ===*//
router.get('/', userController.getAllUsers)

//*=== get single user ===*//
router.get('/:id', userController.getSingleUser)

//*=== update a user ===*//
router.put('/:id', userController.updateSingleUser)

//*=== delete a user ===*//
router.delete('/:id', userController.deleteSingleUser)

export const userRoute: Router = router

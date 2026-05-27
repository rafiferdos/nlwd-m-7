import { Router } from 'express'
import auth from '../../middleware/auth.js'
import { UserRoles } from '../../types/index.js'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser
} from './user.controller.js'

const router = Router()

//*=== create user ===*//
router.post('/', createUser)

//*=== get all users ===*//
router.get('/', auth(UserRoles.admin, UserRoles.moderator), getAllUsers)

//*=== get single user ===*//
router.get('/:id', getUserById)

//*=== update a user ===*//
router.put('/:id', updateUser)

//*=== delete a user ===*//
router.delete('/:id', deleteUser)

export const userRoute: Router = router

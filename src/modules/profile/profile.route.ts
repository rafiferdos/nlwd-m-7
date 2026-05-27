import { Router } from 'express'
import { createProfile } from './profile.controller.js'

const router = Router()

router.post('/', createProfile)

export const profileRoute: Router = router

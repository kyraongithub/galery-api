import { Router } from 'express'
import { apiLimiter } from '../middleware/rateLimit'
import { getUserImages } from '../controllers/images.controller'

export const imagesRoute: Router = Router()

imagesRoute.get('/', apiLimiter, getUserImages)

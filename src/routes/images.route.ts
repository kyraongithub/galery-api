import { Router } from 'express'
import { apiLimiter } from '../middleware/rateLimit'
import { getUserImages, getImagesByTag } from '../controllers/images.controller'

export const imagesRoute: Router = Router()

imagesRoute.get('/', apiLimiter, getUserImages)
imagesRoute.get('/tags', apiLimiter, getImagesByTag)

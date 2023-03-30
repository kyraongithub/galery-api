import { Application, Router } from 'express'
import { imagesRoute } from './images.route'
const _routes: [string, Router][] = [['/images', imagesRoute]]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(`/api/v1${url}`, router)
  })
}

import bodyParser from 'body-parser'
import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import flash from 'connect-flash'
import { routes } from '../routes'
import multer from 'multer'
import methodOverride from 'method-override'

const createServer = () => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage, limits: { fileSize: 10 * 1000 * 1000 } })

  const app: Application = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(upload.array('images'))
  app.use(methodOverride('_method'))

  app.use(cors())
  app.use(helmet())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })
  app.use(express.static('public'))

  app.use(
    session({
      cookie: { maxAge: 6000 },
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  )
  app.use(flash())
  routes(app)
  return app
}

export default createServer

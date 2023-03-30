/* eslint-disable node/no-path-concat */
import express, { Application } from 'express'
import { routes } from './routes'
import methodOverride from 'method-override'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import cors from 'cors'
import 'dotenv/config'

import helmet from 'helmet'
import bodyParser from 'body-parser'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1000 * 1000 } })

// Boot express
const app: Application = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(upload.array('images'))

app.use(methodOverride('_method'))

// Access Handling
app.use(cors())
app.use(helmet())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

// Templating Engine
app.use(express.static('public'))
// app.set('views', __dirname + '/views')

app.use(cookieParser('secret'))
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)

app.use(flash())

// Application routing
routes(app)

export { app }

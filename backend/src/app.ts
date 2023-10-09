import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import setRoutes from './setRoutes'

const app = express()
app.use(morgan('combined'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(cors())
app.options('*', cors())

setRoutes(app)

// this is needed for the vite
// eslint-disable-next-line import/prefer-default-export
export { app }

import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import setRoutes from './setRoutes.ts'
import keycloak from './keycloak-config.ts'

const app = express()
app.use(morgan('combined'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(cors())
app.options('*', cors())
app.use(keycloak.middleware())

setRoutes(app)

// if (import.meta.env.PROD) {
//     app.listen(8000)
// }

// this is needed for the vite
export { app }

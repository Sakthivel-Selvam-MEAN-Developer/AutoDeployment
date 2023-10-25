import express from 'express'
import vehicleRoutes from './vehicle.ts'
// import customerRoutes from './customer'
import stopRoutes from './stops.ts'
import reasonRoutes from './reason.ts'
import jobsRoutes from './jobs'
// import gpsStopRoutes from './gpsStops'

const router = express.Router()

vehicleRoutes(router)
// customerRoutes(router)
stopRoutes(router)
reasonRoutes(router)
jobsRoutes(router)
// gpsStopRoutes(router)

export default router

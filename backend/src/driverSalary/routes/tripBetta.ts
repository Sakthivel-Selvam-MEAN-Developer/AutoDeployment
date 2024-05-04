import { Router } from 'express'
import { createTripSalaryDetails, getTripSalaryDetails } from '../controller/tripSalary.ts'

const tripBettaRoutes = (router: Router) => {
    router.post('/addTripSalary', createTripSalaryDetails)
    router.get('/getTripSalaryDetails', getTripSalaryDetails)
}

export default tripBettaRoutes

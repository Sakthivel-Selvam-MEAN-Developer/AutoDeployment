import { Router } from 'express'
import { getDetails, create, listAllNames, update } from '../controller/customer.ts'

const customerRoutes = (router: Router) => {
    router.post('/customers', create)
    router.get('/customers', listAllNames)
    router.get('/customers/:number', getDetails)
    router.post('/customers/:number', update)
}

export default customerRoutes

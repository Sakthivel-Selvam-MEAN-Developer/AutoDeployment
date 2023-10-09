import {
    getDetails,
    create,
    listAllNames,
    update
} from '../controller/customer.js'

const customerRoutes = (router) => {
    router.post('/customers', create)
    router.get('/customers', listAllNames)
    router.get('/customers/:number', getDetails)
    router.post('/customers/:number', update)
}

export default customerRoutes

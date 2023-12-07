import { Router } from 'express'
import {
    createFoctoryPoint,
    listAllFactory,
    listFactoryBycementCompany
} from '../controller/factory.ts'

const factoryRoutes = (router: Router) => {
    router.post('/factory', createFoctoryPoint)
    router.get('/factory', listAllFactory)
    router.get('/factoryLocation/:companyName', listFactoryBycementCompany)
}

export default factoryRoutes

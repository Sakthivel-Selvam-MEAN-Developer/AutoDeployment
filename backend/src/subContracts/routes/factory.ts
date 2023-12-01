import { Router } from 'express'
import { listAllFactory, listFactoryBycementCompany } from '../controller/factory.ts'

const factoryRoutes = (router: Router) => {
    router.get('/factory', listAllFactory)
    router.get('/factoryLocation/:companyName', listFactoryBycementCompany)
}

export default factoryRoutes

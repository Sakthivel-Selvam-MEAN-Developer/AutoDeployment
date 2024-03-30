import { Router } from 'express'
import {
    createUnloadingPoint,
    listAllUnloadingPoint,
    listUnloadingPonitBycementCompany
} from '../controller/unloadingPoint.ts'
import { authorise } from './authorise.ts'

const deliveryPointRoutes = (router: Router) => {
    router.post('/unloading-point', authorise(['Admin']), createUnloadingPoint)
    router.get('/unloading/:cementCompanyId', listAllUnloadingPoint)
    router.get('/unloading-point/:companyName', listUnloadingPonitBycementCompany)
}

export default deliveryPointRoutes

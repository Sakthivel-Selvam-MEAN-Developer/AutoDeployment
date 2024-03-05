import { Router } from 'express'
import {
    createUnloadingPoint,
    listAllUnloadingPoint,
    listUnloadingPonitBycementCompany
} from '../controller/unloadingPoint.ts'

const deliveryPointRoutes = (router: Router) => {
    router.post('/unloading-point', createUnloadingPoint)
    router.get('/unloading/:cementCompanyId', listAllUnloadingPoint)
    router.get('/unloading-point/:companyName', listUnloadingPonitBycementCompany)
}

export default deliveryPointRoutes

import { Router } from 'express'
import {
    createLoadingPoint,
    listAllLoadingPoint,
    listLoadingPointByCementCompany
} from '../controller/loadingPoint.ts'

const factoryRoutes = (router: Router) => {
    router.post('/loading-point', createLoadingPoint)
    router.get('/loading-point', listAllLoadingPoint)
    router.get('/loading-point/:companyName', listLoadingPointByCementCompany)
}

export default factoryRoutes

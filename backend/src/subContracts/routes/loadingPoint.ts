import { Router } from 'express'
import {
    createLoadingPoint,
    listAllLoadingPoint,
    listLoadingPointByCementCompany
} from '../controller/loadingPoint.ts'
import { authorise } from './authorise.ts'

const factoryRoutes = (router: Router) => {
    router.post('/loading-point', authorise(['Admin']), createLoadingPoint)
    router.get('/loading-point', listAllLoadingPoint)
    router.get('/loading-point/:companyName', listLoadingPointByCementCompany)
}

export default factoryRoutes

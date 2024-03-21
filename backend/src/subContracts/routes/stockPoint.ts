import { Router } from 'express'
import {
    createStockPoint,
    listAllStockPoint,
    listStockPointBycementCompany
} from '../controller/stockPoint.ts'
import { authorise } from './authorise.ts'

const deliveryPointRoutes = (router: Router) => {
    router.post('/stock-point', authorise(['Employee']), createStockPoint)
    router.get('/stock-point', listAllStockPoint)
    router.get('/stock-point/:companyName', listStockPointBycementCompany)
}

export default deliveryPointRoutes

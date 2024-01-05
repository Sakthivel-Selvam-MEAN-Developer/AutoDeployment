import { Router } from 'express'
import {
    createStockPoint,
    listAllStockPoint,
    listStockPointBycementCompany
} from '../controller/stockPoint.ts'

const deliveryPointRoutes = (router: Router) => {
    router.post('/stock-point', createStockPoint)
    router.get('/stock-point', listAllStockPoint)
    router.get('/stock-point/:companyName', listStockPointBycementCompany)
}

export default deliveryPointRoutes

import { Router } from 'express'
import {
    createStockPoint,
    listAllStockPoint,
    listStockPointBycementCompany
} from '../controller/stockPoint.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const deliveryPointRoutes = (router: Router) => {
    router.post('/stock-point', keycloak.protect(), hasRole('SuperAdmin'), createStockPoint)
    router.get('/stock-point', listAllStockPoint)
    router.get('/stock-point/:companyName', listStockPointBycementCompany)
}

export default deliveryPointRoutes

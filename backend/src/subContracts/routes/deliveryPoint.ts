import { Router } from 'express'
import {
    createDeliveryPoint,
    listAllDeliveryPoint,
    listDeliveryPonitBycementCompany
} from '../controller/deliveryPoint.ts'

const deliveryPointRoutes = (router: Router) => {
    router.post('/delivery-point', createDeliveryPoint)
    router.get('/delivery-point', listAllDeliveryPoint)
    router.get('/delivery-point/:companyName', listDeliveryPonitBycementCompany)
}

export default deliveryPointRoutes

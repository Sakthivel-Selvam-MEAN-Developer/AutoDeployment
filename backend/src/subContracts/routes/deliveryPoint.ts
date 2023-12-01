import { Router } from 'express'
import {
    listAllDeliveryPoint,
    listDeliveryPonitBycementCompany
} from '../controller/deliveryPoint.ts'

const deliveryPointRoutes = (router: Router) => {
    router.get('/delivery-point', listAllDeliveryPoint)
    router.get('/delivery-point/:companyName', listDeliveryPonitBycementCompany)
}

export default deliveryPointRoutes

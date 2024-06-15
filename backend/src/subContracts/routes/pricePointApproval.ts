import { Router } from 'express'
import {
    approvePricePoint,
    listTripsForPricePointApproval
} from '../controller/pricePointApproval.ts'

const pricePointApprovalRoutes = (router: Router) => {
    router.get('/pricepointapproval', listTripsForPricePointApproval)
    router.put('/pricepointapproval', approvePricePoint)
}

export default pricePointApprovalRoutes

import { Router } from 'express'
import { listTripsForPricePointApproval } from '../controller/pricePointApproval.ts'

const pricePointApprovalRoutes = (router: Router) => {
    router.get('/pricepointapproval', listTripsForPricePointApproval)
}

export default pricePointApprovalRoutes

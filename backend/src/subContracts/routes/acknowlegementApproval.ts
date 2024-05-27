import { Router } from 'express'
import { authorise } from './authorise.ts'
import {
    approveAcknowledgement,
    listTripForAcknowlegementApproval
} from '../controller/acknowledgementApproval.ts'

const acknowlegementApprovalRoutes = (router: Router) => {
    router.get('/acknowlegementapproval', listTripForAcknowlegementApproval)
    router.put('/acknowlegementapproval', authorise(['Admin']), approveAcknowledgement)
}

export default acknowlegementApprovalRoutes

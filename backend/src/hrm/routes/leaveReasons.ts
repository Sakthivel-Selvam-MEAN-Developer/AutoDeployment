import { Router } from 'express'
import { create, listAllReason } from '../controller/leaveReasons.ts'

const leaveReasonRoutes = (router: Router) => {
    router.post('/leaveReason', create)
    router.get('/leaveReason', listAllReason)
}

export default leaveReasonRoutes

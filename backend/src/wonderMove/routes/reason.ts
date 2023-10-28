import { create, listAllReason, updateReason } from '../controller/reason.ts'
import { Router } from 'express'

const reasonRoutes = (router: Router) => {
    router.post('/reason', create)
    router.post('/reason-update', updateReason)
    router.get('/stop-reason', listAllReason)
}

export default reasonRoutes

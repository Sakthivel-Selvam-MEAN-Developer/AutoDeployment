import { create, listAllReason } from '../controller/reason.js'
import {Router} from 'express'

const reasonRoutes = (router: Router) => {
    router.post('/reason', create)
    router.get('/stop-reason', listAllReason)
}

export default reasonRoutes

import { create, listAllReason } from '../controller/reason.js'

const reasonRoutes = (router) => {
    router.post('/reason', create)
    router.get('/reason', listAllReason)
}

export default reasonRoutes

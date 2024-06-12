import { Router } from 'express'

const tollPlazaRoutes = (router: Router) => {
    router.post('/toll')
    router.get('/toll')
    router.put('/toll')
}
export default tollPlazaRoutes

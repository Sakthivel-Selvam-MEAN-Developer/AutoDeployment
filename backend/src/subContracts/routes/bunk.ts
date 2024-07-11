import { Router } from 'express'
import { createBunk, listAllBunk, listAllBunkName } from '../controller/bunk.ts'

const bunkRoutes = (router: Router) => {
    router.post('/bunk', createBunk)
    router.get('/bunk', listAllBunk)
    router.get('/bunk_name', listAllBunkName)
    router.post('/bunk')
}

export default bunkRoutes

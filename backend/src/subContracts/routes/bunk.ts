import { Router } from 'express'
import { createBunk, listAllBunk } from '../controller/bunk.ts'

const bunkRoutes = (router: Router) => {
    router.post('/bunk', createBunk)
    router.get('/bunk', listAllBunk)
}

export default bunkRoutes

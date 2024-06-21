import { Router } from 'express'
import { createBunk, listAllBunk, listAllBunkName, listAllFuelList } from '../controller/bunk.ts'

const bunkRoutes = (router: Router) => {
    router.post('/bunk', createBunk)
    router.get('/bunk', listAllBunk)
    router.get('/bunk_name', listAllBunkName)
    router.get('/getAllFuelReport', listAllFuelList)
}

export default bunkRoutes

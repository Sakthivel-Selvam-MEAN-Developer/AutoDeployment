import { Router } from 'express'
import { listAllAccountTypes } from '../controller/accountType.ts'

const accountTypeRoutes = (router: Router) => {
    router.get('/accountType', listAllAccountTypes)
}

export default accountTypeRoutes

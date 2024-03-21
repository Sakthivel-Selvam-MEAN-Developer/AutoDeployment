import { Router } from 'express'
import { listAllAccountTypes } from '../controller/accountType.ts'
import { authorise } from './authorise.ts'

const accountTypeRoutes = (router: Router) => {
    router.get('/accountType', authorise(['Employee']), listAllAccountTypes)
}

export default accountTypeRoutes

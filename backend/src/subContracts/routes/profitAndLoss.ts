import { Router } from 'express'
import { profitAndLossController } from '../controller/profitAndLoss.ts'

const profitAndLoss = (router: Router) => {
    router.get('/profit-and-loss', profitAndLossController)
}
export default profitAndLoss

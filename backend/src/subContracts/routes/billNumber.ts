import { Router } from 'express'
import { getLastBillNumber } from '../controller/billNumber.ts'

const billNumber = (router: Router) => {
    router.get('/bill', getLastBillNumber)
}

export default billNumber

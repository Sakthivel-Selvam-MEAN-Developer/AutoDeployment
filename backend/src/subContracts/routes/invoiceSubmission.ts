import { Router } from 'express'
import { listCompanyInvoiceForSubmitDate } from '../controller/invoiceSubmission'

const invoiceSubmission = (router: Router) => {
    router.get('/submissiondate', listCompanyInvoiceForSubmitDate)
}

export default invoiceSubmission

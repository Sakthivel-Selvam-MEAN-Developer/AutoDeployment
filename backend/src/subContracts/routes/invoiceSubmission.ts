import { Router } from 'express'
import {
    listCompanyInvoiceForSubmitDate,
    updateCompanyInvoiceSubmitDate
} from '../controller/invoiceSubmission'

const invoiceSubmission = (router: Router) => {
    router.get('/submissiondate', listCompanyInvoiceForSubmitDate)
    router.put('/submissiondate', updateCompanyInvoiceSubmitDate)
}

export default invoiceSubmission

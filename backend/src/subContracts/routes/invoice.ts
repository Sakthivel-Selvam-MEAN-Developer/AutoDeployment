import { Router } from 'express'
import { getInvoiceDetails, updateInvoiceDetails } from '../controller/invoice.ts'
import keycloak from '../../keycloak-config.ts'
import { hasRole } from '../../authorization.ts'

const invoiceRoutes = (router: Router) => {
    router.put('/invoice/', keycloak.protect(), hasRole('SuperAdmin'), getInvoiceDetails)
    router.put('/invoice/update', keycloak.protect(), hasRole('SuperAdmin'), updateInvoiceDetails)
}

export default invoiceRoutes

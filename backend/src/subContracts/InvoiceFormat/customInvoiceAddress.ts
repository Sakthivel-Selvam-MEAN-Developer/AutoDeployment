import { InvoiceProps } from './CustomInvoice/customInvoice.tsx'

const checkLoadingToStock = (trip: InvoiceProps['trip']) => {
    if (trip.loadingPointToStockPointTrip.length > 0) {
        return trip.loadingPointToStockPointTrip[0].loadingPoint.cementCompany.primaryBill
    }
    return { address: '', gstNumber: '' }
}
const checkStockToUnloading = (trip: InvoiceProps['trip']) => {
    if (trip.stockPointToUnloadingPointTrip.length > 0) {
        return trip.stockPointToUnloadingPointTrip[0].unloadingPoint.cementCompany.secondaryBill
    }
    return checkLoadingToStock(trip)
}
export const findBillingDetails = (trip: InvoiceProps['trip']) => {
    if (trip.loadingPointToUnloadingPointTrip.length > 0) {
        return trip.loadingPointToUnloadingPointTrip[0].loadingPoint.cementCompany.primaryBill
    }
    return checkStockToUnloading(trip)
}
export const cutomInvoiceDetails = (trip: InvoiceProps['trip']) => {
    const billDetails = findBillingDetails(trip)
    // @ts-expect-error replace
    const address = billDetails?.address.replaceAll(/(\n)/g, '<br />')
    const elements = `<div className="customer" id="address">
     <h4>${address}</h4>
    <h4>${billDetails?.gstNumber}no </h4></div>`
    return elements
}

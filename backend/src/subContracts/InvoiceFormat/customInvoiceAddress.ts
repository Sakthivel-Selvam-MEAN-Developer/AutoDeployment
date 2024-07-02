// interface tripType {
//     loadingPointToUnloadingPointTrip: {
//         loadingPoint: { cementCompany: { primaryBill: { address: string; gstNumber: string } } }
//     }[]
//     stockPointToUnloadingPointTrip: {
//         unloadingPoint:
// { cementCompany: { secondaryBill: { address: string; gstNumber: string } } }
//     }[]
//     loadingPointToStockPointTrip: {
//         loadingPoint: { cementCompany: { primaryBill: { address: string; gstNumber: string } } }
//     }[]
// }
// const checkLoadingToStock = (trip: tripType) => {
//     if (trip.loadingPointToStockPointTrip.length > 0) {
//         return trip.loadingPointToStockPointTrip[0].loadingPoint.cementCompany.primaryBill
//     }
//     return { address: '', gstNumber: '' }
// }
// const checkStockToUnloading = (trip: tripType) => {
//     if (trip.stockPointToUnloadingPointTrip.length > 0) {
//         return trip.stockPointToUnloadingPointTrip[0].unloadingPoint.cementCompany.secondaryBill
//     }
//     return checkLoadingToStock(trip)
// }
// export const findBillingDetails = (trip: tripType) => {
//     if (trip.loadingPointToUnloadingPointTrip.length > 0) {
//         return trip.loadingPointToUnloadingPointTrip[0].loadingPoint.cementCompany.primaryBill
//     }
//     return checkStockToUnloading(trip)
// }
// export const cutomInvoiceDetails = (trip: tripType) => {
//     const billDetails = findBillingDetails(trip)
//     // @ts-expect-error replaceAll
//     const address = billDetails?.address.replaceAll(/(\n)/g, '<br />')
//     const elements = `<div className="customer" id="address">
//      <h4>${address}</h4>
//     <h4>${billDetails?.gstNumber}no </h4></div>`
//     return elements
// }

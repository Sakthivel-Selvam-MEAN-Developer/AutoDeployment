export const companyInvoiceDetails = {
    id: true,
    billNo: true,
    billDate: true,
    amount: true,
    pdfLink: true,
    GSTAmount: true,
    TDSAmount: true,
    cementCompany: { select: { name: true, id: true } }
}

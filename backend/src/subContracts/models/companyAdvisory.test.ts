import { create } from './companyAdvisory'

const mockCompanyAdvisory = {
    bankReferenceNumber: 'P0900767567',
    paymentDocumentNumber: 'NML056555',
    paymentReceivedDate: 1720569600
}

describe('company advisory model', async () => {
    test('should able to create company advisory', async () => {
        const actual = await create(mockCompanyAdvisory)
        expect(actual.bankReferenceNumber).toBe(mockCompanyAdvisory.bankReferenceNumber)
        expect(actual.paymentDocumentNumber).toBe(mockCompanyAdvisory.paymentDocumentNumber)
        expect(actual.paymentReceivedDate).toBe(mockCompanyAdvisory.paymentReceivedDate)
    })
})

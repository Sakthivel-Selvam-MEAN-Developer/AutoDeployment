import { paymentDuesProps, ppFuelProps } from '../types.ts'
import { isInitialPayAvailable, preEventApproval } from './pricePointApprovalEvent.ts'

const mockFuelData: ppFuelProps[] = [
    {
        id: 1,
        fueledDate: Date.now(),
        invoiceNumber: 'INV001',
        pricePerliter: 80,
        quantity: 100,
        totalprice: 8000,
        dieselkilometer: 500,
        fuelType: 'diesel',
        paymentStatus: true,
        overallTripId: null,
        updatedAt: new Date()
    },
    {
        id: 2,
        fueledDate: Date.now(),
        invoiceNumber: 'INV002',
        pricePerliter: 90,
        quantity: 50,
        totalprice: 4500,
        dieselkilometer: 300,
        fuelType: 'petrol',
        paymentStatus: true,
        overallTripId: null,
        updatedAt: new Date()
    }
]

const mockPaymentDuesData: paymentDuesProps[] = [
    {
        id: 1,
        name: 'Initial Payment',
        vehicleNumber: 'TN93D5512',
        dueDate: Date.now(),
        fuelId: null,
        type: 'initial pay',
        status: true,
        NEFTStatus: false,
        payableAmount: 5000,
        transactionId: null,
        paidAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        overallTripId: null
    },
    {
        id: 2,
        name: 'Final Payment',
        vehicleNumber: 'TN93D5512',
        dueDate: Date.now(),
        fuelId: null,
        type: 'final pay',
        status: true,
        NEFTStatus: false,
        payableAmount: 10000,
        transactionId: null,
        paidAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        overallTripId: null
    }
]

describe('preEventApproval', () => {
    test('should return true if wantFuel is true and fuel array is not empty', () => {
        const result = preEventApproval(true, mockFuelData)
        expect(result).toBe(true)
    })

    test('should return true if wantFuel is false', () => {
        const result = preEventApproval(false, [])
        expect(result).toBe(true)
    })

    test('should return false if wantFuel is true and fuel array is empty', () => {
        const result = preEventApproval(true, [])
        expect(result).toBe(false)
    })
})

describe('isInitialPayAvailable', () => {
    test('should return true if paymentDues array contains an initial pay entry', () => {
        const result = isInitialPayAvailable(mockPaymentDuesData)
        expect(result).toBe(true)
    })

    test('should return false if paymentDues array does not contain an initial pay entry', () => {
        const mockPaymentDuesWithoutInitialPay: paymentDuesProps[] = [
            {
                id: 1,
                name: 'Final Payment',
                vehicleNumber: 'TN93D5512',
                dueDate: Date.now(),
                fuelId: null,
                type: 'final pay',
                status: true,
                NEFTStatus: false,
                payableAmount: 10000,
                transactionId: null,
                paidAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                overallTripId: null
            }
        ]
        const result = isInitialPayAvailable(mockPaymentDuesWithoutInitialPay)
        expect(result).toBe(false)
    })

    test('should return false if paymentDues array is empty', () => {
        const result = isInitialPayAvailable([])
        expect(result).toBe(false)
    })
})

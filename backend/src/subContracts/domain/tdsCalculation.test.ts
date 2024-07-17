import { tdsCalculation } from './tdsCalculation'
const overallTrip = {
    id: 12,
    finalPayDuration: 1,
    paymentDues: [],
    shortageQuantity: [],
    acknowledgementStatus: false,
    acknowledgementApproval: true,
    transporterInvoice: 'default-invoice',
    acknowledgementDate: 1716595200,
    loadingPointToStockPointTrip: {
        freightAmount: 100,
        filledLoad: 10,
        transporterAmount: 90,
        totalFreightAmount: 1000,
        totalTransporterAmount: 900
    },
    stockPointToUnloadingPointTrip: {
        transporterAmount: 45,
        totalTransporterAmount: 450,
        loadingPointToStockPointTripId: 1,
        loadingPointToStockPointTrip: {
            freightAmount: 100,
            filledLoad: 10,
            transporterAmount: 90,
            totalFreightAmount: 1000,
            totalTransporterAmount: 900
        }
    },
    truck: {
        vehicleNumber: 'TN30S7777',
        transporter: {
            name: 'Muthu Logistics',
            tdsPercentage: 2,
            transporterType: 'Market',
            gstPercentage: 1
        }
    },
    loadingPointToUnloadingPointTrip: {
        startDate: new Date(2023, 10, 24).getTime() / 1000,
        filledLoad: 40,
        invoiceNumber: 'ABC123',
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 40000,
        totalTransporterAmount: 36000,
        margin: 4000,
        tripStatus: false,
        wantFuel: false,
        truck: {
            vehicleNumber: 'TN30S7777',
            transporter: {
                name: 'Muthu Logistics',
                tdsPercentage: null,
                transporterType: 'Market',
                gstPercentage: 1
            }
        }
    }
}
const result = {
    tdsAmount: 0,
    tdsPercentage: 2
}
test('Should able to get tds amount from direct trip', async () => {
    const input = {
        ...overallTrip,
        loadingPointToStockPointTrip: null,
        stockPointToUnloadingPointTrip: null
    }

    const actual = await tdsCalculation(input)
    expect(actual).toEqual({ ...result, tdsAmount: 720 })
})
test('Should able to get tds amount from loading to stock trip', async () => {
    const input = {
        ...overallTrip,
        loadingPointToUnloadingPointTrip: null
    }
    const actual = await tdsCalculation(input)
    expect(actual).toEqual({ ...result, tdsAmount: 27 })
})
test('Should able to handle when tds is null', async () => {
    const input = {
        ...overallTrip,
        truck: {
            vehicleNumber: 'TN30S7777',
            transporter: {
                name: 'Muthu Logistics',
                tdsPercentage: null,
                transporterType: 'Market',
                gstPercentage: 1
            }
        }
    }
    const actual = await tdsCalculation(input)
    expect(actual).toEqual({ tdsPercentage: 0, tdsAmount: 0 })
})

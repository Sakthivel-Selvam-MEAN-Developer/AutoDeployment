import dayjs from 'dayjs'
import { gstCalculation } from './gstDueLogic.ts'

const alltrip = {
    id: 1,
    acknowledgementApproval: true,
    acknowledgementDate: 1720204200,
    finalPayDuration: 0,
    transporterInvoice: '',
    paymentDues: [],
    shortageQuantity: [
        {
            id: 14,
            overallTripId: 14,
            shortageQuantity: 0,
            shortageAmount: 0,
            approvalStatus: true,
            reason: '',
            filledLoad: 23000,
            unloadedQuantity: 23000,
            unloadedDate: 1720204200,
            createdAt: new Date(2023, 10, 24),
            updatedAt: new Date(2023, 10, 24)
        }
    ],
    truck: {
        vehicleNumber: 'TN93D5512',
        transporter: {
            name: 'Barath Logistics Pvt Ltd',
            tdsPercentage: null,
            transporterType: 'Market Transporter',
            gstPercentage: 10
        }
    },
    stockPointToUnloadingPointTrip: {
        totalTransporterAmount: 20700,
        loadingPointToStockPointTrip: {
            totalTransporterAmount: 20700,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Barath Logistics Pvt Ltd',
                    tdsPercentage: null,
                    transporterType: 'Market Transporter',
                    gstPercentage: 10
                }
            }
        }
    },
    loadingPointToUnloadingPointTrip: {
        totalTransporterAmount: 20700,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Barath Logistics Pvt Ltd',
                tdsPercentage: null,
                transporterType: 'Market Transporter',
                gstPercentage: 10
            }
        }
    },
    loadingPointToStockPointTrip: {
        totalTransporterAmount: 20700,
        truck: {
            vehicleNumber: 'TN93D5512',
            transporter: {
                name: 'Barath Logistics Pvt Ltd',
                tdsPercentage: null,
                transporterType: 'Market Transporter',
                gstPercentage: 10
            }
        }
    }
}
const gstOutputData = {
    name: 'Barath Logistics Pvt Ltd',
    type: 'gst pay',
    dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
    payableAmount: 3000,
    overallTripId: 1,
    vehicleNumber: 'TN93D5512'
}

describe('gst calculation for loading to unloading', async () => {
    test('when gst is not applicable for loading to unloading trip ', async () => {
        const input = {
            ...alltrip,
            loadingPointToStockPointTrip: null,
            stockPointToUnloadingPointTrip: null,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Barath Logistics Pvt Ltd',
                    tdsPercentage: null,
                    transporterType: 'Market Transporter',
                    gstPercentage: null
                }
            }
        }
        const actual = await gstCalculation(input)
        expect(actual).toEqual(undefined)
    })
    test('when gst is applicable and approval status is acceptable for loading to unloading trip ', async () => {
        const input = {
            ...alltrip,
            stockPointToUnloadingPointTrip: null,
            loadingPointToStockPointTrip: null
        }
        const actual = await gstCalculation(input)
        expect(actual).toEqual([{ ...gstOutputData, payableAmount: 2070 }])
    })
    test('when approve status is rejectable in shortage', async () => {
        const input = {
            ...alltrip,
            shortageQuantity: [
                { ...alltrip.shortageQuantity[0], approvalStatus: false, shortageAmount: 1000 }
            ],
            stockPointToUnloadingPointTrip: null,
            loadingPointToStockPointTrip: null
        }
        const actual = await gstCalculation(input)
        expect(actual).toEqual([{ ...gstOutputData, payableAmount: 1970 }])
    })
    test('when transporter type is Own gst not created', async () => {
        const input = {
            ...alltrip,
            loadingPointToStockPointTrip: null,
            stockPointToUnloadingPointTrip: null,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Barath Logistics Pvt Ltd',
                    tdsPercentage: null,
                    transporterType: 'Own',
                    gstPercentage: null
                }
            }
        }
        const actual = await gstCalculation(input)
        expect(actual).toEqual(undefined)
    })
    test('when stockPointToUnloadingPointTrip is not null and loadingPointToStockPointTrip is null', async () => {
        const input = {
            ...alltrip,
            loadingPointToStockPointTrip: null
        }
        const actual = await gstCalculation(input)
        expect(actual).toEqual([{ ...gstOutputData, payableAmount: 4140 }])
    })

    test('when gstPercentage is defined but transporter type is Own', async () => {
        const input = {
            ...alltrip,
            truck: {
                vehicleNumber: 'TN93D5512',
                transporter: {
                    name: 'Barath Logistics Pvt Ltd',
                    tdsPercentage: null,
                    transporterType: 'Own',
                    gstPercentage: 10
                }
            }
        }
        const actual = await gstCalculation(input)
        expect(actual).toEqual(undefined)
    })

    test('when stockPointToUnloadingPointTrip is null', async () => {
        const input = {
            ...alltrip,
            loadingPointToStockPointTrip: null,
            stockPointToUnloadingPointTrip: {
                totalTransporterAmount: 20700,
                loadingPointToStockPointTrip: null
            },
            loadingPointToUnloadingPointTrip: null
        }
        const actual = await gstCalculation(input)
        expect(actual).toEqual(undefined)
    })
})

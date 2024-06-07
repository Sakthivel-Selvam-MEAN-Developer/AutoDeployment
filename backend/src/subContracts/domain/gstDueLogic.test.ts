import dayjs from 'dayjs'
import { gstCalculation } from './gstDueLogic.ts'

const alltrip = {
    id: 1,
    loadingPointToStockPointTrip: {
        totalTransporterAmount: 30000,
        filledLoad: 50,
        truck: {
            vehicleNumber: 'TN34MA3483',
            transporter: {
                name: 'kms Transport',
                transporterType: 'Market',
                gstPercentage: 3
            }
        }
    },
    stockPointToUnloadingPointTrip: {
        id: 1,
        totalTransporterAmount: 30000,
        filledLoad: 50,
        loadingPointToStockPointTrip: {
            totalTransporterAmount: 30000,
            filledLoad: 50,
            truck: {
                vehicleNumber: 'TN34MA3483',
                transporter: {
                    name: 'kms Transport',
                    transporterType: 'Market',
                    gstPercentage: 3
                }
            }
        }
    },
    loadingPointToUnloadingPointTrip: {
        id: 1,
        totalTransporterAmount: 30000,
        filledLoad: 50,
        truck: {
            vehicleNumber: 'TN34MA3483',
            transporter: {
                name: 'kms Transport',
                transporterType: 'Market',
                gstPercentage: 3
            }
        }
    }
}

const gstOutputData = {
    name: 'kms Transport',
    type: 'gst pay',
    dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
    payableAmount: 3000,
    overallTripId: 1,
    vehicleNumber: 'TN34MA3483'
}

const shortage = {
    approvalStatus: true,
    shortageAmount: 3000
}

let gstPercentage: number | null = 10
describe('gst calculation for loading to unloading', async () => {
    test('when gst is not applicable for loading to unloading trip ', async () => {
        const input = {
            ...alltrip,
            stockPointToUnloadingPointTrip: null,
            loadingPointToStockPointTrip: null
        }
        gstPercentage = null
        const actual = await gstCalculation(shortage, gstPercentage, input)
        expect(actual).toEqual(undefined)
    })
    test('when gst is applicable and approval status is acceptable for loading to unloading trip ', async () => {
        const input = {
            ...alltrip,
            stockPointToUnloadingPointTrip: null,
            loadingPointToStockPointTrip: null
        }
        gstPercentage = 10
        const actual = await gstCalculation(shortage, gstPercentage, input)
        expect(actual).toEqual([gstOutputData])
    })
    test('when approve status is rejectable in shortage', async () => {
        const input = {
            ...alltrip,
            stockPointToUnloadingPointTrip: null,
            loadingPointToStockPointTrip: null
        }
        const actual = await gstCalculation({ ...shortage, approvalStatus: false }, 10, input)
        expect(actual).toEqual([{ ...gstOutputData, payableAmount: 2700 }])
    })
    test('when transporter tytpe is Own gst not created', async () => {
        const input = {
            ...alltrip,
            stockPointToUnloadingPointTrip: {
                ...alltrip.stockPointToUnloadingPointTrip,
                loadingPointToStockPointTrip: {
                    ...alltrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip,
                    truck: {
                        ...alltrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                            .truck,
                        transporter: {
                            ...alltrip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                                .truck.transporter,
                            transporterType: 'Own'
                        }
                    }
                }
            },
            loadingPointToUnloadingPointTrip: null
        }
        const actual = await gstCalculation({ ...shortage, approvalStatus: false }, 10, input)
        expect(actual).toEqual(undefined)
    })
})

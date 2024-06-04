import dayjs from 'dayjs'
import { fuelCreation, fuelDuesCreation } from './createFuelEvent.ts'
// for transporter vehicle
const fuel = {
    id: 1,
    fueledDate: 1700764200,
    overallTripId: 2,
    invoiceNumber: 'ABC123',
    pricePerliter: 90,
    quantity: 100,
    totalprice: 9000,
    paymentStatus: false,
    vehicleNumber: 'TN93D5512',
    bunkId: 2
}
const truck = {
    vehicleNumber: 'TN93D5512',
    transporterId: 1,
    transporter: {
        id: 1,
        csmName: 'newName',
        name: 'Barath Logistics',
        tdsPercentage: null,
        transporterType: 'Market'
    }
}
const loadingPoint = {
    id: 1,
    name: 'Chennai-south',
    cementCompanyId: 1,
    cementCompany: {
        name: 'UltraTech Cements',
        advanceType: 70
    }
}
const trip = {
    id: 2,
    acknowledgementStatus: false,
    acknowledgementApproval: false,
    finalPayDuration: 0,
    transporterInvoice: '',
    acknowledgementDate: null,
    loadingPointToStockPointTripId: null,
    stockPointToUnloadingPointTripId: null,
    loadingPointToUnloadingPointTripId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    loadingPointToStockPointTrip: null,
    loadingPointToUnloadingPointTrip: {
        id: 3,
        startDate: 1718217000,
        filledLoad: 45,
        wantFuel: true,
        tripStatus: false,
        acknowledgeDueTime: null,
        partyName: 'SAAS',
        lrNumber: 'saS',
        freightAmount: 1000,
        transporterAmount: 900,
        totalFreightAmount: 45000,
        totalTransporterAmount: 40500,
        margin: 3150,
        loadingKilometer: 0,
        unloadingKilometer: 0,
        invoiceNumber: 'asa',
        loadingPointId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        unloadingPointId: 1,
        truckId: 3,
        billNo: null,
        truck,
        loadingPoint
    }
}

const bunkname = 'Barath Petroleum'
const vehicleNumber = 'TN93D5512'
const payableAmount = parseFloat(((40500 * 70) / 100 - 9000).toFixed(2))

describe('For a overall trip when create fuel event is called', async () => {
    test('when trip is created and already fuel available then fuel pay should be created with initial pay', async () => {
        const actual = await fuelCreation(fuel, trip, bunkname, vehicleNumber)
        const fuelPay = [
            {
                name: 'Barath Logistics',
                type: 'initial pay',
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount,
                overallTripId: 2,
                vehicleNumber,
                NEFTStatus: payableAmount < 0,
                transactionId: payableAmount < 0 ? '0' : '',
                paidAt: payableAmount < 0 ? 0 : 0
            },
            {
                name: bunkname,
                type: 'fuel pay',
                fuelId: fuel.id,
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: parseFloat(fuel.totalprice.toFixed(2)),
                overallTripId: 2,
                vehicleNumber
            }
        ]
        expect(actual).toEqual(fuelPay)
    })
    test('when trip is not created but fuel shoul be created', async () => {
        const actual = await fuelDuesCreation(bunkname, vehicleNumber, fuel)
        const fuelPay = [
            {
                name: bunkname,
                type: 'fuel pay',
                fuelId: fuel.id,
                vehicleNumber,
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: fuel.totalprice
            }
        ]
        expect(actual).toEqual(fuelPay)
    })
})

// for own vehicle
describe('For a overall trip when create fuel event in own vehicle', () => {
    test('when trip is not created but fuel shoul be created for own', async () => {
        const actual = await fuelDuesCreation(bunkname, vehicleNumber, fuel)
        const fuelPay = [
            {
                name: bunkname,
                type: 'fuel pay',
                fuelId: fuel.id,
                vehicleNumber,
                dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
                payableAmount: fuel.totalprice
            }
        ]
        expect(actual).toEqual(fuelPay)
    })
    test('when trip is created and already fuel available then only fuel pay should be created for own', async () => {
        const actual = await fuelCreation(
            fuel,
            {
                ...trip,
                loadingPointToUnloadingPointTrip: {
                    ...trip.loadingPointToUnloadingPointTrip,
                    truck: {
                        ...truck,
                        transporter: {
                            ...truck.transporter,
                            transporterType: 'Own',
                            name: 'Magnum Logistics'
                        }
                    }
                }
            },
            bunkname,
            vehicleNumber
        )
        const fuelPay = {
            name: bunkname,
            type: 'fuel pay',
            fuelId: fuel.id,
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            payableAmount: parseFloat(fuel.totalprice.toFixed(2)),
            overallTripId: 2,
            vehicleNumber
        }

        expect(actual).toEqual(fuelPay)
    })
})

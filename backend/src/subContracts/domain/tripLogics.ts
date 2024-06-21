import dayjs from 'dayjs'
import { tripLogicTripProps } from './types.ts'

interface Row {
    acknowledgementDate: number
    billNo: string
    stockPointToUnloadingPointTrip: [
        {
            unloadingPoint: {
                name: string
            }
            billNo: string
        }
    ]

    transporterInvoice: string
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number
    totalTransporterAmount: number
    margin: number
    transporterBalance: number
    tripStatus: boolean
    truck: {
        vehicleNumber: string
        transporter: {
            name: string
            csmName: string
            gstPercentage: GLfloat | string
        }
    }
    endDate: number
    invoiceNumber: string
    loadingPoint: {
        name: string
        cementCompany: {
            name: string
        }
    }
    unloadingPoint: {
        name: string
    }
    loadingKilometer: number
    unloadingKilometer: number
    stockPoint: {
        name: string
    }
    filledLoad: string
    startDate: number
    sample: string
}
interface bunk {
    bunkName: string
}
interface fuel {
    quantity: number
    totalprice: number
    bunk: bunk
}
interface shortage {
    unloadedDate: number
    shortageQuantity: number | string
    shortageAmount: number | string
    unloadedQuantity: number | string
}

export interface Props {
    id: number
    acknowledgementStatus: boolean
    acknowledgementApproval: boolean
    acknowledgementDate: number
    loadingPointToStockPointTrip: Row
    loadingPointToUnloadingPointTrip: Row
    stockPointToUnloadingPointTrip: Row
    paymentDues: PaymentItem[]
    fuel: fuel[]
    shortageQuantity: shortage[]
    number: number
    transporterInvoice: string
}
const tripLogic = async (trip: tripLogicTripProps, overallTrip: any, tripType: string) => {
    if (trip.truck.transporter.transporterType === 'Own') return
    const fuelDetails = overallTrip.fuel[0]
    if (trip.wantFuel === true && fuelDetails === null) return
    let transporterPercentage = 70 / 100
    if (tripType === 'LoadingToStock' && trip.loadingPoint.cementCompany.advanceType === 100) {
        transporterPercentage = 1
    }
    const fuelAmount = fuelDetails ? fuelDetails.totalprice : 0
    const payableAmount = parseFloat(
        (trip.totalTransporterAmount * transporterPercentage - fuelAmount).toFixed(2)
    )
    return [
        {
            name: trip.truck.transporter.name,
            type: 'initial pay',
            dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
            overallTripId: overallTrip.id,
            vehicleNumber: trip.truck.vehicleNumber,
            payableAmount,
            NEFTStatus: payableAmount < 0,
            transactionId: payableAmount < 0 ? '0' : '',
            paidAt: 0
        }
    ]
}
export default tripLogic

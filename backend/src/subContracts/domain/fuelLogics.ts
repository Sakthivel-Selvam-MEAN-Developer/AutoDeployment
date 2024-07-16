import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
interface fuelProps {
    id: number
    fueledDate: number
    overallTripId: number | null
    invoiceNumber: string
    pricePerliter: number
    quantity: number
    totalprice: number
    paymentStatus: boolean
    vehicleNumber: string
    bunkId: number
}

const fuelLogics = async (
    fuel: fuelProps,
    overallTripId: number | null | undefined,
    bunkname: string,
    vehicleNumber: string,
    creditDays: number
) => [
    {
        name: bunkname,
        type: 'fuel pay',
        fuelId: fuel.id,
        dueDate: dayjs.utc().add(creditDays, 'day').startOf('day').unix(),
        payableAmount: parseFloat(fuel.totalprice.toFixed(2)),
        overallTripId: overallTripId || null,
        vehicleNumber
    }
]
export default fuelLogics

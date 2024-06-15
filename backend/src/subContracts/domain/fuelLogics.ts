import dayjs from 'dayjs'

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
    vehicleNumber: string
) => [
    {
        name: bunkname,
        type: 'fuel pay',
        fuelId: fuel.id,
        dueDate: dayjs().subtract(1, 'day').startOf('day').unix(),
        payableAmount: parseFloat(fuel.totalprice.toFixed(2)),
        overallTripId: overallTripId || null,
        vehicleNumber
    }
]
export default fuelLogics

import { amountCalculation } from './amountCalculation.ts'

const transporterPercentage = 10
const freightAmount = 1000
const tripData = {
    id: 1,
    invoiceNumber: 'sdfg',
    filledLoad: 10,
    startDate: 12345678,
    totalTransporterAmount: 20000,
    tripStatus: false,
    loadingPointId: 1,
    stockPointId: 1,
    truck: {
        vehicleNumber: 'TN30C2000',
        transporter: {
            name: 'Barath Logistics Pvt Ltd',
            transporterType: 'Market',
            gstPercentage: 2
        }
    }
}
describe('Amount Calculation Test', async () => {
    test('Should able to calculate totalTransporterAmount from freight Amount ', async () => {
        const actual = await amountCalculation(transporterPercentage, freightAmount, tripData)
        expect(actual).toEqual({
            totalFreightAmount: 10000,
            totalTransporterAmount: 9000,
            margin: 700,
            transporterAmount: 900,
            approvedFreightAmount: 1000
        })
    })
})

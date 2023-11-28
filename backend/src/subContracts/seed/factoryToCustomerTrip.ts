import factory from './factory.ts'
import deliveryPoint from './deliveryPoint.ts'

export default {
    startDate: new Date(2023, 11, 27).getTime() / 1000,
    endDate: new Date(2023, 11, 30).getTime() / 1000,
    filledLoad: 40,
    invoiceNumber: 'ABC123',
    factory: {
        create: factory
    },
    deliveryPoint: {
        create: deliveryPoint
    }
}

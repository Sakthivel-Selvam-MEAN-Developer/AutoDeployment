import { tripDaysCalculation } from './tripDaysCaluclation.ts'

const driverTripDetails = [
    {
        dailyBetta: 500,
        id: 1,
        tripId: 1,
        tripStartDate: 1719792000,
        unloadingTripSalaryId: 1,
        stockTripSalaryId: 1,
        driverAdvanceForTrip: [{ amount: 21211 }],
        primaryTripBetta: 1221,
        secondaryTripBetta: 1212,
        driver: {
            name: 'ghjk',
            driverAttendance: []
        }
    }
]
const result = { tripDays: 9, averageTripDays: 3 }
describe('Driver Trip Days Calculation', () => {
    test('should able to calculate trip days based on next trip', () => {
        const input = [
            { ...driverTripDetails[0], tripStartDate: 1720569600 },
            ...driverTripDetails,
            { ...driverTripDetails[0], tripStartDate: 1720569600 }
        ]
        const totalTripBetta = tripDaysCalculation(input)
        expect(totalTripBetta).toStrictEqual(result)
    })
})

import { tripBettaCalculation } from './tripBettaCalculation.ts'

const driverAttendance = {
    dailyBetta: 500,
    id: 1,
    tripId: 1,
    unloadingTripSalaryId: 1,
    stockTripSalaryId: 1,
    driverAdvanceForTrip: [{ amount: 21211 }],
    primaryTripBetta: 1221,
    secondaryTripBetta: 1212,
    driver: {
        name: 'ghjk',
        driverAttendance: [
            {
                attendance: [
                    {
                        year: 2024,
                        attendance: [
                            {
                                month: 'June',
                                datesPresent: [1, 2, 3, 4, 5]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
const salaryMonth = 1717200000
const result = 2500

describe('Trip Betta Calculation', () => {
    test('should able to calculate trip betta based on attendance', async () => {
        const totalTripBetta = await tripBettaCalculation(driverAttendance, salaryMonth)
        expect(totalTripBetta).toBe(result)
    })
    test('should not able to calculate trip betta when there is no selected date', async () => {
        const totalTripBetta = await tripBettaCalculation(driverAttendance, undefined)
        expect(totalTripBetta).toBe(0)
    })
})

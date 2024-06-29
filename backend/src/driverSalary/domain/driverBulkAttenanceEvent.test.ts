import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { dateFormatDetailsFinalData, getDateFormatDetails } from './driverBulkAttenanceEvent.ts'

dayjs.extend(utc)

describe('Date Utilities', () => {
    describe('getDateFormatDetails function', () => {
        test('should format ISO dates correctly', () => {
            const isoDates = [
                new Date('2024-06-27T18:30:00.000Z'),
                new Date('2024-06-28T18:30:00.000Z')
            ]

            const expected = [
                {
                    dateStr: new Date('2024-06-27T18:30:00.000Z'),
                    day: dayjs.utc(new Date('2024-06-27T18:30:00.000Z')).date(),
                    month: 6,
                    year: 2024,
                    monthName: 'June'
                },
                {
                    dateStr: new Date('2024-06-28T18:30:00.000Z'),
                    day: dayjs.utc(new Date('2024-06-28T18:30:00.000Z')).date(),
                    month: 6,
                    year: 2024,
                    monthName: 'June'
                }
            ]

            return expect(getDateFormatDetails(isoDates)).resolves.toEqual(expected)
        })
    })

    describe('dateFormatDetailsFinalData function', () => {
        test('should group dates by year and month', async () => {
            const dateFormatArray = [
                {
                    dateStr: new Date('2024-06-27T18:30:00.000Z'),
                    day: 27,
                    month: 6,
                    year: 2024,
                    monthName: 'June'
                },
                {
                    dateStr: new Date('2024-06-28T18:30:00.000Z'),
                    day: 28,
                    month: 6,
                    year: 2024,
                    monthName: 'June'
                },
                {
                    dateStr: new Date('2024-07-01T18:30:00.000Z'),
                    day: 1,
                    month: 7,
                    year: 2024,
                    monthName: 'July'
                }
            ]

            const result = await dateFormatDetailsFinalData(dateFormatArray)
            const expected = [
                {
                    year: 2024,
                    attendance: [
                        {
                            month: 'June',
                            datesPresent: [27, 28]
                        },
                        {
                            month: 'July',
                            datesPresent: [1]
                        }
                    ]
                }
            ]

            expect(result).toEqual(expected)
        })

        test('should handle empty input', async () => {
            const result = await dateFormatDetailsFinalData([])

            expect(result).toEqual([])
        })
    })
})

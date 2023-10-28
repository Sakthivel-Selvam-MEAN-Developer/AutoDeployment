import { dateFromTraccar, toTraccarFormat } from './dateFormater'

describe('date format', () => {
    it('should convert epoc to traccar format', () => {
        expect(toTraccarFormat(1695475390)).toBe('2023-09-23T13:23:10.000Z')
    })
    it('should convert traccar format to epoc', () => {
        expect(dateFromTraccar('2023-09-23T13:23:10.000Z')).toBe(1695475390)
    })
})

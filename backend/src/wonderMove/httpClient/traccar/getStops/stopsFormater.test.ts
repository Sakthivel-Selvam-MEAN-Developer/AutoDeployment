import fromTraccar from './stopsFormatter'
import traccarStop from './sampleStopData'

describe('stop formatter', () => {
    it('should convert traccar response to our format', () => {
        const expected = {
            from: 1694762921,
            to: 1694770466,
            latitude: 11.781643333333333,
            longitude: 77.83068833333333,
            duration: 7545000
        }
        expect(fromTraccar(traccarStop)).toEqual(expected)
    })
})

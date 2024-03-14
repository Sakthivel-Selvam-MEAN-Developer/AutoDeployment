import seedDriver from '../seed/driver.ts'
import { create, getAllDriver } from './driver.ts'

describe('Driver model', () => {
    test('should able to create', async () => {
        const driver = await create(seedDriver)
        const actual = await getAllDriver()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(driver.name)
    })
})

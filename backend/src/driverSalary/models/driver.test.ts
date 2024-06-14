import prisma from '../../../prisma/index.ts'
import seedDriver from '../seed/driver.ts'
import { create, getAllDriver } from './driver.ts'

describe('Driver model', () => {
    test('should able to create', async () => {
        await prisma.$transaction(async (prismas) => {
            await create(seedDriver, prismas)
        })
        const actual = await getAllDriver()
        expect(actual.length).toBe(1)
    })
})

import seedTransporter from '../seed/transporter.ts'
import { create, getAllTransporter } from './transporter.ts'

describe('Factory model', () => {
    test('should able to create', async () => {
        await create(seedTransporter)
        const actual = await getAllTransporter()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedTransporter.name)
    })
})

import seedTransporter from '../seed/transporter.ts'
import { create } from './transporter.ts'

describe('Factory model', () => {
    test('should able to create', async () => {
        const transporter = await create(seedTransporter)
        expect(transporter.name).toBe(seedTransporter.name)
    })
})

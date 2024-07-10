import seedTransporter from '../seed/transporter.ts'
import {
    getAllTransporter,
    getAllTransporterName,
    getPercentageByTransporter,
    getTransporterAccountByName
} from './transporter.ts'
import { create } from './transporterEdit.ts'

describe('Factory model', () => {
    test('should able to create', async () => {
        const id = 1
        await create(seedTransporter, id)
        const actual = await getAllTransporter()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedTransporter.name)
    })
    test('should able to get All Transporter by Name', async () => {
        await create(seedTransporter, 1)
        const actual = await getAllTransporterName()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedTransporter.name)
    })
    test('should able to get Percentage By Transporter name', async () => {
        const transporter = await create({ ...seedTransporter, tdsPercentage: 5, hasTds: true }, 1)
        const actual = await getPercentageByTransporter(transporter.name)
        expect(actual?.tdsPercentage).toBe(transporter.tdsPercentage)
    })
    test('should able to get Transporter Account By Name', async () => {
        const transporter = await create({ ...seedTransporter, tdsPercentage: 5, hasTds: true }, 1)
        const actual = await getTransporterAccountByName([transporter.name])
        expect(actual[0]?.name).toBe(transporter.name)
    })
})

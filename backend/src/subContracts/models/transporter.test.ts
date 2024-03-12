import seedTransporter from '../seed/transporter.ts'
import {
    create,
    getAllTransporter,
    getAllTransporterName,
    getPercentageByTransporter,
    getTransporterAccountByName
} from './transporter.ts'

describe('Factory model', () => {
    test('should able to create', async () => {
        await create(seedTransporter)
        const actual = await getAllTransporter()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedTransporter.name)
    })
    test('should able to get All Transporter by Name', async () => {
        await create(seedTransporter)
        const actual = await getAllTransporterName()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedTransporter.name)
    })
    test('should able to get Percentage By Transporter name', async () => {
        const transporter = await create({ ...seedTransporter, tdsPercentage: 5, hasTds: true })
        const actual = await getPercentageByTransporter(transporter.name)
        expect(actual?.tdsPercentage).toBe(transporter.tdsPercentage)
    })
    test('should able to get Transporter Account By Name', async () => {
        const transporter = await create({ ...seedTransporter, tdsPercentage: 5, hasTds: true })
        const actual = await getTransporterAccountByName([transporter.name])
        expect(actual[0]?.name).toBe(transporter.name)
    })
})

import supertest from 'supertest'
import { app } from '../../app.ts'

const mockTransporter = vi.fn()
const mockCreateTransporter = vi.fn()

vi.mock('../models/transporter', () => ({
    getAllTransporter: () => mockTransporter(),
    create: (inputs: any) => mockCreateTransporter(inputs)
}))
const mockTransporterData = {
    name: 'Barath Logistics Pvt Ltd',
    emailId: 'sample@gmail.com',
    contactPersonName: 'Muthu',
    contactPersonNumber: '1234',
    address: 'Muthu Street',
    hasGst: false,
    hasTds: false,
    accountHolder: 'muthu',
    accountNumber: '43534523',
    ifsc: 'zxy1234'
}
describe('Transporter Controller', () => {
    test('should able to access', async () => {
        mockTransporter.mockResolvedValue({ name: 'Barath Logistics' })
        await supertest(app).get('/api/transporter').expect({ name: 'Barath Logistics' })
        expect(mockTransporter).toBeCalledWith()
    })
    test('should able to access', async () => {
        mockCreateTransporter.mockResolvedValue(mockTransporterData)
        await supertest(app).post('/api/transporter').expect(200)
        expect(mockCreateTransporter).toBeCalledTimes(1)
    })
})

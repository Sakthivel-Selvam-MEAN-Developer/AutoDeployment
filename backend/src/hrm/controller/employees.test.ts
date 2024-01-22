import supertest from 'supertest'
import { app } from '../../app.ts'

const mockEmployee = vi.fn()
vi.mock('../models/employee.ts', () => ({
    getEmployeeName: (empId: string) => mockEmployee(empId)
}))

describe('should return employee', () => {
    test('should able to access employee details', async () => {
        mockEmployee.mockResolvedValue({ id: 1, name: 'random' })
        await supertest(app).get('/api/employees/random').expect({ id: 1, name: 'random' })
        expect(mockEmployee).toBeCalledWith('random')
    })
})

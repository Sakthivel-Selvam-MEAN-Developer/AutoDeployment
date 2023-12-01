import express from 'express'
import supertest from 'supertest'
import routes from '../../index.ts'

const mockEmployee = jest.fn()
jest.mock('../models/employee.ts', () => ({
    getEmployeeName: (empId: string) => mockEmployee(empId)
}))

describe('should return employee', () => {
    let app: any
    beforeAll(() => {
        app = express()
        app.use(express.urlencoded({ extended: true }))
        app.use('/', routes)
    })
    test('should able to access employee details', async () => {
        mockEmployee.mockResolvedValue({ id: 1, name: 'random' })
        await supertest(app).get('/employees/random').expect({ id: 1, name: 'random' })
        expect(mockEmployee).toBeCalledWith('random')
    })
})

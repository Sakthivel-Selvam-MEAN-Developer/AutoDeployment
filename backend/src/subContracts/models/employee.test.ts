import { randomInt } from 'crypto'
import { create as createEmployee } from './employee'
import dayjs from 'dayjs'

const employeeData = {
    corporateId: randomInt(100, 200000).toString(),
    joiningDate: dayjs().unix(),
    mailId: 'ravi@gmail.com',
    contactNumber: 9,
    department: 'support',
    designation: 'CSM',
    address: 'Erode',
    dateOfBirth: dayjs().unix(),
    aadharNumber: '9876543210',
    panNumber: 'ABCDE9876F',
    bloodGroup: 'O+',
    accountName: 'Ravishankar Venkatasamy',
    accountNumber: '987766554322',
    ifscCode: 'IOBA00001',
    branch: 'Erode',
    accountType: 'current',
    loginAccess: true
}
describe('Employee model', () => {
    test('should able to create employee', async () => {
        const actual = await createEmployee(employeeData)
        expect(actual.corporateId).toStrictEqual(employeeData.corporateId)
    })
})

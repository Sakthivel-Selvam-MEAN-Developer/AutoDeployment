import { create as createEmployee, getAllEmployee } from './employee'

const employeeData = {
    corporateId: 'MAG0001',
    joiningDate: 960808392,
    mailId: 'ravi@gmail.com',
    contactNumber: 9,
    department: 'support',
    designation: 'CSM',
    address: 'Erode',
    dateOfBirth: 960808392,
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
    test('should be able to get employee', async () => {
        const input = { ...employeeData, corporateId: 'MAG0002' }
        await createEmployee(input)
        const actual = await getAllEmployee()
        expect(actual[0].corporateId).toEqual(input.corporateId)
    })
})

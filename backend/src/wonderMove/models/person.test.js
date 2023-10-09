import person from 'apps/wonderMove/seed/person'
import address from 'apps/wonderMove/seed/address'
import { Person } from './person'
import { Address } from './address'

describe.skip('Person model', () => {
    test('should be able to access', async () => {
        await Person.create(person)
        const users = await Person.findAll()
        expect(users.length).toBe(1)
        expect(users[0].name).toBe(person.name)
        expect(users[0].mobile).toEqual(person.mobile.toString())
        expect(users[0].email).toBe(person.email)
    })
    test('should have address', async () => {
        const savedAddress = await Address.create(address)
        const savedPerson = await Person.create(person)
        await savedPerson.setAddress(savedAddress)
        const users = await Person.findOne({
            where: {
                name: person.name
            },
            include: Address
        })
        expect(users.address.line1).toBe(address.line1)
    })
})

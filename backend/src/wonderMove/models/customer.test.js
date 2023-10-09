import seedCustomer from 'apps/wonderMove/seed/customer'
import {
    create,
    fetchCustomerByName,
    getAllCustomerNames,
    updateCustomerByName
} from './customer'

function validateCustomerValues(actual) {
    expect(actual.name).toBe(seedCustomer.name)
    expect(actual.gst).toBe(seedCustomer.gst)
    expect(actual.pan).toBe(seedCustomer.pan)
    expect(actual.isGstBilling).toBe(seedCustomer.isGstBilling)
    expect(actual.iGst).toBe(seedCustomer.iGst)
    expect(actual.isTDSApplicable).toBe(seedCustomer.isTDSApplicable)
    expect(actual.tdsPercentage).toBe(seedCustomer.tdsPercentage)
}

describe('Customer model', () => {
    test('should be able to access', async () => {
        await create(seedCustomer)
        const actual = await fetchCustomerByName(seedCustomer.name)
        validateCustomerValues(actual)
    })
    test('should be able to access', async () => {
        await create(seedCustomer)
        await updateCustomerByName(seedCustomer.name, {
            ...seedCustomer,
            iGst: 'newValue'
        })
        const actual = await fetchCustomerByName(seedCustomer.name)
        expect(actual.iGst).toBe('newValue')
    })
    test('should have person field', async () => {
        await create(seedCustomer)
        const actual = await fetchCustomerByName(seedCustomer.name)
        expect(actual.contactPerson.name).toBe(
            seedCustomer.contactPerson.create.name
        )
    })
    test('should get all customer', async () => {
        await create(seedCustomer)
        const actual = await getAllCustomerNames()
        expect(actual.length).toBe(1)
        expect(actual[0].name).toBe(seedCustomer.name)
    })
})

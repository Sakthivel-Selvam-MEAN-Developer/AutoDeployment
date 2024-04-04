import { useEffect, useState } from 'react'
import { getCustomerDetails } from '../../services/customer'
import UpdateCustomer from './update.tsx'

interface CustomerProps {
    number: string
}

interface CustomerDetails {}
const Customer: React.FC<CustomerProps> = ({ number }) => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails | undefined>()
    useEffect(() => {
        getCustomerDetails(number).then(setCustomerDetails)
    }, [number])
    return updateCustomer(customerDetails)
}
export default Customer

const updateCustomer = (customerDetails: CustomerDetails | undefined) => {
    return (
        <div style={{ marginTop: '20px' }}>
            {customerDetails && <UpdateCustomer customerDetails={customerDetails} />}
        </div>
    )
}

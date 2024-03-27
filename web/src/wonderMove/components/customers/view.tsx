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
    return (
        <>
            {customerDetails && (
                <div style={{ marginTop: '20px' }}>
                    <UpdateCustomer customerDetails={customerDetails} />
                </div>
            )}
        </>
    )
}

export default Customer

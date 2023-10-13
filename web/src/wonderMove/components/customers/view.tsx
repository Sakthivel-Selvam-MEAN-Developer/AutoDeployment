import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getCustomerDetails } from '../../services/customer'
import UpdateCustomer from './update.tsx'

interface CustomerProps {
    number: any;
}

interface CustomerDetails {
}
const Customer: React.FC<CustomerProps> = ({ number }) => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails | undefined>()
    const updateCustomerList = () => {
        getCustomerDetails(number)
            .then(setCustomerDetails)
    }
    useEffect(updateCustomerList, [number])
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
Customer.propTypes = {
    number: PropTypes.string,
}

export default Customer

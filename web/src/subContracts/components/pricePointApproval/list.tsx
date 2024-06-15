import React, { ReactElement, useEffect, useState } from 'react'
import { getTripsForPricePointApproval } from '../../services/pricePointApproval'
import PricePointApprovalTable from './table'
import { overallTrip } from './types'
import { submitStatusContext } from './approvalContext'
const PricePointApprovalList: React.FC = (): ReactElement => {
    const [tripDetails, setTripDetails] = useState<overallTrip[]>([])
    const [submitStatus, setSubmitStatus] = useState(false)
    useEffect(() => {
        getTripsForPricePointApproval().then(setTripDetails)
    }, [submitStatus])
    return (
        <submitStatusContext.Provider value={{ submitStatus, setSubmitStatus }}>
            <PricePointApprovalTable tripDetails={tripDetails} />
        </submitStatusContext.Provider>
    )
}
export default PricePointApprovalList

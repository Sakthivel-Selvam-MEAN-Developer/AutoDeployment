import React, { ReactElement, useEffect, useState } from 'react'
import ApprovalTable from './table'
import { getTripForAcknowlegementApproval } from '../../services/acknowlegementApproval'
import { tripContext } from './approvalContext'
import { overallTripProps } from '../../types/tripTypes'
const AcknowledgementApprovalList: React.FC = (): ReactElement => {
    const [tripDetails, setTripDetails] = useState<overallTripProps[]>([])
    useEffect(() => {
        getTripForAcknowlegementApproval().then(setTripDetails)
    }, [])
    return (
        <tripContext.Provider value={{ tripDetails, setTripDetails }}>
            <ApprovalTable tripDetails={tripDetails} />
        </tripContext.Provider>
    )
}
export default AcknowledgementApprovalList

import React, { ReactElement, useEffect, useState } from 'react'
import ApprovalTable from './table'
import { getTripForAcknowlegementApproval } from '../../services/acknowlegementApproval'
import { tripContext } from './approvalContext'
import { overallTripProps } from '../../types/tripTypes'
const AcknowledgementApprovalList: React.FC = (): ReactElement => {
    const [tripDetails, setTripDetails] = useState<overallTripProps[]>([])
    const [sendStatus, setSendStatus] = useState(false)
    useEffect(() => {
        getTripForAcknowlegementApproval().then(setTripDetails)
        console.log(sendStatus, tripDetails)
    }, [sendStatus])
    return (
        <tripContext.Provider value={{ tripDetails, setTripDetails }}>
            <ApprovalTable tripDetails={tripDetails} setSendStatus={setSendStatus} />
        </tripContext.Provider>
    )
}
export default AcknowledgementApprovalList

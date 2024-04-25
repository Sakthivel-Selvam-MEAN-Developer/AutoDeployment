import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../../form/button'
import ListAllAcknowledgementDueDetails from './acknowledgementDuesShow'
import AcknowledgementDuesFilter from './acknowledgementDuesFilter'
import { getTripByUnloadDate } from '../../../services/overallTrips'

const ListAllAcknowledgementDues: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [skipNumber, setskipNumber] = useState(0)
    const [tripWithPagination, setTripWithPagination] = useState([])
    const [acknowledgementList, setAcknowledgementList] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    useEffect(() => {
        getTripByUnloadDate(0).then((data) => {
            setAcknowledgementList(data), setTripWithPagination(data)
        })
    }, [])
    useEffect(() => {
        const value = skipNumber * 15
        const Trip = acknowledgementList ? acknowledgementList.slice(value, value + 15) : []
        setTripWithPagination(Trip)
    }, [skipNumber, acknowledgementList])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const days = data.agingDate !== undefined ? data.agingDate : 0
        getTripByUnloadDate(days).then(setAcknowledgementList)
        setShowDetails(true)
    }
    return (
        <>
            <p>
                <b>Acknowledgement Aging Report</b>
            </p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <AcknowledgementDuesFilter control={control} />
                <SubmitButton name="Filter" type="submit" />
            </form>
            {showDetails && (
                <ListAllAcknowledgementDueDetails
                    setskipNumber={setskipNumber}
                    acknowledgementDueDetails={tripWithPagination}
                />
            )}
        </>
    )
}
export default ListAllAcknowledgementDues

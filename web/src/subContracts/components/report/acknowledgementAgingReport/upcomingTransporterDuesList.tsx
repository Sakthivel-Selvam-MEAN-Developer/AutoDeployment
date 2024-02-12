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
        const value = skipNumber * 2
        const Trip = acknowledgementList.slice(value, value + 2)
        setTripWithPagination(Trip)
    }, [skipNumber, acknowledgementList])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const date = new Date()
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        const a = date.setDate(date.getDate() - parseInt(data.agingDate))
        data.agingDate &&
            getTripByUnloadDate(parseInt(String(a).slice(0, 10))).then(setAcknowledgementList)
        console.log(Date.now())

        setShowDetails(true)
    }
    return (
        <>
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

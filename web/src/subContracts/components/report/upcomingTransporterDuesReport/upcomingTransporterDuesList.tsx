import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../../form/button'
import TransporterDuesFilter from './transporterDuesFilter'
import ListAllTransporterDetails from './transporterShow'
import { getUpcomingDuesByFilter } from '../../../services/paymentDues'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)

const ListAllUpcomingDues: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [skipNumber, setskipNumber] = useState(0)
    const [tripWithPagination, setTripWithPagination] = useState([])
    const [transporterList, setTransporterList] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [transporterName, setTransporterName] = useState('')
    useEffect(() => {
        const value = skipNumber * 15
        const Trip = transporterList ? transporterList.slice(value, value + 15) : []
        setTripWithPagination(Trip)
    }, [skipNumber, transporterList])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const filterData = {
            transporterName: transporterName !== '' ? transporterName : undefined,
            from: data.from !== undefined ? dayjs.utc(data.from).unix() : undefined,
            to: data.to !== undefined ? dayjs.utc(data.to).unix() : undefined
        }
        getUpcomingDuesByFilter(filterData).then(setTransporterList)
        setShowDetails(true)
    }
    return (
        <>
            <p>
                <b>Upcoming Payment Dues</b>
            </p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <TransporterDuesFilter control={control} setTransporterName={setTransporterName} />
                <SubmitButton name="Filter" type="submit" />
            </form>
            {showDetails && (
                <ListAllTransporterDetails
                    setskipNumber={setskipNumber}
                    transporterDueData={tripWithPagination}
                />
            )}
        </>
    )
}
export default ListAllUpcomingDues

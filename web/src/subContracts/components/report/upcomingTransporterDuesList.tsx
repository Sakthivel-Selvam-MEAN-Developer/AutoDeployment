import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import TransporterDuesFilter from './transporterDuesFilter'
import ListAllTransporterDetails from './transporterShow'
import {
    getUpcomingDuesByFilter,
    getUpcomingDuesByFilterByDefault
} from '../../services/paymentDues'

const ListAllUpcomingDues: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [skipNumber, setskipNumber] = useState(0)
    const [tripWithPagination, setTripWithPagination] = useState([])
    const [transporterList, setTransporterList] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [transporterName, setTransporterName] = useState('')
    useEffect(() => {
        getUpcomingDuesByFilterByDefault().then((data) => {
            setTransporterList(data), setTripWithPagination(data)
        })
    }, [])
    useEffect(() => {
        const value = skipNumber * 5
        const Trip = transporterList.slice(value, value + 5)
        setTripWithPagination(Trip)
    }, [skipNumber, transporterList])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (transporterName !== '' && data.from && data.to)
            getUpcomingDuesByFilter(transporterName, data.from.unix(), data.to.unix()).then(
                setTransporterList
            )
        setShowDetails(true)
    }
    return (
        <>
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

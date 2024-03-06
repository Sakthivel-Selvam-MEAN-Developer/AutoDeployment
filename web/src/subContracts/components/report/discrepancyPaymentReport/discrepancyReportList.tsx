import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../../form/button'
import ListAllDiscrepancyReportDetails from './discrepancyReportShow'
import DiscrepancyReportFilter from './discrepancyReportFilter'
import { getAllDiscrepancyReport } from '../../../services/overallTrips'

const ListAllDiscrepancyReport: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [skipNumber, setskipNumber] = useState(0)
    const [tripWithPagination, setTripWithPagination] = useState([])
    const [discrepencyList, setDiscrepencyList] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    useEffect(() => {
        getAllDiscrepancyReport(0, 2000000000).then((data) => {
            setDiscrepencyList(data), setTripWithPagination(data)
        })
    }, [])
    useEffect(() => {
        const value = skipNumber * 15
        const Trip = discrepencyList.slice(value, value + 15)
        setTripWithPagination(Trip)
    }, [skipNumber, discrepencyList])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.from && data.to)
            getAllDiscrepancyReport(data.from.unix(), data.to.unix()).then(setDiscrepencyList)
        setShowDetails(true)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DiscrepancyReportFilter control={control} />
                <SubmitButton name="Filter" type="submit" />
            </form>
            {showDetails && (
                <ListAllDiscrepancyReportDetails
                    setskipNumber={setskipNumber}
                    discrepancyDueDetails={tripWithPagination}
                />
            )}
        </>
    )
}
export default ListAllDiscrepancyReport

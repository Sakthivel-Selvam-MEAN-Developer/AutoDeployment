import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FilterTripReport from './formField'
import ListAllDetails from './show'
import { getOverallTrip, getOverallTripByFilter } from '../../services/overallTrips'

const ListAllTrip: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [listoverallTrip, setListoverallTrip] = useState([])
    const [tripWithPagination, setTripWithPagination] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [cementCompanyId, setCementCompanyId] = useState<number>(0)
    const [transporterId, setTransporterId] = useState(0)
    const [loadingPointId, setLoadingPointId] = useState(0)
    const [skipNumber, setskipNumber] = useState(0)
    useEffect(() => {
        getOverallTrip().then((data) => {
            setListoverallTrip(data), setTripWithPagination(data)
        })
    }, [])
    useEffect(() => {
        const value = skipNumber * 15
        const Trip = listoverallTrip ? listoverallTrip.slice(value, value + 15) : []
        setTripWithPagination(Trip)
    }, [skipNumber, listoverallTrip])
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (
            cementCompanyId !== 0 ||
            transporterId !== 0 ||
            loadingPointId !== 0 ||
            data.from ||
            data.to
        ) {
            await getOverallTripByFilter(
                cementCompanyId,
                transporterId,
                loadingPointId,
                data.from ? data.from.unix() : 0,
                data.to ? data.to.unix() : 0
            ).then(setListoverallTrip)
        }
        setShowDetails(true)
    }
    return (
        <>
            <p>
                <b>Trip Status Report</b>
            </p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FilterTripReport
                    control={control}
                    setCementCompanyId={setCementCompanyId}
                    setTransporterId={setTransporterId}
                    setLoadingPointId={setLoadingPointId}
                />
                <SubmitButton name="Filter" type="submit" />
            </form>
            {showDetails && (
                <ListAllDetails
                    setskipNumber={setskipNumber}
                    listoverallTrip={tripWithPagination}
                />
            )}
        </>
    )
}
export default ListAllTrip

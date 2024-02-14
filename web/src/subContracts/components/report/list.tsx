import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FilterReport from './formField'
import ListAllDetails from './show'
import { getOverallTrip, getOverallTripByFilter } from '../../services/overallTrips'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
const style = {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'right'
}
const ListAllReport: React.FC = (): ReactElement => {
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
        const value = skipNumber * 2
        const Trip = listoverallTrip.slice(value, value + 2)
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
            <div style={style}>
                <Link to={'/sub/reports/upcomingdues'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Upcoming Payment Dues
                    </Button>
                </Link>
                <Link to={'/sub/reports/discrepancydues'}>
                    <Button color="primary" variant="contained">
                        Discrepancy Payment Report
                    </Button>
                </Link>
                <Link to={'/sub/reports/pendingacknowledgement'}>
                    <Button color="primary" variant="contained">
                        Acknowledgement Aging Report
                    </Button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FilterReport
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
export default ListAllReport

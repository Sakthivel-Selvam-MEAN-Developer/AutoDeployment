import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FilterReport from './formField'
import ListAllDetails from './show'
import { getOverallTrip, getOverallTripByFilter } from '../../services/overallTrips'
const ListAllReport: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [listoverallTrip, setListoverallTrip] = useState([])
    const [showDetails, setShowDetails] = useState(false)
    const [cementCompanyId, setCementCompanyId] = useState<number>(0)
    const [transporterId, setTransporterId] = useState(0)
    const [loadingPointId, setLoadingPointId] = useState(0)

    useEffect(() => {
        getOverallTrip().then(setListoverallTrip)
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        if (cementCompanyId !== 0 || transporterId !== 0 || loadingPointId !== 0) {
            await getOverallTripByFilter(cementCompanyId, transporterId, loadingPointId).then(
                setListoverallTrip
            )
        }
        setShowDetails(true)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FilterReport
                    control={control}
                    setCementCompanyId={setCementCompanyId}
                    setTransporterId={setTransporterId}
                    setLoadingPointId={setLoadingPointId}
                />
                <SubmitButton name="Submit" type="submit" />
            </form>
            <br />
            <br />
            {showDetails && <ListAllDetails listoverallTrip={listoverallTrip} />}
        </>
    )
}
export default ListAllReport

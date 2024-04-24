import { FC, useContext } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../../form/button'
import TripFilterFields from './formField'
import { filterData, dispatchData } from './tripStatusContext'
import { tripStatusFilter } from '../../../services/overallTrips'
import { TripFilterFormProps } from './tripStatusReportTypes'

export interface overallTripsProps {
    filterData: never[]
    count: number
}

export const TripFilterForm: FC<TripFilterFormProps> = ({ setOverallTrips, setCount }) => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const { dispatch } = useContext(dispatchData)
    const oldFilterData = useContext(filterData)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.from !== undefined && data.to !== undefined) {
            dispatch({ from: data.from.unix(), to: data.to.unix(), type: 'updateFromAndTo' })
            dispatch({ pageNumber: 1, type: 'updatePageNumber' })
            return tripStatusFilter({
                ...oldFilterData,
                from: data.from.unix(),
                to: data.to.unix()
            }).then((data: overallTripsProps) => {
                setOverallTrips(data.filterData)
                setCount(data.count)
            })
        } else
            return tripStatusFilter({ ...oldFilterData }).then((data: overallTripsProps) => {
                setOverallTrips(data.filterData)
                setCount(data.count)
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TripFilterFields control={control} />
            <SubmitButton name="Filter" type="submit" />
        </form>
    )
}

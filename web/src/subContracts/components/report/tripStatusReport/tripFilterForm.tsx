import { FC, useContext } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../../form/button'
import TripFilterFields from './formField'
import { filterData, dispatchData } from './tripStatusContext'
import { tripStatusFilter } from '../../../services/overallTrips'

export const TripFilterForm: FC = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const { dispatch } = useContext(dispatchData)
    const oldFilterData = useContext(filterData)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.from === undefined && data.to === undefined) return
        dispatch({ from: data.from.unix(), to: data.to.unix(), type: 'updateFromAndTo' })
        tripStatusFilter({ ...oldFilterData, from: data.from.unix(), to: data.to.unix() })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TripFilterFields control={control} />
            <SubmitButton name="Filter" type="submit" />
        </form>
    )
}

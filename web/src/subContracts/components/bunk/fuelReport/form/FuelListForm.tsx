import { FC } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../../../form/button'
import FuelFilterFields from './FuelFormField'
import { TripFilterFormProps } from '../../../../types/fuelFilters'
// import { filterData, dispatchData } from '../FuelContext/FuelReportContext'
// import { getAllFuelReport } from '../../../../services/fuel'

export interface fuelReportProps {
    filterData: never[]
    count: number
}

export const FuelListForm: FC<TripFilterFormProps> = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    // const { dispatch } = useContext(dispatchData)
    // const oldFilterData = useContext(filterData)
    const onSubmit: SubmitHandler<FieldValues> = () => {
        // if (data.from !== undefined && data.to !== undefined) {
        //     dispatch({ from: data.from.unix(), to: data.to.unix(), type: 'updateFromAndTo' })
        //     dispatch({ pageNumber: 1, type: 'updatePageNumber' })
        //     return getAllFuelReport({
        //         ...oldFilterData,
        //         from: data.from.unix(),
        //         to: data.to.unix()
        //     }).then((data: fuelReportProps) => {
        //         setfuelReportData(data.filterData)
        //         setCount(data.count)
        //     })
        // } else
        //     return getAllFuelReport({ ...oldFilterData }).then((data: fuelReportProps) => {
        //         setfuelReportData(data.filterData)
        //         setCount(data.count)
        //     })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FuelFilterFields control={control} />
            <SubmitButton name="Filter" type="submit" />
        </form>
    )
}

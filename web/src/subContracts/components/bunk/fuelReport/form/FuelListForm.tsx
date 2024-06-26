import { FC, useContext } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../../../form/button'
import FuelFilterFields from './FuelFormField'
import { TripFilterFormProps } from '../../../../types/fuelFilters'
import { filterData, dispatchData } from '../fuelContext/fuelReportContext'
import { getAllFuelReport } from '../../../../services/fuel'

export interface fuelReportProps {
    data: never[]
    count: number
}

export const FuelListForm: FC<TripFilterFormProps> = ({ setfuelReportData, setCount }) => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const { dispatch } = useContext(dispatchData)
    const oldFilterData = useContext(filterData)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (data.from !== undefined && data.to !== undefined) {
            dispatch({ from: data.from.unix(), to: data.to.unix(), type: 'updateFromAndTo' })
            dispatch({ pageNumber: 1, type: 'updatePageNumber' })
            return getAllFuelReport({
                ...oldFilterData,
                from: data.from.unix(),
                to: data.to.unix()
            }).then((data: fuelReportProps) => {
                setfuelReportData(data.data)
                setCount(data.count)
            })
        } else
            return getAllFuelReport({ ...oldFilterData }).then((data: fuelReportProps) => {
                console.log(data)
                setfuelReportData(data.data)
                setCount(data.count)
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FuelFilterFields control={control} />
            <SubmitButton name="Filter" type="submit" />
        </form>
    )
}

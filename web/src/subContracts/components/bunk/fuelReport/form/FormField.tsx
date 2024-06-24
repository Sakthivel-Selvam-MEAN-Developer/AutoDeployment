import { FC } from 'react'
import { Control } from 'react-hook-form'
import { Dispatch } from 'react'
import { DateField } from './DateField.tsx'
import { dispatchType } from '../FuelContext/fuelReportTypes.ts'
import { VehicleNameField } from './VehicleNameField.tsx'
interface FilterFieldProps {
    control: Control
    dispatch: Dispatch<dispatchType>
}
export const FilterField: FC<FilterFieldProps> = ({ control, dispatch }) => {
    return (
        <>
            <DateField control={control} />
            <VehicleNameField control={control} dispatch={dispatch} />
        </>
    )
}
export default FilterField

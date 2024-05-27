import { FC } from 'react'
import { Control } from 'react-hook-form'
import { Dispatch } from 'react'
import { TransporterField, FactoryField } from './TransporterField.tsx'
import { VehicleNumberField } from './vehicleNumberField.tsx'
import { InvoiceNumberField } from './invoiceNumberField.tsx'
import { DateField } from './DateField.tsx'
import { dispatchType } from './tripStatusReportTypes.ts'
interface FilterFieldProps {
    control: Control
    dispatch: Dispatch<dispatchType>
    cementCompanyName: string
}
export const FilterField: FC<FilterFieldProps> = ({ control, dispatch, cementCompanyName }) => {
    return (
        <>
            <TransporterField control={control} dispatch={dispatch} />
            <VehicleNumberField control={control} dispatch={dispatch} />
            <InvoiceNumberField control={control} dispatch={dispatch} />
            <FactoryField
                control={control}
                dispatch={dispatch}
                cementCompanyName={cementCompanyName}
            />
            <DateField control={control} />
        </>
    )
}
export default FilterField

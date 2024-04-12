import SelectInput from '../../../form/SelectInput.tsx'
import { ReactElement } from 'react'
import { Control } from 'react-hook-form'
import DateInput from '../../../form/DateInput'

type selectInputType = (
    control: Control,
    values: string[],
    name: string,
    label: string
) => ReactElement
export const selectInput: selectInputType = (control, values, name, label) => {
    return <SelectInput control={control} listValues={values} fieldName={name} label={label} />
}
export type dateInputType = (control: Control, name: string, label: string) => ReactElement
const dateInput: dateInputType = (control, name, label) => {
    return <DateInput control={control} format="DD/MM/YYYY" fieldName={name} label={label} />
}
const expiryDateInput = (control: Control) => {
    return (
        <>
            {dateInput(control, 'insuranceExpiryDate', 'Insurance Expiry Date')}
            {dateInput(control, 'taxExpiryDate', 'Tax Expiry Date')}
        </>
    )
}
const permitDateInput = (control: Control) => {
    return (
        <>
            {dateInput(control, 'npPermitDate', 'Np Permit Date')}
            {dateInput(control, 'fiveYearPermitDate', 'Five Year Permit Date')}
        </>
    )
}
export const combineDateInput = (control: Control) => {
    return (
        <>
            {expiryDateInput(control)}
            {permitDateInput(control)}
            {dateInput(control, 'fcDate', 'FC Date')}
        </>
    )
}

import { FC } from 'react'
import { Control } from 'react-hook-form'
import DateInput from '../../../../form/DateInput'

interface DateFieldProps {
    control: Control
}
export const DateField: FC<DateFieldProps> = ({ control }) => {
    return (
        <>
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="from"
                label="Trip Start Date"
            />
            <DateInput control={control} format="DD/MM/YYYY" fieldName="to" label="Trip End Date" />
        </>
    )
}

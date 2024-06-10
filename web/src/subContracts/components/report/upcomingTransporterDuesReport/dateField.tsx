import React from 'react'
import { Control } from 'react-hook-form'
import DateInput from '../../../../form/DateInput'

interface DateFieldsProps {
    control: Control
}

export const DateFields: React.FC<DateFieldsProps> = ({ control }) => {
    return (
        <>
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="from"
                label="Due Start Date"
            />
            <DateInput control={control} format="DD/MM/YYYY" fieldName="to" label="Due End Date" />
        </>
    )
}

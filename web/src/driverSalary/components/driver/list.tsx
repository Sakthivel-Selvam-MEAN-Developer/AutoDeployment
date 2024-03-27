import React, { ReactElement } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { createDriver } from '../../services/driver.ts'

const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const details = {
        ...data,
        licenseExpriryDate: data.licenseExpriryDate.unix(),
        dateofBirth: data.dateofBirth.unix()
    }
    console.log(details)
    createDriver(details)
}
const CreateDriver: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormFields control={control} />
            <SubmitButton name="Submit" type="submit" />
        </form>
    )
}
export default CreateDriver

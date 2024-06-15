import { FC, ReactElement, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { createDriver } from '../../services/driver.ts'
import { SuccessDialogBox, ClearForm } from './commonUtilities.tsx'
import { DriverType } from './types.tsx'

const CreateDriver: FC = (): ReactElement => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const onSubmit = handleSubmit(async (data) => {
        const details = {
            ...data,
            licenseExpriryDate: data.licenseExpriryDate.unix(),
            dateofBirth: data.dateofBirth.unix()
        }
        await createDriver(details)
            .then(() => {
                ClearForm(setValue)
                setOpenSuccessDialog(true)
            })
            .catch((err) => alert(err.response.data?.error))
    })
    return DriverFields(onSubmit, control, openSuccessDialog, setOpenSuccessDialog)
}
export default CreateDriver
const DriverFields: DriverType = (onSubmit, control, openDialog, setOpenDialog) => {
    return (
        <form onSubmit={onSubmit}>
            <FormFields control={control} />
            <SubmitButton name="Submit" type="submit" />
            <SuccessDialogBox openSuccessDialog={openDialog} setOpenSuccessDialog={setOpenDialog} />
        </form>
    )
}

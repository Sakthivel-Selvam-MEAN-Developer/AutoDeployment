import React, { ReactElement, useState } from 'react'
import { FieldValues, SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { createDriver } from '../../services/driver.ts'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'

const clearForm = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('name', '')
    setValue('fatherName', '')
    setValue('dateofBirth', null)
    setValue('aadharNumber', '')
    setValue('panNumber', '')
    setValue('address', '')
    setValue('mobileNumber', '')
    setValue('driverLicense', '')
    setValue('licenseExpriryDate', null)
    setValue('bankName', '')
    setValue('accountNumber', '')
    setValue('accountBranch', '')
    setValue('ifcsCode', '')
}

const successDialogBox = (
    openSuccessDialog: boolean,
    setOpenSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return (
        <SuccessDialog
            open={openSuccessDialog}
            handleClose={() => setOpenSuccessDialog(false)}
            message="Driver creation is successful"
        />
    )
}

const CreateDriver: React.FC = (): ReactElement => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const details = {
            ...data,
            licenseExpriryDate: data.licenseExpriryDate.unix(),
            dateofBirth: data.dateofBirth.unix()
        }
        await createDriver(details).then(() => {
            setOpenSuccessDialog(true)
            clearForm(setValue)
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormFields control={control} />
            <SubmitButton name="Submit" type="submit" />
            {successDialogBox(openSuccessDialog, setOpenSuccessDialog)}
        </form>
    )
}
export default CreateDriver

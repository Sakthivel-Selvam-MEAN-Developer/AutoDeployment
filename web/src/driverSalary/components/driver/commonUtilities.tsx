import { FC } from 'react'
import { FieldValues, UseFormSetValue } from 'react-hook-form'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { successType } from './types'

export const SuccessDialogBox: FC<successType> = ({ openSuccessDialog, setOpenSuccessDialog }) => {
    return (
        <SuccessDialog
            open={openSuccessDialog}
            handleClose={() => setOpenSuccessDialog(false)}
            message="Driver creation is successful"
        />
    )
}
export const ClearForm = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('name', '')
    setValue('fatherName', '')
    setValue('dateofBirth', null)
    setValue('aadharNumber', '')
    setValue('panNumber', '')
    setValue('address', '')
    setValue('mobileNumber', '')
    clearDetails(setValue)
}
const clearDetails = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('driverLicense', '')
    setValue('licenseExpriryDate', null)
    setValue('bankName', '')
    setValue('accountNumber', '')
    setValue('accountBranch', '')
    setValue('ifcsCode', '')
}

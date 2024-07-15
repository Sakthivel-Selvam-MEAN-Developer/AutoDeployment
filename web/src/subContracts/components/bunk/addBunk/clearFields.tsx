import { UseFormSetValue, FieldValues } from 'react-hook-form'
import { type } from './types'

export const clearFields: type = (setValue) => {
    setValue('bunkName', '')
    setValue('bunkType', '')
    setValue('accountNumber', '')
    setValue('accountHolder', '')
    setValue('location', '')
    clearSubFields(setValue)
}

const clearSubFields = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('accountBranchName', '')
    setValue('contactPersonName', '')
    setValue('contactPersonNumber', '')
    setValue('creditDays', '')
    setValue('mailId', '')
    setValue('ifsc', '')
}

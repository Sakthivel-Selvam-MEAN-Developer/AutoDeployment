import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields, { accountTypeProps } from './formField'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { Box, CircularProgress } from '@mui/material'
import { getAllAccountTypes } from '../../services/accountType'
import { createEmployee } from '../../services/employee'
import dayjs from 'dayjs'

const CreateEmployee: React.FC = (): ReactElement => {
    const [accountTypeName, setAccountType] = useState<string | undefined>('')
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState<boolean>(true)
    const [departmentType, setDepartmentType] = useState('')
    const [designationType, setDesignationType] = useState('')
    const [accountTypes, setAccountTypes] = useState<accountTypeProps[]>([] as accountTypeProps[])
    const [accountTypeNumber, setAccountTypeNumber] = useState<number | string | undefined>(0)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [disable, setDisable] = useState(false)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        setDisable(true)
        createEmployee({
            ...data,
            contactNumber: parseFloat(data.contactNumber),
            dateOfBirth: dayjs(data.dateOfBirth).unix(),
            joiningDate: dayjs(data.joiningDate).unix(),
            accountType: accountTypeNumber?.toString(),
            loginAccess: login
        })
            .then(() => {
                setLoading(false)
                setDisable(false)
            })
            .then(() => setOpenSuccessDialog(true))
            .then(() => clearForm(setValue))
            .catch((error) => {
                setDisable(false)
                alert(error.response.data.error)
                setLoading(false)
            })
    }
    const handleClose = () => setOpenSuccessDialog(false)
    useEffect(() => {
        getAllAccountTypes().then(setAccountTypes)
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields
                    control={control}
                    login={login}
                    setLogin={setLogin}
                    departmentType={departmentType}
                    setDepartmentType={setDepartmentType}
                    designationType={designationType}
                    setDesignationType={setDesignationType}
                    accountTypes={accountTypes}
                    setAccountTypeNumber={setAccountTypeNumber}
                    setAccountType={setAccountType}
                    accountTypeName={accountTypeName}
                />
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <SubmitButton name="Create" type="submit" disabled={disable} />
                )}
            </form>
            <br />
            <br />
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Employee creation is successful"
            />
        </>
    )
}
export default CreateEmployee
type clearType = (setValue: UseFormSetValue<FieldValues>) => void
const clearForm: clearType = (setValue) => {
    clearSubForm(setValue)
}
const clearFormSub = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('panNumber', '')
    setValue('dateOfBirth', null)
    setValue('joiningDate', null)
    setValue('bloodGroup', '')
    setValue('accountName', '')
    setValue('accountNumber', '')
    setValue('ifscCode', '')
    setValue('branch', '')
    setValue('accountType', '')
}
export const clearSubForm = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('name', '')
    setValue('mailId', '')
    setValue('contactNumber', '')
    setValue('corporateId', '')
    setValue('department', '')
    setValue('designation', '')
    setValue('address', '')
    setValue('aadharNumber', '')
    clearFormSub(setValue)
}

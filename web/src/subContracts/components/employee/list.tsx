import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields, { accountTypeProps } from './formField'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { Box, CircularProgress } from '@mui/material'
import { getAllAccountTypes } from '../../services/accountType'
import { createEmployee, updateEmployee } from '../../services/employee'
import dayjs from 'dayjs'
import EmployeeReport from './employeeReport/employeeList'

const CreateEmployee: React.FC = (): ReactElement => {
    const [accountTypeName, setAccountType] = useState<string | undefined>('')
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState<boolean>(true)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [employeeId, setEmployeeId] = useState<number | null>(null)
    const [departmentType, setDepartmentType] = useState('')
    const [designationType, setDesignationType] = useState('')
    const [accountTypes, setAccountTypes] = useState<accountTypeProps[]>([] as accountTypeProps[])
    const [accountTypeNumber, setAccountTypeNumber] = useState<number | string | undefined>(0)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [disable, setDisable] = useState(false)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        setDisable(true)

        const payload = {
            ...data,
            contactNumber: data.contactNumber.toString(),
            dateOfBirth: dayjs(data.dateOfBirth).unix(),
            joiningDate: dayjs(data.joiningDate).unix(),
            accountType: accountTypeNumber?.toString(),
            department: departmentType,
            designation: designationType,
            loginAccess: login
        }

        const submitPromise = editMode
            ? updateEmployee(employeeId, payload)
            : createEmployee(payload)

        submitPromise
            .then(() => {
                setLoading(false)
                setDisable(false)
            })
            .then(() => {
                setOpenSuccessDialog(true)
            })
            .then(() =>
                clearForm(
                    setValue,
                    setDepartmentType,
                    setDesignationType,
                    setAccountTypeNumber,
                    setAccountType,
                    setLogin
                )
            )
            .catch((error) => {
                setDisable(false)
                alert(error?.response?.data?.error)
                setLoading(false)
            })
    }
    const handleClose = () => {
        setOpenSuccessDialog(false)
        setEditMode(false)
    }
    useEffect(() => {
        getAllAccountTypes().then(setAccountTypes)
    }, [])
    const handleEdit = (editedEmployee: any) => {
        setEditMode(true)
        const acc = accountTypes.find((acc) => acc.accountTypeNumber == editedEmployee.accountType)
        setEmployeeId(editedEmployee.id)
        setValue('name', editedEmployee.name)
        setValue('mailId', editedEmployee.mailId)
        setValue('contactNumber', editedEmployee.contactNumber)
        setValue('corporateId', editedEmployee.corporateId)
        setDepartmentType(editedEmployee.department)
        setDesignationType(editedEmployee.designation)
        setValue('address', editedEmployee.address)
        setValue('aadharNumber', editedEmployee.aadharNumber)
        setValue('panNumber', editedEmployee.panNumber)
        setValue('dateOfBirth', dayjs.unix(dayjs(editedEmployee.dateOfBirth, 'DD MMM YYYY').unix()))
        setValue('joiningDate', dayjs.unix(dayjs(editedEmployee.joiningDate, 'DD MMM YYYY').unix()))
        setValue('bloodGroup', editedEmployee.bloodGroup)
        setValue('accountName', editedEmployee.accountName)
        setValue('accountNumber', editedEmployee.accountNumber)
        setValue('ifscCode', editedEmployee.ifscCode)
        setValue('branch', editedEmployee.branch)
        setAccountTypeNumber(editedEmployee.accountType)
        setAccountType(acc?.accountTypeName)
        setLogin(editedEmployee.loginAccess)
    }
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
                    <SubmitButton
                        name={editMode ? 'Update' : 'Create'}
                        type="submit"
                        disabled={disable}
                    />
                )}
            </form>
            <br />
            <br />
            {!loading && <EmployeeReport handleEdit={handleEdit} />}
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message={`Employee ${editMode ? 'Updation' : 'Creation'} is successful`}
            />
        </>
    )
}
export default CreateEmployee
type clearType = (
    setValue: UseFormSetValue<FieldValues>,
    setDepartmentType: React.Dispatch<React.SetStateAction<string>>,
    setDesignationType: React.Dispatch<React.SetStateAction<string>>,
    setAccountTypeNumber: React.Dispatch<React.SetStateAction<number | string | undefined>>,
    setAccountType: React.Dispatch<React.SetStateAction<string | undefined>>,
    setLogin: React.Dispatch<React.SetStateAction<boolean>>
) => void
const clearForm: clearType = (
    setValue,
    setDepartmentType,
    setDesignationType,
    setAccountTypeNumber,
    setAccountType,
    setLogin
) => {
    clearSubForm(
        setValue,
        setDepartmentType,
        setDesignationType,
        setAccountTypeNumber,
        setAccountType,
        setLogin
    )
}
const clearFormSub: clearType = (
    setValue,
    setDepartmentType,
    setDesignationType,
    setAccountTypeNumber,
    setAccountType,
    setLogin
) => {
    setValue('panNumber', '')
    setValue('dateOfBirth', null)
    setValue('joiningDate', null)
    setValue('bloodGroup', '')
    setValue('accountName', '')
    setValue('accountNumber', '')
    setValue('ifscCode', '')
    formClear(
        setValue,
        setDepartmentType,
        setDesignationType,
        setAccountTypeNumber,
        setAccountType,
        setLogin
    )
}
export const formClear: clearType = (
    setValue,
    setDepartmentType,
    setDesignationType,
    setAccountTypeNumber,
    setAccountType,
    setLogin
) => {
    setValue('branch', '')
    setValue('accountType', '')
    setDepartmentType('')
    setDesignationType('')
    setAccountTypeNumber('')
    setAccountType('')
    setLogin(true)
}
export const clearSubForm: clearType = (
    setValue,
    setDepartmentType,
    setDesignationType,
    setAccountTypeNumber,
    setAccountType,
    setLogin
) => {
    setValue('name', '')
    setValue('mailId', '')
    setValue('contactNumber', '')
    setValue('corporateId', '')
    setValue('department', null)
    setValue('designation', null)
    setValue('address', '')
    setValue('aadharNumber', '')
    clearFormSub(
        setValue,
        setDepartmentType,
        setDesignationType,
        setAccountTypeNumber,
        setAccountType,
        setLogin
    )
}

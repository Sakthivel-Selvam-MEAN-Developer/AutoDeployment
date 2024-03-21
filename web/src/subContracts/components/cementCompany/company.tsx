import React, { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import FormFields from './formField'
import { SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import { Box, Button, CircularProgress } from '@mui/material'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { createCompany } from '../../services/cementCompany.ts'

export type FieldValues = {
    name: string
    gstNo: string
    emailId: string
    contactPersonName: string
    contactPersonNumber: string
    address: string
}

const clearForm = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('name', '')
    setValue('gstNo', '')
    setValue('emailId', '')
    setValue('contactPersonName', '')
    setValue('contactPersonNumber', '')
    setValue('address', '')
}
const CreateCompany: React.FC = (): ReactElement => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [loading, setLoading] = useState(false)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        createCompany(data)
            .then(() => setLoading(false))
            .then(() => setOpenSuccessDialog(true))
            .then(() => clearForm(setValue))
            .catch(() => alert('Please provide valid details'))
            .then(() => setLoading(false))
    }
    const handleClose = () => setOpenSuccessDialog(false)
    return (
        <>
            <div style={{ margin: '20px 0', textAlign: 'end' }}>
                <Link to={'/sub/company/factory'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Create Locations
                    </Button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} />
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <SubmitButton name="Create" type="submit" />
                )}
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Company creation is successful"
            />
        </>
    )
}
export default CreateCompany

import React, { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import FormFields from './formField'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import { Button } from '@mui/material'
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

const CreateCompany: React.FC = (): ReactElement => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        createCompany(data).then(() => setOpenSuccessDialog(true))
    }
    const handleClose = () => {
        setOpenSuccessDialog(false)
        navigate('/sub/trip')
    }
    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Link to={'/sub/company/factory'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Create Factory
                    </Button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} />
                <SubmitButton name="Create" type="submit" />
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

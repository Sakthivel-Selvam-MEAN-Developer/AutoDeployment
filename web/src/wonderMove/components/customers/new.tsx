import { useForm, SubmitHandler } from 'react-hook-form'
import { createCustomer } from '../../services/customer.ts'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormFields from './formFields.tsx'
import SubmitButton from '../../../form/button.tsx'

interface FormData {}
export const NewCustomer = () => {
    const { handleSubmit, control } = useForm<FormData>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormData> = (data) => {
        createCustomer(JSON.stringify(data)).then(() => setOpenSuccessDialog(true))
    }
    const handleClose = () => {
        setOpenSuccessDialog(false)
        navigate(-1)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} />
                <SubmitButton name="Save" type="submit" />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Customer creation is successful"
            />
        </>
    )
}

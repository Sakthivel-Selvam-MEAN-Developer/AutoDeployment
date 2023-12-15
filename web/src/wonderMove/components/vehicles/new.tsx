import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { createVehicle } from '../../services/vehicles.ts'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormFields from './formFields.tsx'
import SubmitButton from '../../../form/button.tsx'

export const NewVehicle = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        createVehicle(JSON.stringify(data)).then(() => setOpenSuccessDialog(true))
    }
    const handleClose = () => {
        setOpenSuccessDialog(false)
        navigate(-1)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} listValues={[]} />
                <SubmitButton name="Save" type="submit" />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Vehicle creation is successful"
            />
        </>
    )
}

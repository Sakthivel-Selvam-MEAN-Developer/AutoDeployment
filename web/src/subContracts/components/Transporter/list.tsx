import React, { ReactElement, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { createTransporter } from '../../services/transporter'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
const CreateTransporter: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [gst, setGst] = useState<boolean>(true)
    const [tds, setTds] = useState<boolean>(true)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        createTransporter({
            ...data,
            hasGst: gst ? false : true,
            hasTds: tds ? false : true,
            tdsPercentage: tds ? undefined : parseInt(data.tdsPercentage),
            gstNumber: tds ? undefined : data.gstNumber
        }).then(() => setOpenSuccessDialog(true))
    }
    const handleClose = () => setOpenSuccessDialog(false)
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields control={control} gst={gst} tds={tds} setGst={setGst} setTds={setTds} />
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
export default CreateTransporter

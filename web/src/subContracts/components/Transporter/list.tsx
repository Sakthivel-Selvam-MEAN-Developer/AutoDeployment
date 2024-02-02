import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { createTransporter } from '../../services/transporter'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { getAllAccountTypes } from '../../services/accountType'
const CreateTransporter: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [gst, setGst] = useState<boolean>(true)
    const [tds, setTds] = useState<boolean>(true)
    const [accountTypes, setAccountTypes] = useState([])
    const [accountTypeNumber, setAccountTypeNumber] = useState<number | undefined>(0)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        createTransporter({
            ...data,
            hasGst: gst ? false : true,
            hasTds: tds ? false : true,
            tdsPercentage: tds ? undefined : parseInt(data.tdsPercentage),
            gstNumber: tds ? undefined : data.gstNumber,
            accountTypeNumber
        }).then(() => setOpenSuccessDialog(true))
    }
    const style = { marginBottom: '30px', display: 'flex', justifyContent: 'right' }
    const handleClose = () => setOpenSuccessDialog(false)
    useEffect(() => {
        getAllAccountTypes().then(setAccountTypes)
    }, [])
    return (
        <>
            <div style={style}>
                <Link to={'/sub/transporter/addvehicle'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Add Vehicle
                    </Button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields
                    control={control}
                    gst={gst}
                    tds={tds}
                    setGst={setGst}
                    setTds={setTds}
                    accountTypes={accountTypes}
                    setAccountTypeNumber={setAccountTypeNumber}
                />
                <SubmitButton name="Create" type="submit" />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Transporter creation is successful"
            />
        </>
    )
}
export default CreateTransporter

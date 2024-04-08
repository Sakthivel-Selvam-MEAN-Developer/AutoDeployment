import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { createTransporter } from '../../services/transporter'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { Link } from 'react-router-dom'
import { Box, Button, CircularProgress } from '@mui/material'
import { getAllAccountTypes } from '../../services/accountType'
import TransporterReport from './transporterReport/listTransporter'
const CreateTransporter: React.FC = (): ReactElement => {
    const [accountType, setAccountType] = useState<string | null>('')
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [loading, setLoading] = useState(false)
    const [gst, setGst] = useState<boolean>(true)
    const [transporterType, setTransporterType] = useState('')
    const [tds, setTds] = useState<boolean>(true)
    const [accountTypes, setAccountTypes] = useState([])
    const [accountTypeNumber, setAccountTypeNumber] = useState<number | undefined>(0)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        createTransporter({
            ...data,
            hasGst: gst ? false : true,
            hasTds: tds ? false : true,
            tdsPercentage: tds ? null : parseFloat(parseFloat(data.tdsPercentage).toFixed(2)),
            gstPercentage: gst ? null : parseFloat(parseFloat(data.gstPercentage).toFixed(2)),
            gstNumber: gst ? null : data.gstNumber,
            accountTypeNumber
        })
            .then(() => setLoading(false))
            .then(() => setOpenSuccessDialog(true))
            .then(() => clearForm(setValue, setAccountType, setGst, setTds))
            .catch(() => alert('Error Creating Transporter'))
            .then(() => setLoading(false))
            .then(() => clearForm(setValue, setAccountType, setGst, setTds))
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
                    setTransporterType={setTransporterType}
                    transporterType={transporterType}
                    setGst={setGst}
                    setTds={setTds}
                    accountTypes={accountTypes}
                    setAccountTypeNumber={setAccountTypeNumber}
                    setAccountType={setAccountType}
                    accountType={accountType}
                />
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <SubmitButton name="Create" type="submit" />
                )}
            </form>
            <br />
            <br />
            {!loading && <TransporterReport />}
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Transporter creation is successful"
            />
        </>
    )
}
export default CreateTransporter

const clearForm = (
    setValue: UseFormSetValue<FieldValues>,
    setAccountType: React.Dispatch<React.SetStateAction<string | null>>,
    setGst: React.Dispatch<React.SetStateAction<boolean>>,
    setTds: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setValue('name', '')
    setValue('emailId', '')
    setValue('contactPersonName', '')
    setValue('contactPersonNumber', '')
    setValue('accountHolder', '')
    setValue('accountNumber', '')
    setValue('address', '')
    setValue('gstNumber', '')
    setValue('gstPercentage', '')
    setValue('tdsPercentage', '')
    setValue('ifsc', '')
    setAccountType('')
    setValue('csmName', '')
    setGst(true)
    setTds(true)
}

import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields, { accountTypeProps } from './formField'
import { createTransporter } from '../../services/transporter'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { Link } from 'react-router-dom'
import { Box, Button, CircularProgress } from '@mui/material'
import { getAllAccountTypes } from '../../services/accountType'
import TransporterReport from './transporterReport/listTransporter'
const CreateTransporter: React.FC = (): ReactElement => {
    const [accountType, setAccountType] = useState<string | undefined>('')
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [loading, setLoading] = useState(false)
    const [gst, setGst] = useState<boolean>(true)
    const [transporterType, setTransporterType] = useState('')
    const [tds, setTds] = useState<boolean>(true)
    const [accountTypes, setAccountTypes] = useState<accountTypeProps[]>([] as accountTypeProps[])
    const [accountTypeNumber, setAccountTypeNumber] = useState<number | undefined>(0)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [disable, setDisable] = useState(false)
    const [transpoterId, setTranspoterId] = useState<number>(0)
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        setLoading(true)
        setDisable(true)
        createTransporter({
            ...data,
            id: transpoterId,
            hasGst: gst ? false : true,
            hasTds: tds ? false : true,
            tdsPercentage: tds ? null : parseFloat(parseFloat(data.tdsPercentage).toFixed(2)),
            gstPercentage: gst ? null : parseFloat(parseFloat(data.gstPercentage).toFixed(2)),
            gstNumber: gst ? null : data.gstNumber,
            accountTypeNumber,
            transporterType
        })
            .then(() => {
                setLoading(false)
                setDisable(false)
            })
            .then(() => setOpenSuccessDialog(true))
            .then(() => clearForm(setValue, setAccountType, setGst, setTds, setTransporterType))
            .catch((error) => {
                setDisable(false)
                alert(error.response.data.error)
                setLoading(false)
            })
    }
    const style = {
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'right',
        textDecoration: 'none'
    }
    const handleClose = () => setOpenSuccessDialog(false)
    useEffect(() => {
        getAllAccountTypes().then(setAccountTypes)
    }, [])
    const handleEdit = (editedTransporter: any) => {
        const acc = accountTypes.find(
            (acc) => acc.accountTypeNumber === editedTransporter.accountTypeNumber
        )
        console.log(editedTransporter)
        setTranspoterId(editedTransporter.id)
        setValue('name', editedTransporter.name)
        setValue('emailId', editedTransporter.emailId)
        setValue('contactPersonName', editedTransporter.contactPersonName)
        setValue('contactPersonNumber', editedTransporter.contactPersonNumber)
        setValue('accountHolder', editedTransporter.accountHolder)
        setValue('accountNumber', editedTransporter.accountNumber)
        setValue('branchName', editedTransporter.branchName)
        setValue('ifsc', editedTransporter.ifsc)
        setValue('address', editedTransporter.address)
        setValue('csmName', editedTransporter.csmName)
        setTransporterType(editedTransporter.transporterType)
        setAccountType(acc?.accountTypeName)
        setAccountTypeNumber(editedTransporter.accountTypeNumber)
        setGst(!editedTransporter.hasGst)
        setTds(!editedTransporter.hasTds)
        if (editedTransporter.hasGst) {
            setValue('gstNumber', editedTransporter.gstNumber)
            setValue('gstPercentage', editedTransporter.gstPercentage)
        } else {
            setValue('gstNumber', '')
            setValue('gstPercentage', '')
        }
        if (editedTransporter.hasTds) {
            setValue('tdsPercentage', editedTransporter.tdsPercentage)
        } else {
            setValue('tdsPercentage', '')
        }
    }
    return (
        <>
            <Link to={'/sub/transporter/addvehicle'} style={style}>
                <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                    Add Vehicle
                </Button>
            </Link>

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
                    <SubmitButton name="Create / Update" type="submit" disabled={disable} />
                )}
            </form>
            <br />
            <br />
            {!loading && <TransporterReport handleEdit={handleEdit} />}
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={handleClose}
                message="Transporter creation is successful"
            />
        </>
    )
}
export default CreateTransporter
type clearType = (
    setValue: UseFormSetValue<FieldValues>,
    setAccountType: React.Dispatch<React.SetStateAction<string | undefined>>,
    setGst: React.Dispatch<React.SetStateAction<boolean>>,
    setTds: React.Dispatch<React.SetStateAction<boolean>>,
    setTransporterType: React.Dispatch<React.SetStateAction<string>>
) => void
const clearForm: clearType = (setValue, setAccountType, setGst, setTds, setTransporterType) => {
    clearSubForm(setValue)
    setValue('gstPercentage', '')
    setValue('tdsPercentage', '')
    setValue('ifsc', '')
    setAccountType('')
    setValue('csmName', '')
    setValue('branchName', '')
    setGst(true)
    setTds(true)
    setTransporterType('')
}
const clearSubForm = (setValue: UseFormSetValue<FieldValues>) => {
    setValue('name', '')
    setValue('emailId', '')
    setValue('contactPersonName', '')
    setValue('contactPersonNumber', '')
    setValue('accountHolder', '')
    setValue('accountNumber', '')
    setValue('address', '')
    setValue('gstNumber', '')
}

import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import { updateAcknowledgementStatus, closeTrip } from '../../services/acknowledgement'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AcknowledgementLocation } from './acknowledgeLocation'
import { FormFieldProps } from './types'
import { epochToDate } from '../../../commonUtils/epochToTime'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface dateProps {
    $d: number
}
const AddAcknowledgement: React.FC<FormFieldProps> = ({
    tripDetails,
    setRender,
    render
}): ReactElement => {
    const { handleSubmit } = useForm<FieldValues>()
    const [tripStatus, setTripStatus] = useState<boolean>(false)
    const [acknowledgeDueTime, setAcknowledgeDueTime] = useState<number>(0)
    const [unload, setUnload] = useState<number | null>(null)
    const [approvalType, setApprovalType] = useState<string | null>('')
    const [reason, setReason] = useState<string>('')
    const [shortageAmount, setShortageAmount] = useState<number>(0)
    const [shortageQuantity, setShortageQuantity] = useState<number>(0)
    const [unloadedDate, setUnloadedDate] = useState<Date | null>(null)

    const style = {
        padding: ' 0 20px 20px 20px',
        margin: '30px 20%',
        display: 'grid',
        border: '1px solid #cbcbcb',
        borderRadius: '7px'
    }
    const currentTime = dayjs().unix()
    const finalDue = async (id: number) => {
        await updateAcknowledgementStatus(id)
        setRender(!render)
    }
    const filledLoad =
        tripDetails.loadingPointToUnloadingPointTrip !== null
            ? tripDetails.loadingPointToUnloadingPointTrip.filledLoad
            : tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip.filledLoad
    useEffect(() => {
        if (unload !== null) {
            setShortageQuantity(filledLoad * 1000 - unload)
            setShortageAmount(shortageAmt(approvalType, unload))
        } else setShortageQuantity(filledLoad * 1000)
    }, [unload, approvalType, filledLoad])
    const shortageAmt = (approvalType: string | null, unload: number) => {
        return approvalType === 'Acceptable'
            ? 0
            : filledLoad * 1000 - unload > 100
              ? (filledLoad * 1000 - unload) * 8
              : 0
    }
    useEffect(() => {
        setTripStatus(
            tripDetails.loadingPointToUnloadingPointTrip !== null
                ? tripDetails.loadingPointToUnloadingPointTrip.tripStatus
                : tripDetails.stockPointToUnloadingPointTrip.tripStatus
        )
        setAcknowledgeDueTime(
            tripDetails.loadingPointToUnloadingPointTrip !== null
                ? tripDetails.loadingPointToUnloadingPointTrip.acknowledgeDueTime
                : tripDetails.stockPointToUnloadingPointTrip.acknowledgeDueTime
        )
    }, [tripDetails, render])
    const handleCloseTrip: SubmitHandler<FieldValues> = async () => {
        const date = dayjs((unloadedDate as unknown as dateProps)?.$d).format('DD/MM/YYYY')
        const details = {
            overallTripId: tripDetails.id,
            shortageQuantity,
            shortageAmount,
            approvalStatus: approvalType === 'Acceptable' ? true : false,
            reason,
            filledLoad: filledLoad * 1000,
            unloadedQuantity: unload,
            unloadedDate: dayjs(date, 'DD/MM/YYYY').unix()
        }
        await closeTrip(details)
        setRender(!render)
    }
    return (
        <div style={style}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'left',
                    alignItems: 'center',
                    fontSize: '20px',
                    fontWeight: '600'
                }}
            >
                <p style={{ marginRight: '10px   ' }}>
                    {tripDetails.stockPointToUnloadingPointTrip !== null
                        ? tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                              .truck.transporter.name
                        : tripDetails.loadingPointToUnloadingPointTrip.truck.transporter.name}
                </p>
                <span>-</span>
                <p style={{ marginLeft: '10px   ' }}>
                    {tripDetails.stockPointToUnloadingPointTrip !== null
                        ? tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                              .truck.vehicleNumber
                        : tripDetails.loadingPointToUnloadingPointTrip.truck.vehicleNumber}
                </p>
            </div>
            <hr
                style={{
                    margin: '0',
                    width: '100%',
                    border: 'none',
                    height: '1px',
                    backgroundColor: '#cbcbcb'
                }}
            />
            {tripDetails.stockPointToUnloadingPointTrip !== null &&
                AcknowledgementLocation(
                    tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                        .loadingPoint.name,
                    tripDetails.stockPointToUnloadingPointTrip.unloadingPoint.name,
                    tripDetails.stockPointToUnloadingPointTrip.startDate,
                    tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                        .filledLoad,
                    tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                        .invoiceNumber
                )}
            {tripDetails.loadingPointToUnloadingPointTrip !== null &&
                AcknowledgementLocation(
                    tripDetails.loadingPointToUnloadingPointTrip.loadingPoint.name,
                    tripDetails.loadingPointToUnloadingPointTrip.unloadingPoint.name,
                    tripDetails.loadingPointToUnloadingPointTrip.startDate,
                    tripDetails.loadingPointToUnloadingPointTrip.filledLoad,
                    tripDetails.loadingPointToUnloadingPointTrip.invoiceNumber
                )}
            <hr
                style={{
                    margin: '0',
                    width: '100%',
                    border: 'none',
                    height: '1px',
                    backgroundColor: '#cbcbcb'
                }}
            />
            {!tripStatus ? (
                <form
                    style={{ display: 'grid', alignItems: 'center', marginTop: '20px' }}
                    onSubmit={handleSubmit(handleCloseTrip)}
                >
                    <h3 style={{ fontWeight: 'normal' }}>Unload the Active Trip</h3>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <TextField
                            value={unload}
                            type="number"
                            label="Unload Quantity"
                            variant="outlined"
                            sx={{ m: 0, width: '200px', margin: '10px 20px 10px 0' }}
                            onChange={({ target: { value } }) => {
                                if (parseInt(value) <= filledLoad * 1000) setUnload(parseInt(value))
                                else if (value === '') setUnload(null)
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">KG</InputAdornment>
                            }}
                        />
                        <TextField
                            sx={{ width: '200px', margin: '10px 20px 10px 0' }}
                            id="outlined-basic"
                            label="Shortage Quantity"
                            variant="outlined"
                            value={unload === 0 ? 0 : shortageQuantity}
                            type="number"
                            aria-readonly
                            InputProps={{
                                endAdornment: <InputAdornment position="start">KG</InputAdornment>
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-in">
                            <DatePicker
                                label="Unloaded Date"
                                value={unloadedDate}
                                onChange={(newValue) => setUnloadedDate(newValue)}
                            />
                        </LocalizationProvider>
                        <Autocomplete
                            sx={{ width: '200px', margin: '10px 20px 10px 0' }}
                            value={approvalType}
                            options={['Acceptable', 'Rejectable']}
                            onChange={(_event, newValue) => {
                                setApprovalType(newValue)
                                setReason('')
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Approval Type" />
                            )}
                        />
                        <TextField
                            sx={{ width: '200px', margin: '10px 20px 10px 0' }}
                            id="outlined-basic"
                            label="Reason for Rejection"
                            variant="outlined"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            disabled={approvalType !== 'Rejectable'}
                        />
                        <TextField
                            sx={{ width: '200px', marginRight: '20px' }}
                            id="outlined-basic"
                            label="Shortage Amount"
                            variant="outlined"
                            value={approvalType === 'Rejectable' ? shortageAmount : 0}
                            type="number"
                            aria-readonly
                            InputProps={{
                                endAdornment: <InputAdornment position="start">RS</InputAdornment>
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button
                            disabled={
                                unload === null ||
                                unloadedDate === null ||
                                unload === 0 ||
                                approvalType === '' ||
                                approvalType === 'Rejectable'
                                    ? reason === ''
                                    : false
                            }
                            style={{ width: 'fit-content' }}
                            color="secondary"
                            variant="contained"
                            type="submit"
                        >
                            Unload
                        </Button>
                    </div>
                </form>
            ) : (
                <div>
                    <p>Waiting for Acknowledgement...</p>
                </div>
            )}
            {!tripDetails.acknowledgementStatus ? (
                tripStatus &&
                (currentTime > acknowledgeDueTime ? (
                    <div style={{ display: 'grid', alignItems: 'center' }}>
                        <h3 style={{ fontWeight: 'normal' }}>Add Acknowledgement for the Trip</h3>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'left'
                            }}
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                type="button"
                                onClick={() => finalDue(tripDetails.id)}
                            >
                                Close Trip
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p>Can add Acknowledgement Details after {epochToDate(acknowledgeDueTime)}</p>
                ))
            ) : (
                <p>Trip Closed...</p>
            )}
        </div>
    )
}
export default AddAcknowledgement

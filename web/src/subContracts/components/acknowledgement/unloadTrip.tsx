import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import { closeTrip } from '../../services/acknowledgement'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AcknowledgementLocation } from './acknowledgeLocation'
import { FormFieldProps } from './types'
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface dateProps {
    $d: number
}
const UnloadTrip: React.FC<FormFieldProps> = ({ tripDetails, setRender, render }): ReactElement => {
    const { handleSubmit } = useForm<FieldValues>()
    const [tripStatus, setTripStatus] = useState<boolean>(false)
    const [unload, setUnload] = useState<number | null>(null)
    const [approvalType, setApprovalType] = useState<string | null>('')
    const [reason, setReason] = useState<string>('')
    const [shortageAmount, setShortageAmount] = useState<number>(0)
    const [shortageQuantity, setShortageQuantity] = useState<number>(0)
    const [unloadedDate, setUnloadedDate] = useState<Date | null>(null)
    const [unloadingKilometer, setUnloadingKilometer] = useState<number>(0)
    const style = {
        padding: ' 0 20px 20px 20px',
        margin: '30px 20%',
        display: 'grid',
        border: '1px solid #cbcbcb',
        borderRadius: '7px'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            unloadedDate: dayjs(date, 'DD/MM/YYYY').unix(),
            unloadingKilometer
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
                            sx={{ width: '150px', margin: '10px 20px 10px 0' }}
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
                            sx={{ width: '150px', margin: '10px 20px 10px 0' }}
                            id="outlined-basic"
                            label="Reason for Rejection"
                            variant="outlined"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            disabled={approvalType !== 'Rejectable'}
                        />
                        <TextField
                            sx={{ width: '150px', marginRight: '20px' }}
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
                        {(tripDetails.stockPointToUnloadingPointTrip !== null
                            ? tripDetails.stockPointToUnloadingPointTrip
                                  .loadingPointToStockPointTrip.truck.transporter
                                  .transporterType === 'Own'
                            : tripDetails.loadingPointToUnloadingPointTrip.truck.transporter
                                  .transporterType === 'Own') && (
                            <TextField
                                label="Unloading Kilometer"
                                name="kilometer"
                                type="number"
                                sx={{ width: '200px' }}
                                inputProps={{
                                    pattern: '[0-9]{6}',
                                    title: 'Please enter exactly 6 digits.',
                                    min: 0,
                                    max: 999999
                                }}
                                value={unloadingKilometer}
                                onChange={(e) => setUnloadingKilometer(parseInt(e.target.value))}
                            />
                        )}
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
        </div>
    )
}
export default UnloadTrip

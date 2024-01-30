import React, { ReactElement, useEffect, useState } from 'react'
import { FormFieldProps } from './types'
import { Autocomplete, Button, InputAdornment, TextField } from '@mui/material'
import { updateAcknowledgementStatus, closeTrip } from '../../services/acknowledgement'
import AcknowledgementLocation from './acknowledgeLocation'
import dayjs from 'dayjs'
import { epochToDate } from '../../../commonUtils/epochToTime'

const AddAcknowledgement: React.FC<FormFieldProps> = ({
    tripDetails,
    setRender,
    render
}): ReactElement => {
    const [tripStatus, setTripStatus] = useState<boolean>(false)
    const [acknowledgeDueTime, setAcknowledgeDueTime] = useState<number>(0)
    const [unload, setUnload] = useState<number | null>(null)
    const [approvalType, setApprovalType] = useState<string | null>('')
    const [reason, setReason] = useState<string>('')
    const [shortageAmount, setShortageAmount] = useState<number>(0)
    const [shortageQuantity, setShortageQuantity] = useState<number>(0)
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
            setShortageAmount(
                approvalType === 'Acceptable'
                    ? 0
                    : filledLoad * 1000 - unload > 100
                      ? (filledLoad * 1000 - unload) * 8
                      : 0
            )
        } else setShortageQuantity(filledLoad * 1000)
    }, [unload, approvalType])
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
    const handleCloseTrip = async () => {
        const details = {
            overallTripId: tripDetails.id,
            shortageQuantity,
            shortageAmount,
            approvalStatus: approvalType === 'Acceptable' ? true : false,
            reason,
            filledLoad: filledLoad * 1000,
            unloadedQuantity: unload
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
                <div style={{ display: 'grid', alignItems: 'center', marginTop: '20px' }}>
                    <h3 style={{ fontWeight: 'normal' }}>Close the Active Trip</h3>
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
                            onClick={handleCloseTrip}
                        >
                            Close Trip
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Trip Closed</p>
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
                                Create Due
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p>Can add Acknowledgement Details after {epochToDate(acknowledgeDueTime)}</p>
                ))
            ) : (
                <p>Acknowledgement Added</p>
            )}
        </div>
    )
}
export default AddAcknowledgement

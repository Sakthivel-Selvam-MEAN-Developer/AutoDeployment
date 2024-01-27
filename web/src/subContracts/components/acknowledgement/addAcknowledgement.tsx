import React, { ReactElement, useEffect, useState } from 'react'
import { FormFieldProps } from './types'
import { Button, InputAdornment, TextField } from '@mui/material'
import { updateAcknowledgementStatus, closeTrip } from '../../services/acknowledgement'
import AcknowledgementLocation from './acknowledgeLocation'
import dayjs from 'dayjs'
import { epochToDate } from '../../../commonUtils/epochToTime'

const AddAcknowledgement: React.FC<FormFieldProps> = ({ tripDetails }): ReactElement => {
    const [tripStatus, setTripStatus] = useState<boolean>(false)
    const [acknowledgeDueTime, setAcknowledgeDueTime] = useState<number>(0)
    const [unload, setUnload] = useState<number>(0)
    const style = {
        padding: ' 0 20px 20px 20px',
        margin: '30px 20%',
        display: 'grid',
        border: '1px solid #cbcbcb',
        borderRadius: '7px'
    }
    const currentTime = dayjs().unix()
    const finalDue = (id: number) => {
        updateAcknowledgementStatus(id)
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
    }, [tripDetails])
    return (
        <div style={style}>
            <p style={{ fontSize: '20px' }}>
                {tripDetails.stockPointToUnloadingPointTrip !== null
                    ? tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip.truck
                          .vehicleNumber
                    : tripDetails.loadingPointToUnloadingPointTrip.truck.vehicleNumber}
            </p>
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
                    tripDetails.stockPointToUnloadingPointTrip.startDate
                )}
            {tripDetails.loadingPointToUnloadingPointTrip !== null &&
                AcknowledgementLocation(
                    tripDetails.loadingPointToUnloadingPointTrip.loadingPoint.name,
                    tripDetails.loadingPointToUnloadingPointTrip.unloadingPoint.name,
                    tripDetails.loadingPointToUnloadingPointTrip.startDate
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            type="number"
                            label="Unload Quantity"
                            sx={{ m: 0, width: '25ch' }}
                            onChange={({ target: { value } }) => setUnload(parseInt(value))}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">Ton</InputAdornment>
                            }}
                            variant="outlined"
                        />
                        <Button
                            style={{ marginLeft: '75px', display: 'flex' }}
                            color="secondary"
                            variant="contained"
                            type="submit"
                            onClick={async () =>
                                await closeTrip({ id: tripDetails.id, unload: unload })
                            }
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
            {tripStatus &&
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
                ))}
        </div>
    )
}
export default AddAcknowledgement

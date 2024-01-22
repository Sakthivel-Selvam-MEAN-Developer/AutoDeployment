import React, { ReactElement, useState } from 'react'
import { FormFieldProps } from './types'
import { Button, InputAdornment, TextField } from '@mui/material'
import { updateAcknowledgementStatus } from '../../services/acknowledgement'
import { closeTrip } from '../../services/acknowledgement'

const AddAcknowledgement: React.FC<FormFieldProps> = ({ tripDetails }): ReactElement => {
    const finalDue = (id: number) => {
        updateAcknowledgementStatus(id)
    }
    const [unload, setUnload] = useState<number>(0)
    return (
        <>
            <p>
                {tripDetails.stockPointToUnloadingPointTrip !== null
                    ? tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip.truck
                          .vehicleNumber
                    : tripDetails.loadingPointToUnloadingPointTrip.truck.vehicleNumber}
            </p>
            {tripDetails.stockPointToUnloadingPointTrip !== null && (
                <p>
                    <span>
                        {
                            tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
                                .loadingPoint.name
                        }
                    </span>
                    -<span>{tripDetails.stockPointToUnloadingPointTrip.unloadingPoint.name}</span>
                </p>
            )}
            {tripDetails.loadingPointToUnloadingPointTrip !== null && (
                <p>
                    <span>{tripDetails.loadingPointToUnloadingPointTrip.loadingPoint.name}</span>-
                    <span>{tripDetails.loadingPointToUnloadingPointTrip.unloadingPoint.name}</span>
                </p>
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Close the active trip :</p>
                <TextField
                    type="number"
                    label="Unload Quantity"
                    sx={{ m: 1, width: '25ch' }}
                    onChange={({ target: { value } }) => setUnload(parseInt(value))}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">Ton</InputAdornment>
                    }}
                    variant="outlined"
                />
                <Button
                    style={{ marginLeft: '20px', display: 'flex' }}
                    color="secondary"
                    variant="contained"
                    type="submit"
                    onClick={async () => await closeTrip({ id: tripDetails.id, unload: unload })}
                >
                    Close Trip
                </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Add Acknowledgement for the Trip :</p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        color="secondary"
                        variant="contained"
                        type="button"
                        onClick={() => finalDue(tripDetails.id)}
                        sx={{ marginLeft: '20px' }}
                    >
                        Create Due
                    </Button>
                </div>
            </div>
        </>
    )
}
export default AddAcknowledgement

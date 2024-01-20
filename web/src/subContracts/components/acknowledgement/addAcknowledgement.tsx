import React, { ReactElement } from 'react'
import SubmitButton from '../../../form/button'
import { FormFieldProps } from './types'
import { Button } from '@mui/material'
import { updateAcknowledgementStatus } from '../../services/acknowledgement'

const AddAcknowledgement: React.FC<FormFieldProps> = ({ tripDetails }): ReactElement => {
    const finalDue = (id: number) => {
        updateAcknowledgementStatus(id)
    }
    return (
        <>
            <p>
                {tripDetails.loadingPointToStockPointTrip !== null
                    ? tripDetails.loadingPointToStockPointTrip.truck.vehicleNumber
                    : tripDetails.loadingPointToUnloadingPointTrip.truck.vehicleNumber}{' '}
            </p>
            {tripDetails.loadingPointToStockPointTrip !== null && (
                <p>
                    <span>{tripDetails.loadingPointToStockPointTrip.loadingPoint.name}</span>-
                    <span>{tripDetails.loadingPointToStockPointTrip.stockPoint.name}</span>
                </p>
            )}
            {tripDetails.loadingPointToUnloadingPointTrip !== null && (
                <p>
                    <span>{tripDetails.loadingPointToUnloadingPointTrip.loadingPoint.name}</span>-
                    <span>{tripDetails.loadingPointToUnloadingPointTrip.unloadingPoint.name}</span>
                </p>
            )}
            <div>
                <p>Close the active trip :</p>
                <SubmitButton name="Close" type="submit" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {' '}
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

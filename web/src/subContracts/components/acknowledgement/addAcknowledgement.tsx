import React, { ReactElement } from 'react'
import { Button } from '@mui/material'
import { closeTrip } from '../../services/acknowledgement'
interface FormFieldProps {
    tripDetails: {
        id: number
        loadingPointToStockPointTrip: {
            truck: {
                vehicleNumber: string
            }
            loadingPoint: {
                name: string
            }
            stockPoint: {
                name: string
            }
        }
        loadingPointToUnloadingPointTrip: {
            truck: {
                vehicleNumber: string
            }
            loadingPoint: {
                name: string
            }
            unloadingPoint: {
                name: string
            }
        }
    }
}
const AddAcknowledgement: React.FC<FormFieldProps> = ({ tripDetails }): ReactElement => {
    return (
        <>
            <p>
                {tripDetails.loadingPointToStockPointTrip !== null
                    ? tripDetails.loadingPointToStockPointTrip.truck.vehicleNumber
                    : tripDetails.loadingPointToUnloadingPointTrip.truck.vehicleNumber}
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
                <p>Close the active trip</p>:
                <Button
                    style={{ marginLeft: '20px', display: 'flex' }}
                    color="secondary"
                    variant="contained"
                    type="submit"
                    onClick={async () => await closeTrip({ id: tripDetails.id })}
                >
                    Close Trip
                </Button>
            </div>
            <div>
                <p>Add Acknowledgement for the Trip</p>:
                <Button
                    style={{ marginLeft: '20px', display: 'flex' }}
                    color="secondary"
                    variant="contained"
                    type="submit"
                >
                    Create Due
                </Button>
            </div>
        </>
    )
}
export default AddAcknowledgement

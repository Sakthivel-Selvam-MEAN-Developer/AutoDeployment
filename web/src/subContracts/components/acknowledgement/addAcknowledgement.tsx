import React, { ReactElement } from 'react'
import SubmitButton from '../../../form/button'
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
                <p>Close the active trip</p>:
                <SubmitButton name="Close" type="submit" />
            </div>
            <div>
                {' '}
                <p>Add Acknowledgement for the Trip</p>:
                <SubmitButton name="Create Due" type="submit" />
            </div>
        </>
    )
}
export default AddAcknowledgement

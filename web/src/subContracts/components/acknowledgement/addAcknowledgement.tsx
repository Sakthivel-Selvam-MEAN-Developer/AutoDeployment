import { Button } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    getAllTripByAcknowledgementStatus,
    getTripById,
    updateAcknowledgementStatus
} from '../../services/acknowledgement'
import { epochToDate } from '../../../commonUtils/epochToTime'
import dayjs from 'dayjs'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import { tripdetailsProps } from './types'

const AddAcknowledgement: React.FC = () => {
    const currentTime = dayjs().unix()
    const { handleSubmit, control } = useForm<FieldValues>()
    const [acknowledgeDueTime, setAcknowledgeDueTime] = useState<number>()
    const [vehicleslist, setVehicleslist] = useState([])
    const [vehicleNumber, setVehicleNumber] = useState<string>('')
    const [tripId, setTripId] = useState<number>(0)
    const [tripClosed, setTripClosed] = useState<boolean>(false)
    const [tripDetails, setTripDetails] = useState<tripdetailsProps | null>(null)
    const finalDue = async (id: number) => {
        await updateAcknowledgementStatus(id).catch(() => alert('Trip Not Closed'))
        setTripClosed(true)
    }
    const onSubmit: SubmitHandler<FieldValues> = () => {
        setTripClosed(false)
        if (tripId !== 0) getTripById(tripId).then(setTripDetails)
    }
    useEffect(() => {
        getAllTripByAcknowledgementStatus().then(setVehicleslist)
    }, [])
    useEffect(() => {
        if (tripDetails !== null)
            setAcknowledgeDueTime(findTripType(tripDetails)?.acknowledgeDueTime)
    }, [tripDetails])
    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AutoCompleteWithValue
                        control={control}
                        value={vehicleNumber}
                        fieldName="vehicleList"
                        label="Select Vehicle for Acknowledgement"
                        options={vehicleslist.map((trip: tripdetailsProps) => {
                            const vehicleNumber = findTripType(trip)
                            return `${vehicleNumber?.truck.vehicleNumber} ${vehicleNumber?.invoiceNumber}`
                        })}
                        onChange={onChangeForVehicleList(vehicleslist, setTripId, setVehicleNumber)}
                    />
                    <SubmitButton name="Submit" type="submit" />
                </form>
            </div>
            <div>
                {!tripClosed &&
                    acknowledgeDueTime &&
                    tripDetails &&
                    !tripDetails.acknowledgementStatus &&
                    (currentTime > acknowledgeDueTime ? (
                        <div style={{ display: 'grid', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: 'normal' }}>
                                Add Acknowledgement for the Trip
                            </h3>
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
                                    Acknowledgement Received
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <p>
                            Can add Acknowledgement Details after {epochToDate(acknowledgeDueTime)}
                        </p>
                    ))}
                <div>
                    {tripClosed && <p>Trip Closed...</p>}
                    {acknowledgeDueTime === null && <p>Trip should be Unloaded</p>}
                </div>
            </div>
        </>
    )
}
export default AddAcknowledgement
type onChangeType = (
    vehicleslist: never[],
    setTripId: React.Dispatch<React.SetStateAction<number>>,
    setVehicleNumber: React.Dispatch<React.SetStateAction<string>>
) => void

const onChangeForVehicleList: onChangeType = (vehicleslist, setTripId, setVehicleNumber) => {
    return (_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
        const { id } = vehicleslist.find((trip) => {
            return findTripType(trip)?.truck.vehicleNumber === newValue.split(' ')[0]
        }) || { id: 0 }
        setTripId(id)
        setVehicleNumber(newValue)
    }
}

function findTripType(tripDetails: tripdetailsProps) {
    if (tripDetails && tripDetails.stockPointToUnloadingPointTrip !== null) {
        return tripDetails.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip
    } else if (tripDetails && tripDetails.loadingPointToUnloadingPointTrip !== null) {
        return tripDetails.loadingPointToUnloadingPointTrip
    }
}

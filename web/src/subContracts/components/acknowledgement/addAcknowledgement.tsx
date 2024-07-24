import { Button } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    getAllTripByAcknowledgementStatus,
    getTripById,
    updateAcknowledgementStatus,
    uploadAcknowledgementFile
} from '../../services/acknowledgement'
import { epochToDate } from '../../../commonUtils/epochToTime'
import dayjs from 'dayjs'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import { tripdetailsProps } from './types'
import { DueDateDialog } from './AcknowledgementDialog'
import FileUpload from './upload'

const AddAcknowledgement: React.FC = () => {
    const currentTime = dayjs().unix()
    const { handleSubmit, control } = useForm<FieldValues>()
    const [acknowledgeDueTime, setAcknowledgeDueTime] = useState<number>()
    const [vehicleslist, setVehicleslist] = useState([])
    const [vehicleNumber, setVehicleNumber] = useState<string>('')
    const [tripId, setTripId] = useState<number>(0)
    const [tripClosed, setTripClosed] = useState<boolean>(false)
    const [tripDetails, setTripDetails] = useState<tripdetailsProps | null>(null)
    const [disable, setDisable] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const finalDue = async (id: number) => {
        console.log(selectedFile?.size)
        selectedFile &&
            (await updateAcknowledgementStatus(id)
                .then(() => uploadAcknowledgement())
                .then(() => {
                    setTripClosed(true)
                    setSelectedFile(null)
                })
                .catch(() => alert('Trip Not Closed')))
        if (!selectedFile) {
            alert('No file selected')
            return
        }
    }
    const uploadAcknowledgement = async () => {
        if (!selectedFile) {
            console.error('No file selected')
            return
        }
        const formData = new FormData()
        formData.append('image', selectedFile)
        formData.append('id', tripId.toString())
        try {
            await uploadAcknowledgementFile(formData)
        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = () => {
        setTripClosed(false)
        if (tripId !== 0) {
            setDisable(true)
            getTripById(tripId)
                .then(setTripDetails)
                .then(() => setDisable(false))
                .catch(() => setDisable(false))
        }
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
                        options={
                            vehicleslist.length !== 0
                                ? vehicleslist.map((trip: tripdetailsProps) => {
                                      let vehicleNumber = findTripType(trip)
                                      if (
                                          vehicleNumber?.loadingPointToStockPointTrip !== undefined
                                      ) {
                                          vehicleNumber =
                                              vehicleNumber?.loadingPointToStockPointTrip
                                      }
                                      return `${trip?.truck.vehicleNumber}-${vehicleNumber?.invoiceNumber}`
                                  })
                                : []
                        }
                        onChange={onChangeForVehicleList(
                            vehicleslist,
                            setTripId,
                            setVehicleNumber,
                            setTripDetails
                        )}
                    />

                    <SubmitButton name="Submit" type="submit" disabled={disable} />
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
                            <FileUpload
                                selectedFile={selectedFile}
                                setSelectedFile={setSelectedFile}
                            />
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
                    {tripClosed && <DueDateDialog tripClosed={tripClosed} />}
                    {tripClosed && <p>Trip Closed...</p>}
                </div>
            </div>
        </>
    )
}
export default AddAcknowledgement
type onChangeType = (
    vehicleslist: tripdetailsProps[],
    setTripId: React.Dispatch<React.SetStateAction<number>>,
    setVehicleNumber: React.Dispatch<React.SetStateAction<string>>,
    setTripDetails: React.Dispatch<React.SetStateAction<tripdetailsProps | null>>
) => void

const onChangeForVehicleList: onChangeType = (
    vehicleslist,
    setTripId,
    setVehicleNumber,
    setTripDetails
) => {
    return (_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
        setVehicleNumber('')
        setTripDetails(null)
        setTripId(0)
        const { id } = vehicleslist.find((trip) => {
            let tripType = findTripType(trip)
            if (tripType?.loadingPointToStockPointTrip !== undefined)
                tripType = tripType?.loadingPointToStockPointTrip
            return (
                trip?.truck?.vehicleNumber === newValue.split(/-(.*)/s)[0] &&
                tripType?.invoiceNumber === newValue.split(/-(.*)/s)[1]
            )
        }) || { id: 0 }
        setTripId(id)
        setVehicleNumber(newValue)
    }
}

function findTripType(tripDetails: tripdetailsProps) {
    if (tripDetails && tripDetails.stockPointToUnloadingPointTrip !== null) {
        return tripDetails.stockPointToUnloadingPointTrip
    } else if (tripDetails && tripDetails.loadingPointToUnloadingPointTrip !== null) {
        return tripDetails.loadingPointToUnloadingPointTrip
    }
}

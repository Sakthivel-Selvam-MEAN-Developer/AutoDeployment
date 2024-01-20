import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import AutoComplete from '../../../form/AutoComplete'
import { getAllActiveTripsByAcknowledgement, getTripById } from '../../services/acknowledgement'
import AddAcknowledgement from './addAcknowledgement'
interface tripProps {
    loadingPointToStockPointTrip: {
        truck: {
            vehicleNumber: string
        }
    }
    loadingPointToUnloadingPointTrip: {
        truck: {
            vehicleNumber: string
        }
    }
}
const SelectTrip: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [vehicleslist, setVehicleslist] = useState([])
    const [tripId, setTripId] = useState<number>(0)
    const [tripDetails, setTripDetails] = useState(null)
    useEffect(() => {
        getAllActiveTripsByAcknowledgement().then(setVehicleslist)
    }, [])
    const onSubmit = async () => await getTripById(tripId).then(setTripDetails)
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AutoComplete
                    control={control}
                    fieldName="truckId"
                    label="Truck Number"
                    options={vehicleslist.map((trip: tripProps) =>
                        trip.loadingPointToStockPointTrip !== null
                            ? trip.loadingPointToStockPointTrip.truck.vehicleNumber
                            : trip.loadingPointToUnloadingPointTrip.truck.vehicleNumber
                    )}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id }: any = vehicleslist.find((trip: tripProps) =>
                            trip.loadingPointToStockPointTrip !== null
                                ? trip.loadingPointToStockPointTrip.truck.vehicleNumber === newValue
                                : trip.loadingPointToUnloadingPointTrip.truck.vehicleNumber ===
                                  newValue
                        )
                        setTripId(id)
                    }}
                />
                <SubmitButton name="Submit" type="submit" />
            </form>
            {tripDetails && <AddAcknowledgement tripDetails={tripDetails} />}
        </>
    )
}
export default SelectTrip

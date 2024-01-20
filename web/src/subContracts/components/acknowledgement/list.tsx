import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import { getAllActiveTripsByAcknowledgement, getTripById } from '../../services/acknowledgement'
import AddAcknowledgement from './addAcknowledgement'
import { Autocomplete, TextField } from '@mui/material'
import { tripProps } from './types'

const SelectTrip: React.FC = (): ReactElement => {
    const { handleSubmit } = useForm<FieldValues>()
    const [vehicleslist, setVehicleslist] = useState([])
    const [tripId, setTripId] = useState<number>(0)
    const [tripDetails, setTripDetails] = useState(null)
    useEffect(() => {
        getAllActiveTripsByAcknowledgement().then(setVehicleslist)
    }, [])
    const onSubmit = async () => await getTripById(tripId).then(setTripDetails)
    const onChange = (_event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        const { id }: any = vehicleslist.find((trip: tripProps) =>
            trip.loadingPointToStockPointTrip !== null
                ? trip.loadingPointToStockPointTrip.truck.vehicleNumber === newValue
                : trip.loadingPointToUnloadingPointTrip.truck.vehicleNumber === newValue
        )
        setTripId(id)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={vehicleslist.map((trip: tripProps) =>
                        trip.loadingPointToStockPointTrip !== null
                            ? trip.loadingPointToStockPointTrip.truck.vehicleNumber
                            : trip.loadingPointToUnloadingPointTrip.truck.vehicleNumber
                    )}
                    onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string) =>
                        onChange(event, newValue)
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search vehicle by number to act on it"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search'
                            }}
                        />
                    )}
                />
                <SubmitButton name="Submit" type="submit" />
            </form>
            {tripDetails && <AddAcknowledgement tripDetails={tripDetails} />}
        </>
    )
}
export default SelectTrip

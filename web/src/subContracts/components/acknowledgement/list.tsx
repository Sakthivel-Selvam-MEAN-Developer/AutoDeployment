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
    const [vehicleNumber, setVehicleNumber] = useState<string>('')
    const [active, setActive] = useState<boolean>(false)
    const [render, setRender] = useState<boolean>(false)
    useEffect(() => {
        getAllActiveTripsByAcknowledgement().then(setVehicleslist)
    }, [])
    useEffect(() => {
        setActive(false)
    }, [vehicleNumber])
    useEffect(() => {
        if (tripId !== 0) getTripById(tripId).then(setTripDetails)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [render])
    const onSubmit = async () => {
        await getTripById(tripId).then(setTripDetails)
        setActive(true)
    }
    const onChange = (_event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        const { id } = vehicleslist.find((trip: tripProps) =>
            trip.stockPointToUnloadingPointTrip !== null
                ? trip.stockPointToUnloadingPointTrip.loadingPointToStockPointTrip.truck
                      .vehicleNumber === newValue
                : trip.loadingPointToUnloadingPointTrip.truck.vehicleNumber === newValue
        ) || { id: 0 }
        setTripId(id)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Autocomplete
                    value={vehicleNumber}
                    freeSolo
                    disableClearable
                    options={
                        vehicleslist
                            ? vehicleslist.map((trip: tripProps) =>
                                  trip.stockPointToUnloadingPointTrip !== null
                                      ? trip.stockPointToUnloadingPointTrip
                                            .loadingPointToStockPointTrip.truck.vehicleNumber
                                      : trip.loadingPointToUnloadingPointTrip.truck.vehicleNumber
                              )
                            : []
                    }
                    onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string) => {
                        setVehicleNumber(newValue)
                        onChange(event, newValue)
                    }}
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
            {active && tripDetails && (
                <AddAcknowledgement
                    tripDetails={tripDetails}
                    setRender={setRender}
                    render={render}
                />
            )}
        </>
    )
}
export default SelectTrip

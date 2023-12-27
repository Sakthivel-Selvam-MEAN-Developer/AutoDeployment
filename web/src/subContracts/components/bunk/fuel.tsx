import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FuelFormFields from './fuelFormFields'
import { createFuel } from '../../services/fuel'

const Fuel: React.FC = (): ReactElement => {
    const { handleSubmit, control, watch } = useForm<FieldValues>()
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [fuelStationId, setFuelStationId] = useState(0)
    const [tripId, setTripId] = useState(0)

    const quantity = watch('quantity')
    const pricePerliter = watch('pricePerliter')
    useEffect(() => {
        setTotalPrice(quantity * pricePerliter)
    }, [quantity, pricePerliter])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const details = {
            loadingPointToUnloadingPointTripId: tripId,
            pricePerliter: parseInt(data.pricePerliter),
            quantity: parseInt(data.quantity),
            totalprice: totalPrice,
            fuelStationId: fuelStationId
        }
        createFuel(JSON.stringify(details))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FuelFormFields
                control={control}
                fuelStationId={setFuelStationId}
                tripId={setTripId}
                totalPrice={totalPrice}
            />
            <SubmitButton name="Add Fuel" type="submit" />
        </form>
    )
}
export default Fuel

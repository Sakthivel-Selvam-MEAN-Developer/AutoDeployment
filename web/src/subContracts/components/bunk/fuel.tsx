import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FuelFormFields from './fuelFormFields'
import { createFuel } from '../../services/fuel'
import { createPaymentDues } from '../../services/paymentDues'
import { getTripByTruckNumber } from '../../services/trip'
import dayjs from 'dayjs'

const Fuel: React.FC = (): ReactElement => {
    const { handleSubmit, control, watch } = useForm<FieldValues>()
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [fuelStationId, setFuelStationId] = useState(0)
    const quantity = watch('quantity')
    const pricePerliter = watch('pricePerliter')
    useEffect(() => {
        setTotalPrice(quantity * pricePerliter)
    }, [quantity, pricePerliter])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const details = {
            vehicleNumber: data.vehicleNumber,
            pricePerliter: parseInt(data.pricePerliter),
            quantity: parseInt(data.quantity),
            totalprice: totalPrice,
            fuelStationId: fuelStationId
        }
        createFuel(details).then((fuelDetails) => {
            if (fuelDetails.loadingPointToUnloadingPointTripId !== null) {
                getTripByTruckNumber(data.vehicleNumber).then((initialDue) => {
                    const paymentDues = {
                        name: initialDue.truck.transporter.name,
                        type: 'initial pay',
                        dueDate: dayjs().add(1, 'day').startOf('day').unix(),
                        payableAmount: (initialDue.totalTransporterAmount * 70) / 100 - totalPrice,
                        tripId: initialDue.id
                    }
                    createPaymentDues(paymentDues)
                    createPaymentDues({
                        ...paymentDues,
                        name: data.bunkId,
                        type: 'fuel pay',
                        payableAmount: totalPrice
                    })
                })
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FuelFormFields
                control={control}
                fuelStationId={setFuelStationId}
                totalPrice={totalPrice}
            />
            <SubmitButton name="Add Fuel" type="submit" />
        </form>
    )
}
export default Fuel

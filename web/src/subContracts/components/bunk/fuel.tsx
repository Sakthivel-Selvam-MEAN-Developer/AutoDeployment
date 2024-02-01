import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FuelFormFields from './fuelFormFields'
import { createFuel } from '../../services/fuel'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { useNavigate } from 'react-router-dom'
const Fuel: React.FC = (): ReactElement => {
    const navigate = useNavigate()
    const { handleSubmit, control, watch } = useForm<FieldValues>()
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [fuelStationId, setFuelStationId] = useState(0)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const quantity = watch('quantity')
    const pricePerliter = watch('pricePerliter')
    useEffect(() => {
        setTotalPrice(quantity * pricePerliter)
    }, [quantity, pricePerliter])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (
            data.fuelStationId !== undefined &&
            data.vehicleNumber !== undefined &&
            data.fuelDate !== undefined &&
            data.pricePerliter !== undefined &&
            data.quantity !== undefined &&
            data.invoiceNumber !== undefined
        ) {
            const pricePerliterFloat = parseFloat(data.pricePerliter).toFixed(2)
            const quantityFloat = parseFloat(data.quantity).toFixed(2)
            const totalpriceFloat = totalPrice.toFixed(2)
            const details = {
                vehicleNumber: data.vehicleNumber,
                pricePerliter: parseFloat(pricePerliterFloat),
                quantity: parseFloat(quantityFloat),
                totalprice: parseFloat(totalpriceFloat),
                fuelStationId: fuelStationId,
                fueledDate: data.fuelDate.unix(),
                invoiceNumber: data.invoiceNumber
            }
            createFuel(details, data.bunkId).then(() => setOpenSuccessDialog(true))
        } else alert('All fields are Required')
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FuelFormFields
                    control={control}
                    fuelStationId={setFuelStationId}
                    totalPrice={totalPrice}
                />
                <SubmitButton name="Add Fuel" type="submit" />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => {
                    setOpenSuccessDialog(false)
                    navigate('/sub/trip')
                }}
                message="Fuel Created Succesfully"
            />
        </>
    )
}
export default Fuel

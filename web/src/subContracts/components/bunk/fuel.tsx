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
        const details = {
            vehicleNumber: data.vehicleNumber,
            pricePerliter: parseFloat(data.pricePerliter),
            quantity: parseFloat(data.quantity),
            totalprice: Math.ceil(totalPrice),
            fuelStationId: fuelStationId,
            fueledDate: data.fuelDate.unix(),
            invoiceNumber: data.invoiceNumber
        }
        createFuel(details, data.bunkId).then(() => setOpenSuccessDialog(true))
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

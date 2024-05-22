import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FuelFormFields from './fuelFormFields'
import { createFuel } from '../../services/fuel'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import { useNavigate } from 'react-router-dom'
const Fuel: React.FC = (): ReactElement => {
    const navigate = useNavigate()
    const { handleSubmit, control } = useForm<FieldValues>()
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [bunkId, setBunkId] = useState(0)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [quantity, setQuantity] = useState<number>(0)
    const [pricePerliter, setPricePerliter] = useState<number>(0)
    const [disable, setDisable] = useState(false)
    const [dieselkilometer, setDieselkilometer] = useState(0)
    useEffect(() => {
        setTotalPrice(quantity * pricePerliter)
    }, [quantity, pricePerliter])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (
            data.bunkId !== undefined &&
            data.vehicleNumber !== undefined &&
            data.fuelDate !== undefined &&
            pricePerliter !== 0 &&
            quantity !== 0 &&
            data.invoiceNumber !== undefined &&
            dieselkilometer !== 0
        ) {
            setDisable(true)
            const totalpriceFloat = totalPrice.toFixed(2)
            const details = {
                vehicleNumber: data.vehicleNumber,
                pricePerliter: pricePerliter,
                quantity: quantity,
                totalprice: parseFloat(totalpriceFloat),
                bunkId: bunkId,
                fueledDate: data.fuelDate.unix(),
                invoiceNumber: data.invoiceNumber,
                dieselkilometer: dieselkilometer
            }
            createFuel(details, data.bunkId)
                .then(() => {
                    setOpenSuccessDialog(true)
                    setDisable(false)
                })
                .catch((error) => {
                    console.log(error)
                    alert(error.response.data.error)
                    setDisable(false)
                })
        } else alert('All fields are Required')
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FuelFormFields
                    control={control}
                    setBunkId={setBunkId}
                    totalPrice={totalPrice}
                    pricePerliter={pricePerliter}
                    quantity={quantity}
                    setPricePerliter={setPricePerliter}
                    setQuantity={setQuantity}
                    setDieselkilometer={setDieselkilometer}
                    dieselkilometer={dieselkilometer}
                />
                <SubmitButton name="Add Fuel" type="submit" disabled={disable} />
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

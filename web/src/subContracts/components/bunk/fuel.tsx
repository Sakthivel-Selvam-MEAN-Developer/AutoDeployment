import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FuelFormFields, { transporterType } from './fuelFormFields'
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
    const [transporterType, setTransporterType] = useState<transporterType>({
        transporter: { transporterType: 'Market', name: '' },
        vehicleNumber: ''
    })

    const [fuelType, setFuelType] = useState<string>('')
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
            data.invoiceNumber !== undefined
        ) {
            if (transporterType.transporter.transporterType === 'Own' && dieselkilometer === 0) {
                alert('Diesel Kilometer should not be Zero')
                return
            }
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
                dieselkilometer: dieselkilometer,
                fuelType: fuelType
            }
            createFuel(details, data.bunkId)
                .then(() => {
                    setOpenSuccessDialog(true)
                    setDisable(false)
                })
                .catch((error) => {
                    alert(error.response.data.error)
                    setDisable(false)
                })
        } else alert('All fields are Required')
    }
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Fuel</div>
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
                    setTransporterType={setTransporterType}
                    transporterType={transporterType}
                    fuelType={fuelType}
                    setFuelType={setFuelType}
                />
                <SubmitButton name="Add Fuel" type="submit" disabled={disable} />
            </form>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => {
                    setOpenSuccessDialog(false)
                    navigate('/sub/bunk')
                }}
                message="Fuel Created Succesfully"
            />
        </>
    )
}
export default Fuel

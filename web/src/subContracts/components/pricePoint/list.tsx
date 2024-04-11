import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { getAllCementCompany } from '../../services/cementCompany'
import { createpricePoint } from '../../services/pricePoint'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import PricePointReport from './pricePointReport/listPricePoint'

const CreatePricepoint: React.FC = (): ReactElement => {
    const { handleSubmit, control, setValue } = useForm<FieldValues>()
    const [transporterRate, setTransporterRate] = useState<number>(0)
    const [cementCompany, setCementCompany] = useState([])
    const [loadingPointId, setLoadingPointId] = useState<number | null>(null)
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [stockPointId, setStockPointId] = useState<number | null>(null)
    const [freightAmount, setFreightAmount] = useState<number>(0)
    const [dueDate, setDueDate] = useState<number>(0)
    const [cementCompanyName, setCementCompanyName] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [transporterPercentage, setTransporterPercentage] = useState(0)

    useEffect(() => {
        getAllCementCompany().then((companyData) =>
            setCementCompany(companyData.map(({ name }: { name: string }) => name))
        )
    }, [])
    useEffect(() => {
        setTransporterRate(freightAmount - (freightAmount * transporterPercentage) / 100)
    }, [freightAmount, transporterPercentage])
    const onSubmit: SubmitHandler<FieldValues> = () => {
        if (
            (loadingPointId && stockPointId) ||
            (loadingPointId && unloadingPointId) ||
            (stockPointId && unloadingPointId)
        ) {
            const transporterAmountFloat = transporterRate.toFixed(2)
            const details = {
                loadingPointId: loadingPointId,
                unloadingPointId: unloadingPointId,
                stockPointId: stockPointId,
                payGeneratingDuration: dueDate,
                freightAmount: freightAmount,
                transporterPercentage:transporterPercentage,
                transporterAmount: parseFloat(transporterAmountFloat)
            }
            if (category === 'Loading - Unloading')
                createpricePoint({ ...details, stockPointId: null }).then(() => {
                    clearForm(setCategory, setCementCompanyName, setDueDate, setOpenSuccessDialog)
                })
            else if (category === 'Loading - Stock')
                createpricePoint({ ...details, unloadingPointId: null }).then(() =>
                    clearForm(setCategory, setCementCompanyName, setDueDate, setOpenSuccessDialog)
                )
            else if (category === 'Stock - Unloading')
                createpricePoint({ ...details, loadingPointId: null }).then(() =>
                    clearForm(setCategory, setCementCompanyName, setDueDate, setOpenSuccessDialog)
                )
        } else alert('All fields Required')
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormFields
                    control={control}
                    cementCompany={cementCompany}
                    setLoadingPointId={setLoadingPointId}
                    setUnloadingPointId={setUnloadingPointId}
                    setStockPointId={setStockPointId}
                    freightAmount={freightAmount}
                    setFreightAmount={setFreightAmount}
                    loadingPointId={loadingPointId}
                    unloadingPointId={unloadingPointId}
                    stockPointId={stockPointId}
                    setTransporterPercentage={setTransporterPercentage}
                    transporterPercentage={transporterPercentage}
                    transporterRate={transporterRate}
                    category={category}
                    setCategory={setCategory}
                    setValue={setValue}
                    setCementCompanyName={setCementCompanyName}
                    cementCompanyName={cementCompanyName}
                    setDueDate={setDueDate}
                    dueDate={dueDate}
                />
                <SubmitButton name="Submit" type="submit" />
                <SuccessDialog
                    open={openSuccessDialog}
                    handleClose={() => setOpenSuccessDialog(false)}
                    message="Price Point creation is successful"
                />
            </form>
            <br />
            <br />
            <PricePointReport />
        </>
    )
}
export default CreatePricepoint

const clearForm = (
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setCementCompanyName: React.Dispatch<React.SetStateAction<string>>,
    setDueDate: React.Dispatch<React.SetStateAction<number>>,
    setOpenSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setCategory('')
    setCementCompanyName('')
    setDueDate(0)
    setOpenSuccessDialog(true)
}

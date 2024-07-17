import React, { ReactElement, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SubmitButton from '../../../form/button'
import FormFields from './formField'
import { getAllCementCompany } from '../../services/cementCompany'
import { createpricePoint } from '../../services/pricePoint'
import SuccessDialog from '../../../commonUtils/SuccessDialog'
import PricePointReport from './pricePointReport/listPricePoint'

const CreatePricepoint: React.FC = (): ReactElement => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [transporterRate, setTransporterRate] = useState<number>(0)
    const [cementCompany, setCementCompany] = useState([])
    const [loadingPointId, setLoadingPointId] = useState<number | null>(null)
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [stockPointId, setStockPointId] = useState<number | null>(null)
    const [freightAmount, setFreightAmount] = useState<number>(0)
    const [cementCompanyName, setCementCompanyName] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [transporterPercentage, setTransporterPercentage] = useState(0)
    const [initialPayPercentage, setInitialPayPercentage] = useState(0)
    const [disable, setDisable] = useState(false)
    const [dueDate, setDueDate] = useState<number>(0)

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
            setDisable(true)
            const transporterAmountFloat = transporterRate.toFixed(2)
            const details = {
                loadingPointId: loadingPointId,
                unloadingPointId: unloadingPointId,
                stockPointId: stockPointId,
                freightAmount: freightAmount,
                transporterPercentage: transporterPercentage,
                initialPayPercentage: initialPayPercentage,
                transporterAmount: parseFloat(transporterAmountFloat),
                payGeneratingDuration: dueDate
            }
            if (category === 'Loading - Unloading')
                createpricePoint({ ...details, stockPointId: null })
                    .then(() => {
                        setDisable(false)
                        clearForm(
                            setDueDate,
                            setCategory,
                            setCementCompanyName,
                            setTransporterPercentage,
                            setOpenSuccessDialog
                        )
                    })
                    .catch(() => setDisable(false))
            else if (category === 'Loading - Stock')
                createpricePoint({ ...details, unloadingPointId: null })
                    .then(() => {
                        setDisable(false)
                        clearForm(
                            setDueDate,
                            setCategory,
                            setCementCompanyName,
                            setTransporterPercentage,
                            setOpenSuccessDialog
                        )
                    })
                    .catch(() => setDisable(false))
            else if (category === 'Stock - Unloading')
                createpricePoint({ ...details, loadingPointId: null })
                    .then(() => {
                        setDisable(false)
                        clearForm(
                            setDueDate,
                            setCategory,
                            setCementCompanyName,
                            setTransporterPercentage,
                            setOpenSuccessDialog
                        )
                    })
                    .catch(() => setDisable(false))
            else setDisable(false)
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
                    setInitialPayPercentage={setInitialPayPercentage}
                    initialPayPercentage={initialPayPercentage}
                    transporterPercentage={transporterPercentage}
                    transporterRate={transporterRate}
                    category={category}
                    setCategory={setCategory}
                    setCementCompanyName={setCementCompanyName}
                    cementCompanyName={cementCompanyName}
                    setDueDate={setDueDate}
                    dueDate={dueDate}
                />
                <SubmitButton name="Create / Update" type="submit" disabled={disable} />
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
    setDueDate: React.Dispatch<React.SetStateAction<number>>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
    setCementCompanyName: React.Dispatch<React.SetStateAction<string>>,
    setTransporterPercentage: React.Dispatch<React.SetStateAction<number>>,
    setOpenSuccessDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setDueDate(0)
    setCategory('')
    setCementCompanyName('')
    setTransporterPercentage(0)
    setOpenSuccessDialog(true)
}

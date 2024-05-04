import { ChangeEvent, useEffect, useState } from 'react'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'
import { getUnloadingPointByCompanyName } from '../../services/unloadingPoint.ts'
import { Control, Controller } from 'react-hook-form'
import { getPricePoint } from '../../services/pricePoint.ts'
import { TextField } from '@mui/material'
import { getStockPointByCompanyName } from '../../services/stockPoint.ts'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue.tsx'

export interface FormFieldsProps {
    control: Control
    cementCompany: string[]
    setUnloadingPointId: React.Dispatch<React.SetStateAction<number | null>>
    setLoadingPointId: React.Dispatch<React.SetStateAction<number | null>>
    setStockPointId: React.Dispatch<React.SetStateAction<number | null>>
    transporterRate: number
    loadingPointId: number | null
    unloadingPointId: number | null
    stockPointId: number | null
    freightAmount: number
    setTransporterPercentage: React.Dispatch<React.SetStateAction<number>>
    transporterPercentage: number
    setFreightAmount: React.Dispatch<React.SetStateAction<number>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    category: string
    setCementCompanyName: React.Dispatch<React.SetStateAction<string>>
    cementCompanyName: string
}
const FormFields: React.FC<FormFieldsProps> = ({
    control,
    cementCompany,
    setLoadingPointId,
    setUnloadingPointId,
    setStockPointId,
    transporterRate,
    loadingPointId,
    unloadingPointId,
    stockPointId,
    setFreightAmount,
    freightAmount,
    setCategory,
    setTransporterPercentage,
    transporterPercentage,
    category,
    setCementCompanyName,
    cementCompanyName
}) => {
    const [loadingPointList, setLoadingPointList] = useState([])
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [stockPointList, setStockPointList] = useState([])
    const [loadingPointName, setLoadingPointName] = useState('')
    const [unloadingPointName, setUnloadingPointName] = useState('')
    const [stockPointName, setStockPointName] = useState('')

    useEffect(() => {
        if (cementCompanyName !== '') {
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
            getUnloadingPointByCompanyName(cementCompanyName).then(setUnloadingPointList)
            getStockPointByCompanyName(cementCompanyName).then(setStockPointList)
        }
    }, [cementCompanyName])
    const clearForm = () => {
        setLoadingPointName('')
        setUnloadingPointName('')
        setStockPointName('')
        setFreightAmount(0)
        setTransporterPercentage(0)
        clearSubForm()
    }
    const clearSubForm = () => {
        setLoadingPointId(null)
        setUnloadingPointId(null)
        setStockPointId(null)
    }
    useEffect(() => {
        clearForm()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, cementCompanyName])
    useEffect(() => {
        if (
            (loadingPointId && unloadingPointId) ||
            (stockPointId && loadingPointId) ||
            (stockPointId && unloadingPointId)
        ) {
            getPricePoint(loadingPointId, unloadingPointId, stockPointId).then((amount) => {
                if (amount) {
                    setFreightAmount(amount.freightAmount)
                    setTransporterPercentage(amount.transporterPercentage)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingPointId, unloadingPointId, stockPointId])
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap'
            }}
        >
            <AutoCompleteWithValue
                value={cementCompanyName}
                control={control}
                fieldName="companyName"
                label="Select Company"
                data-testid={'select'}
                options={cementCompany}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCementCompanyName(newValue)
                }}
            />
            <AutoCompleteWithValue
                control={control}
                value={category}
                fieldName="category"
                label="Select Category"
                options={['Loading - Unloading', 'Loading - Stock', 'Stock - Unloading']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCategory(newValue)
                }}
            />
            {(category === 'Loading - Unloading' ||
                category === 'Loading - Stock' ||
                category === '' ||
                category === null) && (
                <AutoCompleteWithValue
                    value={loadingPointName}
                    control={control}
                    fieldName="loadingPointId"
                    label="Loading Point"
                    options={loadingPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id } = loadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0 }
                        setLoadingPointId(id)
                        setLoadingPointName(newValue)
                    }}
                />
            )}
            {(category === 'Stock - Unloading' || category === 'Loading - Stock') && (
                <AutoCompleteWithValue
                    value={stockPointName}
                    control={control}
                    fieldName="stockPointId"
                    label="Stock Point"
                    options={stockPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id } = stockPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0 }
                        setStockPointId(id)
                        setStockPointName(newValue)
                    }}
                />
            )}
            {(category === 'Loading - Unloading' ||
                category === 'Stock - Unloading' ||
                category === '' ||
                category === null) && (
                <AutoCompleteWithValue
                    value={unloadingPointName}
                    control={control}
                    fieldName="unloadingPointId"
                    label="Unloading Point"
                    options={unloadingPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id } = unloadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0 }
                        setUnloadingPointId(id)
                        setUnloadingPointName(newValue)
                    }}
                />
            )}
            <Controller
                render={() => (
                    <TextField
                        value={freightAmount}
                        sx={{ width: '200px' }}
                        label="Freight Amount"
                        inputProps={{ step: 0.01, min: 0, max: 10000 }}
                        type="number"
                        onChange={(e) => {
                            if (
                                parseFloat(e.target.value) <= 10000 &&
                                parseFloat(e.target.value) >= 0
                            )
                                setFreightAmount(parseFloat(parseFloat(e.target.value).toFixed(2)))
                            else if (e.target.value === '') setFreightAmount(0)
                        }}
                    />
                )}
                name="freightAmount"
                control={control}
            />
            <Controller
                render={() => (
                    <TextField
                        sx={{ width: '200px' }}
                        value={transporterPercentage}
                        label="Transporter Percentage"
                        inputProps={{ step: 0.0001, min: 0, max: 20 }}
                        type="number"
                        onChange={(e) => {
                            if (parseFloat(e.target.value) <= 20 && parseFloat(e.target.value) > 0)
                                setTransporterPercentage(
                                    parseFloat(parseFloat(e.target.value).toFixed(4))
                                )
                            else if (e.target.value === '') setTransporterPercentage(0)
                        }}
                    />
                )}
                name="transporterPercentage"
                control={control}
            />
            <InputWithDefaultValue
                control={control}
                label="Transporter Amount"
                fieldName="transporterAmount"
                type="number"
                defaultValue={transporterRate}
                value={transporterRate.toFixed(2)}
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
            />
        </div>
    )
}
export default FormFields

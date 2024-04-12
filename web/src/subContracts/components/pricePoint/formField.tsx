import { ChangeEvent, useEffect, useState } from 'react'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'
import { getUnloadingPointByCompanyName } from '../../services/unloadingPoint.ts'
import { Control, Controller } from 'react-hook-form'
import { getPricePoint } from '../../services/pricePoint.ts'
import NumberInputWithValue from '../../../form/NumberInputWithValue.tsx'
import { InputAdornment, TextField } from '@mui/material'
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
    setDueDate: React.Dispatch<React.SetStateAction<number>>
    dueDate: number
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
    cementCompanyName,
    setDueDate,
    dueDate
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
        setLoadingPointId(null)
        setUnloadingPointId(null)
        setStockPointId(null)
        setTransporterPercentage(0)
        setDueDate(0)
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
                    setDueDate(amount.payGeneratingDuration)
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
            <NumberInputWithValue
                control={control}
                label="Freight Amount"
                fieldName="freightAmount"
                value={freightAmount}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setFreightAmount(parseInt(event.target.value))
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
            />
            <Controller
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={transporterPercentage}
                        label="Transporter Percentage"
                        inputProps={{ step: 0.01, min: 0 }}
                        type="number"
                        onChange={(e) => setTransporterPercentage(parseFloat(e.target.value))}
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
                InputProps={{
                    readOnly: true
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <NumberInputWithValue
                control={control}
                label="Pay Generating Duration"
                fieldName="payGeneratingDuration"
                value={dueDate}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setDueDate(parseInt(event.target.value))
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Days</b>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}
export default FormFields

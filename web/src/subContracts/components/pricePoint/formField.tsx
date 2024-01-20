import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'
import { getUnloadingPointByCompanyName } from '../../services/unloadingPoint.ts'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'
import { getPricePoint } from '../../services/pricePoint.ts'
import InputWithType from '../../../form/InputWithType.tsx'
import NumberInputWithValue from '../../../form/NumberInputWithValue.tsx'
import { InputAdornment } from '@mui/material'
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
    setFreightAmount: React.Dispatch<React.SetStateAction<number>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    category: string
    setValue: UseFormSetValue<FieldValues>
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
    category,
    setValue
}) => {
    const [cementCompanyName, setCementCompanyName] = useState<string>('null')
    const [loadingPointList, setLoadingPointList] = useState([])
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [stockPointList, setStockPointList] = useState([])
    const [loadingPointName, setLoadingPointName] = useState('')
    const [unloadingPointName, setUnloadingPointName] = useState('')
    const [stockPointName, setStockPointName] = useState('')

    useEffect(() => {
        if (cementCompanyName !== 'null') {
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
            getUnloadingPointByCompanyName(cementCompanyName).then(setUnloadingPointList)
            getStockPointByCompanyName(cementCompanyName).then(setStockPointList)
        }
    }, [cementCompanyName])
    useEffect(() => {
        setLoadingPointName('')
        setUnloadingPointName('')
        setStockPointName('')
        setFreightAmount(0)
        setValue('transporterPercentage', '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, cementCompanyName])
    useEffect(() => {
        if (
            (loadingPointId && unloadingPointId) ||
            (stockPointId && loadingPointId) ||
            (stockPointId && unloadingPointId)
        ) {
            getPricePoint(loadingPointId, unloadingPointId, stockPointId).then(
                ({ freightAmount }) => setFreightAmount(freightAmount)
            )
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
            <AutoComplete
                control={control}
                fieldName="companyName"
                label="Select Company"
                data-testid={'select'}
                options={cementCompany}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCementCompanyName(newValue)
                }}
            />
            <AutoComplete
                control={control}
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
                        const { id }: any = loadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        )
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
                        const { id }: any = stockPointList.find(
                            (data: { name: string }) => data.name === newValue
                        )
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
                        const { id }: any = unloadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        )
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
            <InputWithType
                control={control}
                disabled={false}
                label="Transporter Percentage"
                fieldName="transporterPercentage"
                type="number"
            />
            <InputWithDefaultValue
                control={control}
                label="Transporter Amount"
                fieldName="transporterAmount"
                type="number"
                defaultValue={transporterRate}
                value={transporterRate}
                InputProps={{
                    readOnly: true
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
        </div>
    )
}
export default FormFields

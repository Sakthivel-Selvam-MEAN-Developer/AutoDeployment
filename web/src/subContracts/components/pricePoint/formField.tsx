import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'
import { getUnloadingPointByCompanyName } from '../../services/unloadingPoint.ts'
import { Control } from 'react-hook-form'
import { getPricePoint } from '../../services/pricePoint.ts'
import InputWithType from '../../../form/InputWithType.tsx'
import NumberInputWithValue from '../../../form/NumberInputWithValue.tsx'
import { InputAdornment } from '@mui/material'
import { getStockPointByCompanyName } from '../../services/stockPoint.ts'

export interface FormFieldsProps {
    control: Control
    cementCompany: string[]
    setUnloadingPointId: React.Dispatch<React.SetStateAction<number>>
    setLoadingPointId: React.Dispatch<React.SetStateAction<number>>
    setStockPointId: React.Dispatch<React.SetStateAction<number>>
    transporterRate: number
    loadingPointId: number
    unloadingPointId: number
    freightAmount: number
    setFreightAmount: React.Dispatch<React.SetStateAction<number>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    category: string
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
    setFreightAmount,
    freightAmount,
    setCategory,
    category
}) => {
    const [cementCompanyName, setCementCompanyName] = useState<string>('null')
    const [loadingPointList, setLoadingPointList] = useState([])
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [stockPointList, setStockPointList] = useState([])

    useEffect(() => {
        if (cementCompanyName !== 'null') {
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
            getUnloadingPointByCompanyName(cementCompanyName).then(setUnloadingPointList)
            getStockPointByCompanyName(cementCompanyName).then(setStockPointList)
        }
    }, [cementCompanyName])
    useEffect(() => {
        if (loadingPointId && unloadingPointId) {
            getPricePoint(loadingPointId, unloadingPointId).then(({ freightAmount }) => {
                setFreightAmount(freightAmount)
            })
        }
    }, [loadingPointId, unloadingPointId])
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
                category === '') && (
                <AutoComplete
                    control={control}
                    fieldName="loadingPointId"
                    label="Loading Point"
                    options={loadingPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id }: any = loadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        )
                        setLoadingPointId(id)
                    }}
                />
            )}
            {(category === 'Stock - Unloading' || category === 'Loading - Stock') && (
                <AutoComplete
                    control={control}
                    fieldName="stockPointId"
                    label="Stock Point"
                    options={stockPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id }: any = stockPointList.find(
                            (data: { name: string }) => data.name === newValue
                        )
                        setStockPointId(id)
                    }}
                />
            )}
            {(category === 'Loading - Unloading' ||
                category === 'Stock - Unloading' ||
                category === '') && (
                <AutoComplete
                    control={control}
                    fieldName="unloadingPointId"
                    label="Unloading Point"
                    options={unloadingPointList.map(({ name }) => name)}
                    onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        const { id }: any = unloadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        )
                        setUnloadingPointId(id)
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

import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'
import { getUnloadingPointByCompanyName } from '../../services/unloadingPoint.ts'
import { Control, Controller } from 'react-hook-form'
import { getPricePoint } from '../../services/pricePoint.ts'
import { Autocomplete, InputAdornment, TextField } from '@mui/material'
import { getStockPointByCompanyName } from '../../services/stockPoint.ts'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue.tsx'
interface location {
    id: number
    name: string
}
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
    setInitialPayPercentage: React.Dispatch<React.SetStateAction<number>>
    transporterPercentage: number
    initialPayPercentage: number
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
    setInitialPayPercentage,
    transporterPercentage,
    initialPayPercentage,
    category,
    setCementCompanyName,
    cementCompanyName,
    setDueDate,
    dueDate
}) => {
    const [loadingPointList, setLoadingPointList] = useState([])
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [stockPointList, setStockPointList] = useState([])
    const [loadingPointName, setLoadingPointName] = useState({ id: 0, name: '' })
    const [unloadingPointName, setUnloadingPointName] = useState({ id: 0, name: '' })
    const [stockPointName, setStockPointName] = useState({ id: 0, name: '' })
    const checkPaygenerationLimit = (value: string) => {
        if (parseInt(value) <= 45 && parseInt(value) > 0) return parseInt(value)
        else if (value === '') return 0
        return 0
    }
    const checkInitialPayLimit = (value: string) => {
        if (parseInt(value) <= 100 && parseInt(value) > 0) return parseInt(value)
        else if (value === '') return 0
        return 0
    }
    useEffect(() => {
        if (cementCompanyName !== '') {
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
            getUnloadingPointByCompanyName(cementCompanyName).then(setUnloadingPointList)
            getStockPointByCompanyName(cementCompanyName).then(setStockPointList)
        }
    }, [cementCompanyName])
    const clearForm = () => {
        setLoadingPointName({ id: 0, name: '' })
        setUnloadingPointName({ id: 0, name: '' })
        setStockPointName({ id: 0, name: '' })
        setFreightAmount(0)
        setTransporterPercentage(0)
        setInitialPayPercentage(0)
        setDueDate(0)
        clearSubForm()
    }
    const clearSubForm = () => {
        setLoadingPointId(null)
        setUnloadingPointId(null)
        setStockPointId(null)
    }
    useEffect(() => {
        clearForm()
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
                    setInitialPayPercentage(amount.setInitialPayPercentage)
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
                <Autocomplete
                    value={loadingPointName}
                    options={loadingPointList.map((loadingPoint: location) => {
                        return { id: loadingPoint.id, name: loadingPoint.name }
                    })}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Loading Point" />}
                    onChange={(
                        _event: SyntheticEvent<Element, Event>,
                        newValue: location | null
                    ) => {
                        if (!newValue) return
                        setLoadingPointId(newValue.id)
                        setLoadingPointName({ id: newValue.id, name: newValue.name })
                    }}
                />
            )}
            {(category === 'Stock - Unloading' || category === 'Loading - Stock') && (
                <Autocomplete
                    value={stockPointName}
                    options={stockPointList.map((stockPoint: location) => {
                        return { id: stockPoint.id, name: stockPoint.name }
                    })}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Stock Point" />}
                    onChange={(
                        _event: SyntheticEvent<Element, Event>,
                        newValue: location | null
                    ) => {
                        if (!newValue) return
                        setStockPointId(newValue.id)
                        setStockPointName({ id: newValue.id, name: newValue.name })
                    }}
                />
            )}
            {(category === 'Loading - Unloading' ||
                category === 'Stock - Unloading' ||
                category === '' ||
                category === null) && (
                <Autocomplete
                    value={unloadingPointName}
                    options={unloadingPointList.map((unloadingPoint: location) => {
                        return { id: unloadingPoint.id, name: unloadingPoint.name }
                    })}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.name}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Unloading Point" />}
                    onChange={(
                        _event: SyntheticEvent<Element, Event>,
                        newValue: location | null
                    ) => {
                        if (!newValue) return
                        setUnloadingPointId(newValue.id)
                        setUnloadingPointName({ id: newValue.id, name: newValue.name })
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
            <Controller
                render={() => (
                    <TextField
                        sx={{ width: '200px' }}
                        value={initialPayPercentage}
                        label="InitialPay Percentage"
                        inputProps={{ step: 1, min: 1, max: 100 }}
                        type="number"
                        onChange={(e) =>
                            setInitialPayPercentage(checkInitialPayLimit(e.target.value))
                        }
                    />
                )}
                name="initialPayPercentage"
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
            {category !== 'Stock - Unloading' && (
                <Controller
                    render={() => (
                        <TextField
                            sx={{ width: '200px' }}
                            value={dueDate}
                            label="Pay Generating Duration"
                            inputProps={{ step: 1, min: 1, max: 45 }}
                            type="number"
                            onChange={(e) => setDueDate(checkPaygenerationLimit(e.target.value))}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <b>Days</b>
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                    name="payGeneratingDuration"
                    control={control}
                />
            )}
        </div>
    )
}
export default FormFields

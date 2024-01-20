import TextInput from '../../../form/TextInput.tsx'
import NumberInput from '../../../form/NumberInput.tsx'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { FormControlLabel, InputAdornment, Switch } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { getTruckByTransporter } from '../../services/truck.ts'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'
import { getUnloadingPointByCompanyName } from '../../services/unloadingPoint.ts'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'
import { getStockPointByCompanyName } from '../../services/stockPoint.ts'
import { AutoCompleteWithValue } from '../../../form/AutoCompleteWithValue.tsx'
import { listFuelWithoutTripId } from '../../services/fuel.ts'

interface FormFieldProps {
    control: Control
    transporter: string[]
    setTruckId: React.Dispatch<React.SetStateAction<number>>
    loadingPointId: React.Dispatch<React.SetStateAction<number | null>>
    unloadingPointId: React.Dispatch<React.SetStateAction<number | null>>
    stockPointId: React.Dispatch<React.SetStateAction<number | null>>
    cementCompany: string[]
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number | undefined
    totalTransporterAmount: number | undefined
    margin: number | undefined
    fuel: boolean
    setFuel: React.Dispatch<React.SetStateAction<boolean>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setFreightAmount: React.Dispatch<React.SetStateAction<number>>
    setTransporterAmount: React.Dispatch<React.SetStateAction<number>>
    category: string
    setValue: UseFormSetValue<FieldValues>
}
const FormField: React.FC<FormFieldProps> = ({
    control,
    transporter,
    setTruckId,
    cementCompany,
    loadingPointId,
    unloadingPointId,
    freightAmount,
    transporterAmount,
    totalFreightAmount,
    totalTransporterAmount,
    margin,
    fuel,
    setFuel,
    setCategory,
    category,
    stockPointId,
    setValue,
    setFreightAmount,
    setTransporterAmount
}) => {
    const [transporterName, setTransporterName] = useState<string>()
    const [cementCompanyName, setCementCompanyName] = useState<string>()
    const [listTruck, setListTruck] = useState([])
    const [loadingPointList, setLoadingPointList] = useState([])
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [stockPointList, setStockPointList] = useState([])
    const [vehicleNumber, setVehicleNumber] = useState<string>('')
    const [disableWantFuel, setDisableWantFuel] = useState<boolean>(false)
    const [loadingPointName, setLoadingPointName] = useState<string>('')
    const [stockPointName, setStockPointName] = useState<string>('')
    const [unloadingPointName, setUnloadingPointName] = useState<string>('')

    useEffect(() => {
        if (cementCompanyName !== undefined)
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
        if (transporterName !== undefined) getTruckByTransporter(transporterName).then(setListTruck)
    }, [transporterName, cementCompanyName])

    useEffect(() => {
        if (cementCompanyName !== undefined && category === 'Stock Point')
            getStockPointByCompanyName(cementCompanyName).then(setStockPointList)
        else if (cementCompanyName !== undefined && category === 'Unloading Point')
            getUnloadingPointByCompanyName(cementCompanyName).then(setUnloadingPointList)
    }, [category, cementCompanyName])

    useEffect(() => {
        setLoadingPointName('')
        setStockPointName('')
        setUnloadingPointName('')
        loadingPointId(null)
        unloadingPointId(null)
        stockPointId(null)
        setFreightAmount(0)
        setTransporterAmount(0)
        setValue('invoiceNumber', '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, cementCompanyName])

    useEffect(() => {
        setVehicleNumber('')
    }, [transporterName])

    useEffect(() => {
        if (vehicleNumber !== '')
            listFuelWithoutTripId(vehicleNumber).then((fuelDetails) => {
                if (fuelDetails !== null) setDisableWantFuel(true)
                else setDisableWantFuel(false)
            })
    }, [vehicleNumber])

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
                label="Company Name"
                options={cementCompany}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCementCompanyName(newValue)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="transporterName"
                label="Transporter"
                options={transporter}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setTransporterName(newValue)
                }}
            />
            <AutoCompleteWithValue
                value={vehicleNumber}
                control={control}
                fieldName="truckId"
                label="Truck Number"
                options={listTruck.map(({ vehicleNumber }) => vehicleNumber)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = listTruck.find(
                        (truck: { vehicleNumber: string }) => truck.vehicleNumber === newValue
                    )
                    setTruckId(id)
                    setVehicleNumber(newValue)
                }}
            />
            <AutoCompleteWithValue
                value={category}
                control={control}
                fieldName="category"
                label="Select Category"
                options={['Unloading Point', 'Stock Point']}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    setCategory(newValue)
                }}
            />
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
                    loadingPointId(id)
                    setLoadingPointName(newValue)
                }}
            />
            {category !== 'Stock Point' ? (
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
                        unloadingPointId(id)
                        setUnloadingPointName(newValue)
                    }}
                />
            ) : (
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
                        stockPointId(id)
                        setStockPointName(newValue)
                    }}
                />
            )}
            <InputWithDefaultValue
                control={control}
                label="Company Freight"
                fieldName="freightAmount"
                type="number"
                defaultValue={freightAmount}
                value={freightAmount}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Transporter Freight"
                fieldName="transporterAmount"
                type="number"
                defaultValue={transporterAmount}
                value={transporterAmount}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <TextInput control={control} label="Invoice Number" fieldName="invoiceNumber" />
            <NumberInput
                control={control}
                label="Quantity Loaded"
                fieldName="filledLoad"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Ton</b>
                        </InputAdornment>
                    )
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Total Company Freight"
                fieldName="totalFreightAmount"
                type="number"
                defaultValue={totalFreightAmount}
                value={totalFreightAmount}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Total Transporter Freight"
                fieldName="totalTransporterAmount"
                type="number"
                defaultValue={totalTransporterAmount}
                value={totalTransporterAmount}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Total Margin"
                fieldName="margin"
                type="number"
                defaultValue={margin}
                value={margin}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <FormControlLabel
                disabled={disableWantFuel}
                data-testid={'want-fuel'}
                control={<Switch checked={fuel} onChange={() => setFuel(!fuel)} />}
                label={fuel ? 'Fuel Required' : 'Fuel Not Required'}
            />
        </div>
    )
}

export default FormField

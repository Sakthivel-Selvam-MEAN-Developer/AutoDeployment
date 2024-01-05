import TextInput from '../../../form/TextInput.tsx'
import NumberInput from '../../../form/NumberInput.tsx'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { FormControlLabel, InputAdornment, Switch } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { getTruckByTransporter } from '../../services/truck.ts'
import { getLoadingPointByCompanyName } from '../../services/loadingPoint.ts'
import { getUnloadingPointByCompanyName } from '../../services/unloadingPoint.ts'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { Control } from 'react-hook-form'

interface FormFieldProps {
    control: Control
    transporter: string[]
    truckId: React.Dispatch<React.SetStateAction<number>>
    loadingPointId: React.Dispatch<React.SetStateAction<number>>
    unloadingPointId: React.Dispatch<React.SetStateAction<number>>
    cementCompany: string[]
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number | undefined
    totalTransporterAmount: number | undefined
    margin: number | undefined
    fuel: boolean
    setFuel: React.Dispatch<React.SetStateAction<boolean>>
    stockPoint: any
    setStockPoint: any
}
const FormField: React.FC<FormFieldProps> = ({
    control,
    transporter,
    truckId,
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
    stockPoint,
    setStockPoint
}) => {
    const [transporterName, setTransporterName] = useState<string>()
    const [cementCompanyName, setCementCompanyName] = useState<string>()
    const [listTruck, setListTruck] = useState([])
    const [loadingPointList, setLoadingPointList] = useState([])
    const [unloadingPointList, setUnloadingPointList] = useState([])

    useEffect(() => {
        if (cementCompanyName !== undefined) {
            getLoadingPointByCompanyName(cementCompanyName).then(setLoadingPointList)
            getUnloadingPointByCompanyName(cementCompanyName).then(setUnloadingPointList)
        }
        if (transporterName !== undefined) {
            getTruckByTransporter(transporterName).then(setListTruck)
        }
    }, [transporterName, cementCompanyName])

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
            <AutoComplete
                control={control}
                fieldName="truckId"
                label="Truck Number"
                options={listTruck.map(({ vehicleNumber }) => vehicleNumber)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = listTruck.find(
                        (truck: { vehicleNumber: string }) => truck.vehicleNumber === newValue
                    )
                    truckId(id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="loadingPointId"
                label="Loading Point"
                options={loadingPointList.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = loadingPointList.find(
                        (data: { name: string }) => data.name === newValue
                    )
                    loadingPointId(id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="unloadingPointId"
                label="Unloading Point"
                options={unloadingPointList.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = unloadingPointList.find(
                        (data: { name: string }) => data.name === newValue
                    )
                    unloadingPointId(id)
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Freight Amount"
                fieldName="freightAmount"
                type="number"
                defaultValue={freightAmount}
                value={freightAmount}
                InputProps={{
                    readOnly: true
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Transporter Amount"
                fieldName="transporterAmount"
                type="number"
                defaultValue={transporterAmount}
                value={transporterAmount}
                InputProps={{
                    readOnly: true
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
                label="Total Freight Amount"
                fieldName="totalFreightAmount"
                type="number"
                defaultValue={totalFreightAmount}
                value={totalFreightAmount}
                InputProps={{
                    readOnly: true
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <InputWithDefaultValue
                control={control}
                label="Total Transporter Amount"
                fieldName="totalTransporterAmount"
                type="number"
                defaultValue={totalTransporterAmount}
                value={totalTransporterAmount}
                InputProps={{
                    readOnly: true
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
                    readOnly: true
                }}
                InputLabelProps={{
                    shrink: true
                }}
            />
            <FormControlLabel
                data-testid={'want-fuel'}
                control={<Switch checked={fuel} onChange={() => setFuel(!fuel)} />}
                label={fuel ? 'Fuel Required' : 'Fuel Not Required'}
            />
            <FormControlLabel
                control={
                    <Switch checked={stockPoint} onChange={() => setStockPoint(!stockPoint)} />
                }
                label={stockPoint ? 'StockPoint' : 'UnloadingPoint'}
            />
        </div>
    )
}

export default FormField

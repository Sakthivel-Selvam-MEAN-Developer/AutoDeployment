import TextInput from '../../../form/TextInput.tsx'
import NumberInput from '../../../form/NumberInput.tsx'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { InputAdornment } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { getTruckByTransporter } from '../../services/truck.ts'
import { getFactoryByCementCompanyName } from '../../services/factory.ts'
import { getDeliveryPointByCompanyName } from '../../services/deliveryPoint.ts'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { Control } from 'react-hook-form'

interface FormFieldProps {
    control: Control
    transporter: string[]
    truckId: React.Dispatch<React.SetStateAction<number>>
    factoryId: React.Dispatch<React.SetStateAction<number>>
    deliveryPointId: React.Dispatch<React.SetStateAction<number>>
    cementCompany: string[]
    freightAmount: number
    transporterAmount: number
    totalFreightAmount: number | undefined
    totalTransporterAmount: number | undefined
    margin: number | undefined
}
const FormField: React.FC<FormFieldProps> = ({
    control,
    transporter,
    truckId,
    cementCompany,
    factoryId,
    deliveryPointId,
    freightAmount,
    transporterAmount,
    totalFreightAmount,
    totalTransporterAmount,
    margin
}) => {
    const [transporterName, setTransporterName] = useState<string>('null')
    const [cementCompanyName, setCementCompanyName] = useState<string>('null')
    const [listTruck, setListTruck] = useState([])
    const [factoryList, setFactoryList] = useState([])
    const [deliveryPoint, setDeliveryPoint] = useState([])

    useEffect(() => {
        getTruckByTransporter(transporterName).then(setListTruck)
        getFactoryByCementCompanyName(cementCompanyName).then(setFactoryList)
        getDeliveryPointByCompanyName(cementCompanyName).then(setDeliveryPoint)
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
                        (truck: any) => truck.vehicleNumber === newValue
                    )
                    truckId(id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="factoryId"
                label="Factory Point"
                options={factoryList.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = factoryList.find(
                        (factory: any) => factory.name === newValue
                    )
                    factoryId(id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="deliveryPointId"
                label="Delivery Point"
                options={deliveryPoint.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = deliveryPoint.find(
                        (deliveryPoint: any) => deliveryPoint.name === newValue
                    )
                    deliveryPointId(id)
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
                defaultValue="jj"
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
        </div>
    )
}

export default FormField

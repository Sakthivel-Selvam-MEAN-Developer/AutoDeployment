import TextInput from '../../../form/TextInput.tsx'
import NumberInput from '../../../form/NumberInput.tsx'
import AutoComplete from '../../../form/AutoComplete.tsx'
import DateInput from '../../../form/DateInput.tsx'
import { InputAdornment } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { getTruckByTransporter } from '../../services/truck.ts'
import { getFactoryByCementCompanyName } from '../../services/factory.ts'
import { getDeliveryPointByCompanyName } from '../../services/deliveryPoint.ts'

interface FormFieldProps {
    control: any
    transporter: string[]
    truckId: any
    factoryId: any
    deliveryPointId: any
    cementCompany: string[]
}
const FormField: React.FC<FormFieldProps> = ({
    control,
    transporter,
    truckId,
    cementCompany,
    factoryId,
    deliveryPointId
}) => {
    const [transporterName, setTransporterName] = useState<string | null>()
    const [cementCompanyName, setCementCompanyName] = useState<string | null>()
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
                options={factoryList.map(({ location }) => location)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = factoryList.find(
                        (factory: any) => factory.location === newValue
                    )
                    factoryId(id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="deliveryPointId"
                label="Delivery Point"
                options={deliveryPoint.map(({ location }) => location)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = deliveryPoint.find(
                        (deliveryPoint: any) => deliveryPoint.location === newValue
                    )
                    deliveryPointId(id)
                }}
            />
            <TextInput control={control} label="Invoice Number" fieldName="invoiceNumber" />
            <NumberInput
                control={control}
                label="Filled Load"
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
            <DateInput control={control} fieldName="startDate" label="Start Date" />
            <DateInput control={control} fieldName="endDate" label="End Date" />
        </div>
    )
}

export default FormField

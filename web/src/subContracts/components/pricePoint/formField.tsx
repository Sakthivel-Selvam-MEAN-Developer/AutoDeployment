import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { getFactoryByCementCompanyName } from '../../services/factory.ts'
import { getDeliveryPointByCompanyName } from '../../services/deliveryPoint.ts'
import { Control } from 'react-hook-form'
import { getPricePoint } from '../../services/pricePoint.ts'
import InputWithType from '../../../form/InputWithType.tsx'

export interface FormFieldsProps {
    control: Control
    cementCompany: string[]
    setDeliveryPointId: React.Dispatch<React.SetStateAction<number>>
    setFactoryId: React.Dispatch<React.SetStateAction<number>>
    transporterRate: number
    factoryId: number
    deliveryPointId: number
}
const FormFields: React.FC<FormFieldsProps> = ({
    control,
    cementCompany,
    setFactoryId,
    setDeliveryPointId,
    transporterRate,
    factoryId,
    deliveryPointId
}) => {
    const [cementCompanyName, setCementCompanyName] = useState<string>('null')
    // const [price, setPrice] = useState<number>(0)
    // const [percentage, setPercentage] = useState<number>(0)
    const [factoryList, setFactoryList] = useState([])
    const [deliveryPoint, setDeliveryPoint] = useState([])
    useEffect(() => {
        if (cementCompanyName !== 'null') {
            getFactoryByCementCompanyName(cementCompanyName).then(setFactoryList)
            getDeliveryPointByCompanyName(cementCompanyName).then(setDeliveryPoint)
        }
    }, [cementCompanyName])
    useEffect(() => {
        if (factoryId && deliveryPointId) {
            getPricePoint(factoryId, deliveryPointId).then(
                ({ freightAmount, transporterAmount }) => {
                    // setPrice(freightAmount)
                    // setPercentage(transporterAmount)
                    console.log(freightAmount, transporterAmount)
                }
            )
        }
    }, [factoryId, deliveryPointId])
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
                fieldName="factoryId"
                label="Factory Point"
                options={factoryList.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = factoryList.find(
                        (factory: { name: string }) => factory.name === newValue
                    )
                    setFactoryId(id)
                }}
            />
            <AutoComplete
                control={control}
                fieldName="deliveryPointId"
                label="Delivery Point"
                options={deliveryPoint.map(({ name }) => name)}
                onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                    const { id }: any = deliveryPoint.find(
                        (deliveryPoint: { name: string }) => deliveryPoint.name === newValue
                    )
                    setDeliveryPointId(id)
                }}
            />
            <InputWithType
                control={control}
                disabled={false}
                label="Freight Amount"
                fieldName="freightAmount"
                type="number"
            />
            {/* <NumberInputWithValue
                control={control}
                label="Freight Amount"
                fieldName="freightAmount"
                value={price}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPrice(parseInt(event.target.value))
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
            /> */}
            <InputWithType
                control={control}
                disabled={false}
                label="Transporter Percentage"
                fieldName="transporterPercentage"
                type="number"
            />
            {/* <NumberInputWithValue
                control={control}
                label="Transporter Percentage"
                fieldName="transporterPercentage"
                value={percentage}
                type="number"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPercentage(parseInt(event.target.value))
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <b>Rs</b>
                        </InputAdornment>
                    )
                }}
            /> */}
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

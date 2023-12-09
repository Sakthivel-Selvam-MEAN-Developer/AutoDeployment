import { ChangeEvent, useEffect, useState } from 'react'
import AutoComplete from '../../../form/AutoComplete.tsx'
import InputWithType from '../../../form/InputWithType.tsx'
import InputWithDefaultValue from '../../../form/InputWithDefaultValue.tsx'
import { getFactoryByCementCompanyName } from '../../services/factory.ts'
import { getDeliveryPointByCompanyName } from '../../services/deliveryPoint.ts'

interface FormFieldsProps {
    control: any
    cementCompany: string[]
    deliveryPointId: any
    factoryId: any
    transporterRate: any
}
const FormFields: React.FC<FormFieldsProps> = ({
    control,
    cementCompany,
    factoryId,
    deliveryPointId,
    transporterRate
}) => {
    const [cementCompanyName, setCementCompanyName] = useState<any>()
    const [factoryList, setFactoryList] = useState([])
    const [deliveryPoint, setDeliveryPoint] = useState([])
    useEffect(() => {
        getFactoryByCementCompanyName(cementCompanyName).then(setFactoryList)
        getDeliveryPointByCompanyName(cementCompanyName).then(setDeliveryPoint)
    }, [cementCompanyName])
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
            <InputWithType
                control={control}
                disabled={false}
                label="Freight Amount"
                fieldName="freightAmount"
                type="number"
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

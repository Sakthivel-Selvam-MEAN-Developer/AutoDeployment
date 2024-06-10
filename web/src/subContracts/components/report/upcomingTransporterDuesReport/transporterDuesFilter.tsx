import { Control } from 'react-hook-form'
import AutoComplete from '../../../../form/AutoComplete'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAllTransporter } from '../../../services/transporter'
import { PaymentTypeField } from './paymentTypeField'
import { DateFields } from './dateField'

export interface FormFieldsProps {
    control: Control
    setTransporterName: React.Dispatch<React.SetStateAction<string>>
    setPaymentType: React.Dispatch<React.SetStateAction<string>>
}
const TransporterDuesFilter: React.FC<FormFieldsProps> = ({
    control,
    setTransporterName,
    setPaymentType
}) => {
    const [transporter, setTransporter] = useState([])
    useEffect(() => {
        getAllTransporter().then(setTransporter)
    }, [])
    return (
        <>
            <div style={{ display: 'flex', gap: '10px', rowGap: '10px', flexWrap: 'wrap' }}>
                <AutoComplete
                    control={control}
                    fieldName="transporterName"
                    label="Select Transporter"
                    data-testid={'select'}
                    options={transporter ? transporter.map(({ name }) => name) : []}
                    onChange={(_e: ChangeEvent<HTMLInputElement>, newValue: string) => {
                        setTransporterName(newValue)
                    }}
                />
                <PaymentTypeField control={control} setPaymentType={setPaymentType} />
                <DateFields control={control} />
            </div>
        </>
    )
}
export default TransporterDuesFilter

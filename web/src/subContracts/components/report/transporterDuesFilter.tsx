import { Control } from 'react-hook-form'
import DateInput from '../../../form/DateInput'
import AutoComplete from '../../../form/AutoComplete'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAllTransporter } from '../../services/transporter'
export interface FormFieldsProps {
    control: Control
    setTransporterName: React.Dispatch<React.SetStateAction<string>>
}
const TransporterDuesFilter: React.FC<FormFieldsProps> = ({ control, setTransporterName }) => {
    const [transporter, setTransporter] = useState([])
    useEffect(() => {
        getAllTransporter().then(setTransporter)
    }, [])
    return (
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
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="from"
                label="Due Start Date"
            />
            <DateInput control={control} format="DD/MM/YYYY" fieldName="to" label="Due End Date" />
        </div>
    )
}
export default TransporterDuesFilter

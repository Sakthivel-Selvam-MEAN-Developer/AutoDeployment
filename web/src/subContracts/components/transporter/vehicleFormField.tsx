import AutoComplete from '../../../form/AutoComplete.tsx'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { getAllTransporter } from '../../services/transporter.ts'
import VehicleForm from './vehicleForm.tsx'
interface FormFieldProps {
    control: Control
    setTransporterId: React.Dispatch<React.SetStateAction<number>>
}
const VehicleFormField: React.FC<FormFieldProps> = ({ control, setTransporterId }) => {
    const [transporter, setTransporter] = useState([])
    useEffect(() => {
        getAllTransporter().then(setTransporter)
    }, [])
    return (
        <div style={{ display: 'flex', gap: '10px', rowGap: '10px', flexWrap: 'wrap' }}>
            <TransporterNameField
                control={control}
                transporter={transporter}
                setTransporterId={setTransporterId}
            />
            <VehicleForm control={control} />
        </div>
    )
}

export default VehicleFormField
interface TransporterNameFieldProps {
    control: Control
    transporter: never[]
    setTransporterId: React.Dispatch<React.SetStateAction<number>>
}
const TransporterNameField: FC<TransporterNameFieldProps> = ({
    control,
    transporter,
    setTransporterId
}) => {
    return (
        <AutoComplete
            control={control}
            fieldName="transporterName"
            label="Transporter"
            options={transporter ? transporter.map(({ name }) => name) : []}
            onChange={(_event: ChangeEvent<HTMLInputElement>, newValue: string) => {
                const { id } = transporter.find(({ name }) => name === newValue) || { id: 0 }
                setTransporterId(id)
            }}
        />
    )
}

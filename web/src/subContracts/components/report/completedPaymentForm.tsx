import { useEffect } from 'react'
import { Control } from 'react-hook-form'
import AutoComplete from '../../../form/AutoComplete.tsx'
import { Button } from '@mui/material'
import { transporterProps } from './completedPayment.tsx'
import DateInput from '../../../form/DateInput.tsx'
import { getAllTransporter } from '../../services/transporter.ts'

interface FormFieldsProps {
    control: Control
    transporter: transporterProps[]
    setTransporter: React.Dispatch<React.SetStateAction<transporterProps[]>>
}
const CompletedPaymentForm: React.FC<FormFieldsProps> = ({
    control,
    transporter,
    setTransporter
}) => {
    useEffect(() => {
        getAllTransporter().then(setTransporter)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}
        >
            <DateInput
                control={control}
                format="DD/MM/YYYY"
                fieldName="date"
                label="Payment Date"
            />
            <AutoComplete
                control={control}
                fieldName="name"
                label="Select Transporter"
                options={transporter.map(({ name }) => name)}
                onChange={{}}
            />
            <Button
                color="secondary"
                variant="contained"
                type="submit"
                style={{ marginLeft: '10px' }}
            >
                Submit
            </Button>
        </div>
    )
}
export default CompletedPaymentForm

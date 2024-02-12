import { Control } from 'react-hook-form'
import NumberInput from '../../../../form/NumberInput'
import { InputAdornment } from '@mui/material'
export interface FormFieldsProps {
    control: Control
}
const AcknowledgementDuesFilter: React.FC<FormFieldsProps> = ({ control }) => {
    return (
        <div style={{ display: 'flex', gap: '10px', rowGap: '10px', flexWrap: 'wrap' }}>
            <NumberInput
                control={control}
                label="Aging Date"
                fieldName="agingDate"
                type="number"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <b>Days</b>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}
export default AcknowledgementDuesFilter

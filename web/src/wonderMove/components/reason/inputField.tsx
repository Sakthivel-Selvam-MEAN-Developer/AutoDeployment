import { Input, IconButton } from '@mui/material'
import { Done, Clear } from '@mui/icons-material'

interface InputFieldProps {
    value: string | null
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onClear: () => void
    onSave: () => void
}
const ariaLabel = { 'aria-label': 'description' }

const InputField: React.FC<InputFieldProps> = ({ value, onChange, onClear, onSave }) => {
    const isValueEmpty = value === ''
    return (
        <Input
            fullWidth
            placeholder="Add New Reason"
            inputProps={ariaLabel}
            defaultValue={value}
            onChange={onChange}
            endAdornment={
                <>
                    <IconButton aria-label="comment" data-testid={'close-button'} onClick={onClear}>
                        <Clear />
                    </IconButton>
                    <IconButton
                        aria-label="comment"
                        data-testid={'done-button'}
                        onClick={onSave}
                        disabled={isValueEmpty}
                    >
                        <Done />
                    </IconButton>
                </>
            }
        />
    )
}

export default InputField

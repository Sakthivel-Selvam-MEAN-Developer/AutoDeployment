import { Button, InputAdornment, TextField } from '@mui/material'
import { FC, useState } from 'react'
interface actionButton {
    handleEdit: () => void
    disabled: boolean
}
const ActionButton: FC<actionButton> = ({ handleEdit, disabled }) => {
    return (
        <Button variant="text" onClick={handleEdit} disabled={disabled}>
            Add
        </Button>
    )
}
interface billingRate {
    key: number
    value: number
    onRateChange: (newRate: number) => void
    disabled: boolean
}
export const BillingRateField: FC<billingRate> = ({ key, value, onRateChange, disabled }) => {
    const [updated, setUpdated] = useState<number>(value)
    const handleChange = (newRate: number) => {
        setUpdated(newRate)
        onRateChange(newRate)
    }
    return (
        <TextField
            key={key}
            disabled={disabled}
            type="number"
            value={updated}
            onChange={(event) => handleChange(parseInt(event.target.value))}
            size="small"
            InputProps={{
                endAdornment: endAdornment
            }}
        />
    )
}
export default ActionButton
const endAdornment = (
    <InputAdornment position="end">
        <b>₹</b>
    </InputAdornment>
)

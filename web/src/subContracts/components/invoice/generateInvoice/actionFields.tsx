import { Button, TextField } from '@mui/material'
import { FC } from 'react'

const ActionButton = ({ handleEdit }: { handleEdit: () => void }) => {
    return (
        <Button variant="text" onClick={handleEdit}>
            Add
        </Button>
    )
}
interface billingRate {
    updated: number
    setUpdated: React.Dispatch<React.SetStateAction<number>>
    key: number
}
export const BillingRateField: FC<billingRate> = ({ updated, setUpdated, key }) => {
    return (
        <TextField
            key={key}
            type="number"
            value={updated}
            onChange={(event) => setUpdated(parseInt(event.target.value))}
            size="small"
        />
    )
}
export default ActionButton

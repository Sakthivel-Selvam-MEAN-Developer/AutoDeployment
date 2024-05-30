import { FC, useContext } from 'react'
import { fieldData } from './approvalContext'
import { Autocomplete, TextField } from '@mui/material'
export const TextFieldConatiner: FC = () => {
    const { fieldValues, setFieldValues } = useContext(fieldData)
    return (
        <TextField
            label="Edit Unloaded Quantity"
            value={fieldValues.quantity}
            onChange={(e) =>
                setFieldValues((prev) => {
                    return {
                        ...prev,
                        quantity: e.target.value !== '' ? parseFloat(e.target.value) : 0
                    }
                })
            }
        />
    )
}
export const DropDown: FC = () => {
    const { setFieldValues } = useContext(fieldData)
    return (
        <>
            <Autocomplete
                sx={{ width: '180px' }}
                options={['Acceptable', 'Rejectable']}
                onChange={(_event, newValue) => {
                    const value = newValue !== 'Rejectable' ? true : false
                    setFieldValues((prev) => {
                        return { ...prev, approvalStatus: value }
                    })
                }}
                renderInput={(params) => <TextField {...params} label="Approval Status" />}
            />
        </>
    )
}

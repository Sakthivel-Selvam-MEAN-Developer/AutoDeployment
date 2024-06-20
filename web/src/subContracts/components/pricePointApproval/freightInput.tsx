import { TableCell, TextField } from '@mui/material'
import { FC } from 'react'

interface NumberInputProps {
    editStatus: boolean
    freight: number
    setFright: React.Dispatch<React.SetStateAction<number>>
}
const inputProps = {
    inputProps: {
        step: 0.01,
        min: 0,
        max: 10000
    },
    endAdornment: null
}
export const FreightInput: FC<NumberInputProps> = ({ editStatus, freight, setFright }) => (
    <>
        {editStatus && (
            <TableCell>
                <TextField
                    label="Edit FreightAmount"
                    value={parseFloat(freight.toFixed(2))}
                    type="number"
                    onChange={(e) => {
                        const value = parseFloat(e.target.value).toFixed(2)
                        setFright(parseFloat(value) > 0 ? parseFloat(value) : 0)
                    }}
                    InputProps={inputProps}
                />
            </TableCell>
        )}
    </>
)

import { TableCell, TextField } from '@mui/material'
import { FC } from 'react'

interface percentageInputProps {
    editStatus: boolean
    percentage: number
    freight: number
    setPercentage: React.Dispatch<React.SetStateAction<number>>
}
export const PercentageInput: FC<percentageInputProps> = ({
    editStatus,
    percentage,
    setPercentage,
    freight
}) => (
    <>
        {editStatus && (
            <TableCell>
                <TextField
                    label="Edit TransporterPercentage"
                    value={parseFloat(percentage.toFixed(2))}
                    type="number"
                    onChange={(e) => {
                        const value = parseFloat(e.target.value).toFixed(2)
                        setPercentage(parseFloat(value) > 0 ? parseFloat(value) : 0)
                    }}
                    InputProps={{
                        inputProps: {
                            step: 0.01,
                            min: 0,
                            max: 20
                        },
                        endAdornment: null
                    }}
                />
            </TableCell>
        )}
        <TableCell>{(freight - (freight * percentage) / 100).toFixed(2)}</TableCell>
    </>
)

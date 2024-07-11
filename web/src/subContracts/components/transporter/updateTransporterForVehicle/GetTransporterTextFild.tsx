import { FC } from 'react'
import { GetTextFildProps } from './types'
import { TextField } from '@mui/material'

export const GetTransporterTextFild: FC<GetTextFildProps> = ({ currentTransporterName }) => {
    return (
        <TextField
            label="Current Transporter"
            type="string"
            value={currentTransporterName}
            InputProps={{ readOnly: true }}
        />
    )
}

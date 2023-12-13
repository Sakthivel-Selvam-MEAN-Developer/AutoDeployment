import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useEffect, useState } from 'react'
import { getAllReasons } from '../../services/reason.ts'
import { RowType } from './secondReason.tsx'

type UpdateReasonProps = {
    stopInfo: RowType
    onSelect: (value: any) => void
    selectedReason: number
}
const UpdateReason: React.FC<UpdateReasonProps> = ({ stopInfo, onSelect, selectedReason }) => {
    const [fetchReason, setFetchReason] = useState([])
    useEffect(() => {
        getAllReasons().then(setFetchReason)
    }, [stopInfo])

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="demo-simple-select-helper-label">Reasons</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Reasons"
                    value={selectedReason}
                    onChange={(e) => onSelect(e.target.value)}
                >
                    {fetchReason.map((reason: any, index: number) => (
                        <MenuItem key={index} value={reason.id}>
                            {reason.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}
export default UpdateReason

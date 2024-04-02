import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import { updateStops } from '../../services/stops.ts'

interface ReasonInfo {
    id: number
    name: string
    reason: {
        id: number
    }
}
interface UpdateReasonProps {
    reasonInfo: ReasonInfo
    allReasons: ReasonInfo[]
}
const UpdateReason: React.FC<UpdateReasonProps> = ({ reasonInfo, allReasons }) => {
    const [selectedReason, setSelectedReason] = useState<string | number>(reasonInfo.reason.id)
    const handleChange = (event: SelectChangeEvent<typeof selectedReason>) => {
        const selectedReasonId = event.target.value
        setSelectedReason(selectedReasonId)
        updateStops(reasonInfo.id, { stopReasonId: selectedReasonId })
    }
    return (
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-simple-select-helper-label">Reasons</InputLabel>
            <Select
                id="demo-simple-select-helper"
                value={selectedReason}
                label="Reasons"
                onChange={handleChange}
            >
                {allReasons.map((reason, index) => (
                    <MenuItem key={index} value={reason.id}>
                        {reason.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
export default UpdateReason

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import SuccessDialog from '../SuccessDialog.tsx'
import { updateStops } from '../../services/stops.ts'

interface ReasonInfo {
    id: number;
    reason: {
        id: number;
    };
}

interface UpdateReasonProps {
    reasonInfo: ReasonInfo;
    allReasons: Array<any>;
}
const UpdateReason: React.FC<UpdateReasonProps> = ({ reasonInfo, allReasons }) => {
    const [selectedReason, setSelectedReason] = useState(reasonInfo.reason.id)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)


    const handleChange = (event: any) => {
        const selectedReasonId = event.target.value
        setSelectedReason(selectedReasonId)
        updateStops(reasonInfo.id, { stopReasonId: selectedReasonId })
        setOpenSuccessDialog(true)
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="demo-simple-select-helper-label">
                    Reasons
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedReason}
                    label="Reasons"
                    onChange={handleChange}
                >
                    {allReasons.map((reason: any, index: any) => (
                        <MenuItem key={index} value={reason.id}>
                            {reason.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => setOpenSuccessDialog(false)}
                message={'Reason updated successfully'}
            />
        </>
    )
}
export default UpdateReason

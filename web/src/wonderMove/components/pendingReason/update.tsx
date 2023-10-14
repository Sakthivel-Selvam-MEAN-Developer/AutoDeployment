import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useEffect, useState } from 'react'
import { getAllReasons } from '../../services/reason.ts'
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
}
const UpdateReason: React.FC<UpdateReasonProps> = ({ reasonInfo }) => {
    const [fetchReason, setFetchReason] = useState<any>([])
    const [selectedReason, setSelectedReason] = useState(reasonInfo.reason.id)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

    useEffect(() => {
        // @ts-ignore
        getAllReasons().then(setFetchReason)
    }, [])
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
                    {fetchReason.map((reason: any, i: any) => (
                        <MenuItem key={i} value={reason.id}>
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

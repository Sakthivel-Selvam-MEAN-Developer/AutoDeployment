import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'
import { updateStops } from '../../services/stops'
import SuccessDialog from '../../../commonUtils/SuccessDialog.tsx'
import AlertDialog from '../../../commonUtils/confirmationDialog.js'

interface AddReasonProps {
    stopInfo: any
    allReasons: Array<any>
}
const AddReason: React.FC<AddReasonProps> = ({ stopInfo, allReasons }) => {
    const [selectedReason, setSelectedReason] = useState<string>(stopInfo.reason.id)
    const [temporaryReason, setTemporaryReason] = useState()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [openAlertDialog, setOpenAlertDialog] = useState(false)

    const handleChange = (event: SelectChangeEvent) => {
        const selectedReasonId = event.target.value
        setTemporaryReason(selectedReasonId as any)
        setOpenAlertDialog(true)
    }

    const handleAgree = () => {
        setSelectedReason(temporaryReason as any)
        updateStops(stopInfo.id, { stopReasonId: temporaryReason }).then(() => {
            setOpenAlertDialog(false)
            setOpenSuccessDialog(true)
        })
    }

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="demo-simple-select-helper-label">Reasons</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
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
            <AlertDialog
                open={openAlertDialog}
                handleClose={() => setOpenAlertDialog(false)}
                handleAgree={handleAgree}
                message={'Want to change the reason..'}
            />
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => setOpenSuccessDialog(false)}
                message={'Reason updated successfully'}
            />
        </>
    )
}

export default AddReason

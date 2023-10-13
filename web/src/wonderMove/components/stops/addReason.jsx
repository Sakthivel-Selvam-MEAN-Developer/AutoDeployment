import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import PropTypes, { any } from 'prop-types'
import Select from '@mui/material/Select'
import { useState } from 'react'
import { updateStops } from '../../services/stops'
import SuccessDialog from '../SuccessDialog.tsx'
import AlertDialog from '../confirmationDialog.js'

const AddReason = ({ stopInfo, allReasons }) => {
    const [selectedReason, setSelectedReason] = useState(stopInfo.reason.id)
    const [temporaryReason, setTemporaryReason] = useState()
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [openAlertDialog, setOpenAlertDialog] = useState(false)

    const handleChange = (event) => {
        const selectedReasonId = event.target.value
        setTemporaryReason(selectedReasonId)
        setOpenAlertDialog(true)
    }

    const handleAgree = () => {
        setSelectedReason(temporaryReason)
        updateStops(stopInfo.id, { stopReasonId: temporaryReason }).then(() => {
            setOpenAlertDialog(false)
            setOpenSuccessDialog(true)
        })
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
AddReason.propTypes = {
    stopInfo: PropTypes.any,
    allReasons: PropTypes.arrayOf(any),
}

export default AddReason

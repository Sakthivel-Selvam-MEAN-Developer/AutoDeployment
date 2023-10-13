import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useEffect, useState } from 'react'
import { getAllReasons } from '../../services/reason.js'
import SuccessDialog from '../SuccessDialog.tsx'
import { updateStops } from '../../services/stops.js'

const UpdateReason = ({ reasonInfo }) => {
    const [fetchReason, setFetchReason] = useState([])
    const [selectedReason, setSelectedReason] = useState(reasonInfo.reason.id)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

    useEffect(() => {
        getAllReasons().then(setFetchReason)
    }, [])
    const handleChange = (event) => {
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
                    {fetchReason.map((reason, i) => (
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
UpdateReason.propTypes = {
    reasonInfo: PropTypes.any,
}
export default UpdateReason

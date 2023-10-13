import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useState } from 'react'
import { Button } from '@mui/material'
import { epochToDate } from '../EpochConverter.jsx'
import UpdateReason from './updateReason.jsx'
import { updateSecondReason } from '../../services/stops.js'

const SecondReason = ({ row, onClose, tableState }) => {
    const [value, setValue] = useState(null)
    const [selectedReason, setSelectedReason] = useState(row.reason.id)

    const handleMenuItemSelect = (selectedReasonId) => {
        setSelectedReason(selectedReasonId)
    }
    const handleClose = () => {
        onClose()
    }
    const disableUpdate =
        !value ||
        !value.isValid() ||
        value.isBefore(dayjs(epochToDate(row.startTime))) ||
        value.isAfter(dayjs(epochToDate(row.endTime)))
    const updateReason = () => {
        updateSecondReason(row.id, {
            resolvedTime: dayjs(value).unix(),
            newStopReasonId: selectedReason,
        })
        tableState()
        onClose()
    }
    return (
        <>
            <div className="popup">
                <div className="popup-content" style={{ display: 'flex' }}>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={2} sx={{ maxWidth: 300 }}>
                                <DateTimePicker
                                    value={value}
                                    onChange={setValue}
                                    minDateTime={dayjs(
                                        epochToDate(row.startTime)
                                    )}
                                    maxDateTime={dayjs(
                                        epochToDate(row.endTime)
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                    <div>
                        {
                            <UpdateReason
                                stopInfo={row}
                                selectedReason={selectedReason}
                                onSelect={handleMenuItemSelect}
                            />
                        }
                    </div>
                    <div>
                        <Button onClick={handleClose}>Close</Button>
                        <Button
                            autoFocus
                            onClick={updateReason}
                            disabled={disableUpdate}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
SecondReason.propTypes = {
    row: PropTypes.any,
    onClose: PropTypes.any,
    tableState: PropTypes.any,
}
export default SecondReason

import dayjs from 'dayjs'
import Stack from '@mui/material/Stack'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useState } from 'react'
import { Button } from '@mui/material'
import { epochToDate } from '../epochToTime.ts'
import UpdateReason from './updateReason.tsx'
import { overrideStop } from '../../services/stops.ts'

interface RowType {
    id: number
    startTime: number
    endTime: number
    gpsStopId: number
    stopReasonId: number
    durationInMillis: number
    reason: {
        id: number
    }
}
interface SecondReasonProps {
    row: RowType
    onClose: () => void
    tableState: () => void
    rowWithSameGpsId: any
}

const SecondReason: React.FC<SecondReasonProps> = ({
    row,
    onClose,
    tableState,
    rowWithSameGpsId
}) => {
    const [value, setValue] = useState<dayjs.Dayjs | null>(null)
    const [selectedReason, setSelectedReason] = useState(row.reason.id)

    const handleMenuItemSelect = (selectedReasonId: number) => setSelectedReason(selectedReasonId)
    const handleClose = () => onClose()
    const disableUpdate =
        !value ||
        !value.isValid() ||
        value.isBefore(dayjs(epochToDate(row.startTime))) ||
        value.isAfter(dayjs(epochToDate(row.endTime)))
    const updateReason = () => {
        const splitTime = dayjs(value).unix()
        const firstStop = {
            startTime: row.startTime,
            endTime: splitTime,
            durationInMillis: (splitTime - row.startTime) * 1000,
            gpsStopId: row.gpsStopId,
            stopReasonId: row.stopReasonId
        }
        const secondStop = {
            startTime: splitTime,
            endTime: row.endTime,
            durationInMillis: (row.endTime - splitTime) * 1000,
            gpsStopId: row.gpsStopId,
            stopReasonId: selectedReason
        }
        const remainingRows = rowWithSameGpsId
            .filter((splitRow: { id: number }) => splitRow.id !== row.id)
            .map(({ startTime, endTime, durationInMillis, gpsStopId, stopReasonId }: RowType) => ({
                startTime,
                endTime,
                durationInMillis,
                gpsStopId,
                stopReasonId
            }))
        overrideStop(row.gpsStopId, [firstStop, secondStop, ...remainingRows])
            .then(() => {
                tableState()
                onClose()
            })
            .catch(() => alert("Can't able to split"))
    }
    return (
        <div className="popup">
            <div className="popup-content" style={{ display: 'flex' }}>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={2} sx={{ maxWidth: 300 }}>
                            <DateTimePicker
                                value={value}
                                onChange={setValue}
                                minDateTime={dayjs(epochToDate(row.startTime))}
                                maxDateTime={dayjs(epochToDate(row.endTime))}
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
                    <Button autoFocus onClick={updateReason} disabled={disableUpdate}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default SecondReason

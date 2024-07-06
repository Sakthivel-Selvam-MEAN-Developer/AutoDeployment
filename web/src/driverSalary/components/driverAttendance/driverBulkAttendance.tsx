import MultipleDatesPicker from '@ambiot/material-ui-multiple-dates-picker'
import { useEffect, useState } from 'react'
import {
    getDriverDailyAttendanceById,
    upsertDriverAttendanceById
} from '../../services/driverAttendance'
import { getAllDriver } from '../../services/driver'
import { AutocompleteWithDriverName } from '../driverSalaryMaster/driverDetails'
import { attendanceProps } from './type'
import SuccessDialog from '../../../commonUtils/SuccessDialog'

const DriverBulkAttendance = () => {
    const [driverId, setDriverId] = useState<number>(0)
    const [open, setOpen] = useState<boolean>(false)
    const [driverList, setDriverList] = useState([])
    const [attendanceDetails, setAttendanceDetails] = useState<attendanceProps>()
    const [driverName, setDriverName] = useState<string | null>('')
    const [revertedDates, setRevertedDates] = useState<string[]>([])
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    useEffect(() => {
        getAllDriver().then(setDriverList)
    }, [])
    useEffect(() => {
        setRevertedDates([])
        getDriverDailyAttendanceById(driverId).then((data) => {
            setAttendanceDetails(data)
            revertJsonToDate(data)
        })
    }, [driverId])
    const revertJsonToDate = (attendanceDetails: attendanceProps) => {
        driverId !== 0 && setOpen(true)
        attendanceDetails &&
            attendanceDetails.attendance.forEach((entry) => {
                const year = entry.year
                entry.attendance.forEach((monthEntry: any) => {
                    const month = monthEntry.month
                    monthEntry.datesPresent.forEach((day: number) => {
                        setRevertedDates((prev) => [...prev, `${month} ${day} ${year}`])
                    })
                })
            })
    }

    const handleDateSubmit = async (dates: Date[]) => {
        await upsertDriverAttendanceById(attendanceDetails?.id || 0, driverId, dates).then(() => {
            setOpen(false)
            setOpenSuccessDialog(true)
            setDriverId(0)
        })
    }
    return (
        <>
            <AutocompleteWithDriverName
                driverList={driverList}
                setDriverId={setDriverId}
                driverName={driverName}
                setDriverName={setDriverName}
            />
            <MultipleDatesPicker
                data-testid={'dialog-date-picker'}
                open={open}
                selectedDates={revertedDates.map((date) => new Date(`${date}`))}
                onCancel={() => setOpen(false)}
                onSubmit={(dates: Date[]) => handleDateSubmit(dates)}
            />
            <SuccessDialog
                open={openSuccessDialog}
                handleClose={() => setOpenSuccessDialog(false)}
                message="Attenance Added is successful"
            />
        </>
    )
}
export default DriverBulkAttendance

import MultipleDatesPicker from '@ambiot/material-ui-multiple-dates-picker'
import dayjs from 'dayjs'
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
    const filteredDates: any[] = []
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
        const formattedDate = dates.map((date) => {
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
        })
        formattedDate.forEach((dateStr) => {
            const [day, month, year] = dateStr.split('/')
            const formattedDate = dayjs(`${day}/${month}/${year}`, 'D/M/YYYY')

            const monthName = formattedDate.format('MMMM')
            const yearValue = formattedDate.year()

            const existingYearIndex = filteredDates.findIndex((entry) => entry.year === yearValue)
            if (existingYearIndex === -1) {
                filteredDates.push({
                    year: yearValue,
                    attendance: [{ month: monthName, datesPresent: [parseInt(day)] }]
                })
            } else {
                const existingMonthIndex = filteredDates[existingYearIndex].attendance.findIndex(
                    (entry: { month: string }) => entry.month === monthName
                )
                if (existingMonthIndex === -1) {
                    filteredDates[existingYearIndex].attendance.push({
                        month: monthName,
                        datesPresent: [parseInt(day)]
                    })
                } else {
                    filteredDates[existingYearIndex].attendance[
                        existingMonthIndex
                    ].datesPresent.push(parseInt(day))
                }
            }
        })
        await upsertDriverAttendanceById(attendanceDetails?.id || 0, driverId, filteredDates).then(
            () => {
                setOpen(false)
                setOpenSuccessDialog(true)
                setDriverId(0)
            }
        )
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
                message="Trip creation is successful"
            />
        </>
    )
}
export default DriverBulkAttendance

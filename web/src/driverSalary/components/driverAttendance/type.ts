import React from 'react'

export interface tableProps {
    driverList: driverProps[]
    setDriverId: React.Dispatch<React.SetStateAction<number[]>>
    driverId: number[]
}
export interface tableProp {
    driver: driverProps
    setDriverId: React.Dispatch<React.SetStateAction<number[]>>
    driverId: number[]
}
interface driverProps {
    id: number
    name: string
    mobileNumber: string
}
export interface attendanceProps {
    id: number
    driverId: number
    attendance: attendance[]
}
interface attendance {
    year: number
    attendance: attendanceDetails[]
}
interface attendanceDetails {
    month: string
    datesPresent: number[]
}

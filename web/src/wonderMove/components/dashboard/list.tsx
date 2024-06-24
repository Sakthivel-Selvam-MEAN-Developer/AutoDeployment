import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import dayjs, { ManipulateType } from 'dayjs'
import PieChartDetails from './details.tsx'
import { getVehicles } from '../../services/vehicles.ts'
import { stopDuration } from '../../services/stops.ts'
import { formatDuration } from '../../../commonUtils/epochToTime.ts'

interface DurationData {
    durationInMillis: number
    name: string
}

interface DurationEntryProps {
    durationInMillis: number
}

const DashboardList: React.FC = () => {
    const [duration, setDuration] = useState<DurationData[]>([])
    const [totalVehicles, setTotalVehicles] = useState([])
    const [millisPerDay, setMillisPerDay] = useState<number>(86400000)
    const [period, setPeriod] = useState<string>('pastDay')
    const [from, setFrom] = useState<number>(dayjs().subtract(1, 'day').unix())
    const [to, setTo] = useState<number>(dayjs().unix())
    const [selectedCell, setSelectedCell] = useState<DurationData | null>(null)
    const colors = ['#39b2de', '#fd9846', '#7164fd', '#a4ea3c', '#c261ff', '#ffa2a2']
    const setData = (days: number, type: ManipulateType | undefined) => {
        setFrom(dayjs().subtract(1, type).unix())
        setMillisPerDay(days * 86400000)
    }
    const handleChange = (event: SelectChangeEvent) => {
        setPeriod(event.target.value)
        switch (event.target.value) {
            case 'pastDay':
                setData(1, 'day')
                break
            case 'lastWeek':
                setData(7, 'week')
                break
            case 'lastMonth':
                setData(30, 'month')
                break
        }
        setTo(dayjs().unix())
    }
    // setFrom(dayjs().subtract(1, 'day').unix())
    // setMillisPerDay(86400000)
    useEffect(() => {
        getVehicles().then((vehicles) => {
            setTotalVehicles(vehicles)
        })
    }, [])

    useEffect(() => {
        stopDuration(from, to).then((stopDurations) => {
            durations(stopDurations, totalVehicles, millisPerDay, setDuration)
        })
    }, [totalVehicles, from, to, millisPerDay])
    const handleCellClick = (entry: DurationData) => {
        setSelectedCell(entry)
    }
    const menuItemData = [
        { value: 'pastDay', label: 'Last 24 Hours' },
        { value: 'lastWeek', label: 'Last Week' },
        { value: 'lastMonth', label: 'Last Month' }
    ]
    return (
        <>
            {/* Date Filter */}
            <FormControl style={{ width: '200px' }}>
                <InputLabel></InputLabel>
                <Select value={period} onChange={handleChange}>
                    {menuItemData.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* Pie Chart */}
            {/*<ResponsiveContainer width={950} height={600}>*/}
            <PieChart width={1000} height={600}>
                <Pie
                    data={duration}
                    dataKey="durationInMillis"
                    cx="50%"
                    cy="50%"
                    innerRadius={110}
                    outerRadius={150}
                    paddingAngle={5}
                    label={(entry) => `${entry.name} (${formatDuration(entry.durationInMillis)})`}
                >
                    {duration.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            onClick={() => handleCellClick(entry)}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number, name) => [formatDuration(value), name]} />
            </PieChart>
            {/*</ResponsiveContainer>*/}
            {selectedCell && <PieChartDetails selectedCell={selectedCell} />}
        </>
    )
}
export default DashboardList
const durations = (
    stopDurations: any,
    totalVehicles: never[],
    millisPerDay: number,
    setDuration: React.Dispatch<React.SetStateAction<DurationData[]>>
) => {
    const totalDuration = stopDurations.reduce(
        (total: number, entry: DurationEntryProps) => total + entry.durationInMillis,
        0
    )
    const runningTimeForAllVehicle = {
        durationInMillis: totalVehicles.length * millisPerDay - totalDuration,
        name: 'Running Time'
    }
    setDuration([...stopDurations, runningTimeForAllVehicle])
}

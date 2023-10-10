import React, { useState, useEffect } from 'react'
import {PieChart, Pie, ResponsiveContainer, Tooltip, Cell} from 'recharts'
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import dayjs from 'dayjs'
import PieChartDetails from './details.tsx'
import {getVehicles} from '../../services/vehicles.ts'
import { stopDuration } from '../../services/stops.ts'

interface DurationData {
    durationInMillis: number;
    name: string;
}
const DashboardList: React.FC = () => {
    const [duration, setDuration] = useState<DurationData[]>([]);
    const [totalVehicles, setTotalVehicles] = useState<any[]>([]);
    const [hours, setHours] = useState<number>(86400);
    const [period, setPeriod] = useState<string>('pastDay');
    const [from, setFrom] = useState<number>(
        dayjs().subtract(1, 'day').unix()
    );
    const [to, setTo] = useState<number>(dayjs().unix());
    const [selectedCell, setSelectedCell] = useState<DurationData | null>(
        null
    )
    const colors = [
        '#39b2de',
        '#fd9846',
        '#7164fd',
        '#ffee6c',
        '#c261ff',
        '#ffa2a2',
    ]
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const period = event.target.value as string;
        setPeriod(period);

        switch (period) {
            case 'pastDay':
                setFrom(dayjs().subtract(1, 'day').unix());
                setTo(dayjs().unix());
                setHours(86400);
                break;
            case 'lastWeek':
                setFrom(dayjs().subtract(1, 'week').unix());
                setTo(dayjs().unix());
                setHours(7 * 86400);
                break;
            case 'lastMonth':
                setFrom(dayjs().subtract(1, 'month').unix());
                setTo(dayjs().unix());
                setHours(30 * 86400);
                break;
        }
    }
    useEffect(() => {
        getVehicles().then(setTotalVehicles);
    }, []);

    useEffect(() => {
        stopDuration(from, to).then(setDuration);
    }, [totalVehicles, from, to]);

    let totalDuration = 0;

    for (let i = 0; i < duration.length; i++) {
        totalDuration += duration[i].durationInMillis;
    }

    let runningTime = {
        durationInMillis: totalVehicles.length * hours - totalDuration,
        name: 'Running Time',
    };

    duration.push(runningTime);

    const handleCellClick = (entry: DurationData) => {
        setSelectedCell(entry);
    };
    return (
        <>
            {/* Date Filter */}
            <FormControl style={{ width: '200px' }}>
                <InputLabel></InputLabel>
                <Select
                    value={period}
                    onChange={handleChange}
                >
                    <MenuItem value="pastDay">{'Last 24 Hours'}</MenuItem>
                    <MenuItem value="lastWeek">{'Last Week'}</MenuItem>
                    <MenuItem value="lastMonth">{'Last Month'}</MenuItem>
                </Select>
            </FormControl>
            {/* Pie Chart */}
            <ResponsiveContainer width={950} height={600}>
                <PieChart width={700} height={600}>
                    <Pie
                        data={duration}
                        dataKey="durationInMillis"
                        cx="50%"
                        cy="50%"
                        innerRadius={120}
                        outerRadius={150}
                        paddingAngle={5}
                        label={(entry) =>
                            `${entry.name} ${entry.durationInMillis}`
                        }
                    >
                        {duration.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                onClick={() => handleCellClick(entry)}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            {selectedCell && (
                <PieChartDetails
                    selectedCell={selectedCell}
                />
            )}
        </>
    );
};

export default DashboardList
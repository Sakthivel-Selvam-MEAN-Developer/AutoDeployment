import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
    {
        name: 'Casual_leave',
        leave: 6,
        amt: 2400
    },
    {
        name: 'Sick_leave',
        leave: 5,
        amt: 2210
    }
]
const HrmDashboardList: React.FC = () => {
    return (
        <>
            <div>
                <BarChart
                    width={300}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leave" fill="#8884d8" />
                </BarChart>
            </div>
        </>
    )
}

export default HrmDashboardList

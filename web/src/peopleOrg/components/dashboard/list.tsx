import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Label, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'

const data = [
    { name: 'Planned Leaves', value: 14 },
    { name: 'Leaves Taken', value: 6 },
    { name: 'Remaining Leaves', value: 10 }
]
const HrmDashboardList: React.FC = () => {
    const navigate = useNavigate()
    const colors = ['#39b2de', '#fd9846', '#7164fd', '#a4ea3c', '#c261ff', '#ffa2a2']
    return (
        <>
            <h5>No. of approvals pending : 3</h5>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart width={320} height={360}>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        label={(entry) => `${entry.value} days`}
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                        <Label value="Leaves" position="center" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <div style={{ width: '100%', display: 'flex', marginLeft: '0px' }}>
                <div
                    style={{
                        padding: '0px 15px',
                        margin: '15px',
                        boxShadow: '1px 1px 6px grey',
                        borderRadius: '15px',
                        width: '50%',
                        textAlign: 'center'
                    }}
                >
                    <h4 style={{ textDecorationLine: 'underline' }}>Leave Status</h4>
                    <p style={{ opacity: '0.6' }}>Pending</p>
                </div>
                <div
                    style={{
                        padding: '0px 15px',
                        margin: '15px',
                        boxShadow: '1px 1px 6px grey',
                        borderRadius: '15px',
                        width: '50%',
                        textAlign: 'center'
                    }}
                >
                    <h4 style={{ textDecorationLine: 'underline' }}>Remaining Leaves</h4>
                    <p>
                        <b>20</b> /Days Remaining
                    </p>
                </div>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('/hrm/leaves/apply')}
                >
                    Apply Leave
                </Button>
            </div>
        </>
    )
}

export default HrmDashboardList

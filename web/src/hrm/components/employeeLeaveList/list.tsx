import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { epochToMinimalDate } from '../../../wonderMove/components/epochToTime'
import { getAllLeaveWithStatus } from '../../services/employeeLeave'

const EmployeeList: React.FC = () => {
    const navigate = useNavigate()
    const [allLeave, setAllLeave] = useState([])
    const [selectedRow, setSelectedRow] = useState<any | null>(null)

    useEffect(() => {
        getAllLeaveWithStatus().then(setAllLeave)
    }, [])
    const handleListItemClick = (rowId: number) => {
        setSelectedRow(selectedRow === rowId ? null : rowId)
    }

    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right'
                }}
            >
                <Button color="primary" variant="contained" onClick={() => navigate('apply')}>
                    Apply Leave
                </Button>
            </div>
            <List>
                {allLeave.map((row: any) => (
                    <React.Fragment key={row.id}>
                        <ListItem
                            key={row.id}
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        >
                            <div onClick={() => handleListItemClick(row.id)}>
                                <ListItemText
                                    primary={row.appliedBy}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Duration&nbsp;: &nbsp;
                                            </Typography>
                                            {epochToMinimalDate(row.from)} &nbsp;- &nbsp;
                                            {epochToMinimalDate(row.to)}
                                            <ListItemSecondaryAction>
                                                {row.approval === true
                                                    ? 'Approved'
                                                    : row.approval === false
                                                        ? 'Rejected'
                                                        : 'Pending'}
                                            </ListItemSecondaryAction>
                                        </React.Fragment>
                                    }
                                />
                                {selectedRow == row.id && (
                                    <Typography variant="body2">
                                        For : {row.leaveReason.name}
                                        <p>
                                            {row.approval === true
                                                ? 'Permission Granted'
                                                : row.approval === false
                                                    ? row.deniedComment
                                                        ? row.deniedComment
                                                        : 'No comment provided'
                                                    : 'Pending'}
                                        </p>
                                    </Typography>
                                )}
                            </div>
                        </ListItem>
                        <Divider variant="fullWidth" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </>
    )
}
export default EmployeeList

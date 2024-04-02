import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import { driverDialogProps } from './downloadAllDetailsDialog'
import { Link } from 'react-router-dom'

const Driver_FormFields: FC<driverDialogProps> = ({ setActivateDialog }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 20px 0 0' }}>
            <Typography variant="h6">List of Trips</Typography>
            <div>
                <Button
                    variant="contained"
                    sx={{ marginRight: '20px' }}
                    onClick={() => setActivateDialog(true)}
                >
                    Download Details
                </Button>
                <Link to={'/driverSalary/employee-salary/addexpenses'}>
                    <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
                        Add Expense
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Driver_FormFields

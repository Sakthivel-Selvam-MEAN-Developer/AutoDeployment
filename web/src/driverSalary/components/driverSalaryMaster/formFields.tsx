import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import { driverDialogProps } from './downloadAllDetailsDialog'

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
                <Button variant="contained">Add Expenses</Button>
            </div>
        </div>
    )
}

export default Driver_FormFields

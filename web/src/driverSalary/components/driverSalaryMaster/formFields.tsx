import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import { driverDialogProps } from './downloadAllDetailsDialog'
import { Link } from 'react-router-dom'

const style = { marginRight: '20px' }
const downloadButton = (setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (
        <Button variant="contained" sx={style} onClick={() => setActivateDialog(true)}>
            Download Details
        </Button>
    )
}

const addExpensesButton = (
    <Link to={'/driverSalary/employee-salary/addexpenses'}>
        <Button color="primary" variant="contained" data-testid={'new-trip-button'}>
            Add Expense
        </Button>
    </Link>
)

const buttons = (setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (
        <div>
            {downloadButton(setActivateDialog)}
            {addExpensesButton}
        </div>
    )
}

const Driver_FormFields: FC<driverDialogProps> = ({ setActivateDialog }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 20px 0 0' }}>
            <Typography variant="h6">List of Trips</Typography>
            {buttons(setActivateDialog)}
        </div>
    )
}

export default Driver_FormFields

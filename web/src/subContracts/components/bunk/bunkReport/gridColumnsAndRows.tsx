import { Button } from '@mui/material'
import { Row } from '../../transporter/transporterReport/transporterReportShow'
import { accType, bunkDetailsProps } from '../addBunk/types'
import EditNoteIcon from '@mui/icons-material/EditNote'

export const columns = [
    { field: 'index', headerName: '#', flex: 0.1 },
    { field: 'bunkName', headerName: 'Name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'bunkType', headerName: 'Type', flex: 1 },
    { field: 'accountNumber', headerName: 'Account Number', flex: 1 },
    { field: 'accountHolder', headerName: 'Account Holder', flex: 1 },
    { field: 'branchName', headerName: 'Branch', flex: 1 },
    { field: 'ifsc', headerName: 'IFSC', flex: 1 },
    { field: 'accountTypeName', headerName: 'Account Type', flex: 1 },
    { field: 'contactPersonName', headerName: 'Contact Person', flex: 1 },
    { field: 'contactPersonNumber', headerName: 'Contact Person Number', flex: 1 },
    { field: 'emailId', headerName: 'E-Mail', flex: 1 },
    { field: 'creaditDays', headerName: 'Credit Days', flex: 1 },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params: { handleEdit: (arg: Row) => void; row: Row }) => (
            <Button onClick={() => params.handleEdit(params.row as Row)} variant="text">
                <EditNoteIcon />
            </Button>
        )
    }
]

export const alignRowDetails = (bunkDetails: bunkDetailsProps[], accTypes: accType[]) => {
    return bunkDetails.map((bunk, index) => {
        const account = accTypes.find((acc) => acc.accountTypeNumber === bunk.accountTypeNumber)
        return {
            ...bunk,
            index: index + 1,
            accountTypeName: account?.accountTypeName
        }
    })
}

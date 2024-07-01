import { DataGrid } from '@mui/x-data-grid'

const column = [
    { field: 'billNumber', headerName: 'Bill Number', width: 150, flex: 1 },
    { field: 'dateCreated', headerName: 'Date Created', width: 150, flex: 1 },
    { field: 'company', headerName: 'Company', width: 200, flex: 1 },
    { field: 'amount', headerName: 'Amount', width: 150, flex: 1 },
    {
        field: 'pdfLink',
        headerName: 'PDF File Link',
        width: 200,
        flex: 1,
        renderCell: (params: any) => (
            <a href={params.pdfLink} target="_blank" rel="noopener noreferrer">
                View PDF
            </a>
        )
    }
]
const rows = [
    {
        id: 1,
        billNumber: 'MGL23A-0',
        dateCreated: '2053-06-26',
        company: 'ULTRATECH CEMENT LIMITED',
        amount: '40000',
        pdfLink: '#'
    }
]

const InvoiceDataGrid = () => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={column} />
        </div>
    )
}

export default InvoiceDataGrid

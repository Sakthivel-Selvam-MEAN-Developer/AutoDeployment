import { Box, Tabs, Tab, Typography, Button } from '@mui/material'
import { TabPanelProps } from '../../paymentDues/list'
import { FC, useState } from 'react'
import DataGridTable from './dataGrid'
import { columns, getRows, row } from './gridColumnsAndRowsToAddAdvisory'
import { updateShortageDetails } from '../../../services/viewInvoice'
import { getAmt, getAmtBill } from './shortageFormFields'
import { invoice } from './list'
import { update } from './addAdvisory'
export interface grid {
    invoice: invoice
    setUpdate: React.Dispatch<React.SetStateAction<update>>
    update: update
    onFilter: () => void
}
const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

const tabs = ['Taxable Amount', 'GST Amount']
const InvoiceTabs: FC<grid> = ({ invoice, setUpdate, update, onFilter }) => {
    const height = { height: '20px' }
    const [value, setValue] = useState(0)
    const onChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    const adjCol = columns.map((column: { field: string }) => {
        return {
            ...column,
            renderCell: (params: { row: row }) => {
                if (column.field === 'shortageAmount') return getAmt(height, setUpdate, update)
                else if (column.field === 'shortageBillNo')
                    return getAmtBill(height, setUpdate, update)
                else if (column.field === 'action')
                    return (
                        <Button
                            variant="contained"
                            onClick={async () => {
                                await updateShortageDetails({
                                    ...update,
                                    invoiceId: params.row.id
                                }).then(onFilter)
                            }}
                        >
                            Add
                        </Button>
                    )
            }
        }
    })
    return (
        <>
            <Box sx={{ width: '100%', bgcolor: '#00000017', marginTop: '30px' }}>
                <Tabs value={value} onChange={onChange} textColor="inherit" variant="fullWidth">
                    {tabs.map((tab) => (
                        <Tab key={tab} label={tab} />
                    ))}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {invoice.count !== 0 ? (
                    <DataGridTable adjCol={adjCol} rows={getRows(invoice.data)} checkBox={false} />
                ) : (
                    <p>No Invoice To Add Shortage ..!</p>
                )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
        </>
    )
}

export default InvoiceTabs

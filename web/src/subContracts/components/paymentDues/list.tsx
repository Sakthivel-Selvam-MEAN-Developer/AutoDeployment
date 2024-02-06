import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import GenerateForm from './generateForm'
import PaymentDues from './paymentDues'
import { exportFile } from './NEFTForm/exportFile.ts'
import { updateNEFTStatus } from '../../services/paymentDues.ts'
interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}
export interface bankDetailsProps {
    bunkName: string
    location: string
    accountNumber: string
    ifsc: string
    accountTypeNumber: number
    name: string
    address: string
}
export interface NEFTDetailsProps {
    id: number
    bankDetails: bankDetailsProps[]
    type: string
    payableAmount: number
}
function CustomTabPanel(props: TabPanelProps) {
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
const PaymentDuesList: React.FC = () => {
    const [value, setValue] = useState(0)
    const [refresh, setRefresh] = useState<boolean>(false)
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => setValue(newValue)
    const handleClick = async () => {
        await exportFile(NEFTDetails)
            .then(() => updateNEFTStatus(paymentDueId))
            .then(() => setRefresh(!refresh))
    }
    const [NEFTDetails, setNEFTDetails] = useState<NEFTDetailsProps[]>([])
    const [paymentDueId, setPaymentDueId] = useState<number[]>([])
    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth">
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Generate Form" />
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Payment Dues" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        data-testid={'new-trip-button'}
                        onClick={handleClick}
                        disabled={NEFTDetails.length === 0}
                    >
                        Generate Form
                    </Button>
                </div>
                <GenerateForm
                    NEFTDetails={NEFTDetails}
                    setNEFTDetails={setNEFTDetails}
                    paymentDueId={paymentDueId}
                    setPaymentDueId={setPaymentDueId}
                    refresh={refresh}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PaymentDues />
            </CustomTabPanel>
        </>
    )
}
export default PaymentDuesList

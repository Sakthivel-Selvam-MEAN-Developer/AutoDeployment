import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import GenerateForm from './generateForm'
import PaymentDues from './paymentDues'
import { exportFile } from './NEFTForm/exportFile.ts'
import { updateNEFTStatus } from '../../services/paymentDues.ts'
import GSTDues, { gstNEFTDetailsProps } from './gstDues.tsx'
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
    const [valueInner, setValueInner] = useState(0)
    const [refresh, setRefresh] = useState<boolean>(false)
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => setValue(newValue)
    const handleChangeInner = (_event: React.SyntheticEvent, newValue: number) =>
        setValueInner(newValue)
    const handleClick = async () => {
        if (NEFTDetails.length !== 0)
            await exportFile(NEFTDetails)
                .then(() => updateNEFTStatus(paymentDueId))
                .then(() => setRefresh(!refresh))
        else if (gstNEFTDetails.length !== 0)
            await exportFile(gstNEFTDetails)
                .then(() => updateNEFTStatus(paymentDueId))
                .then(() => setRefresh(!refresh))
    }
    const [NEFTDetails, setNEFTDetails] = useState<NEFTDetailsProps[]>([])
    const [gstNEFTDetails, setGstNEFTDetails] = useState<gstNEFTDetailsProps[]>([])
    const [paymentDueId, setPaymentDueId] = useState<number[]>([])
    return (
        <>
            <Box sx={{ width: '100%', bgcolor: '#00000017', borderRadius: '10px 10px 0 0' }}>
                <Tabs value={value} onChange={handleChange} textColor="inherit" variant="fullWidth">
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Payment Dues" />
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="GST Dues" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '700px', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={valueInner}
                            onChange={handleChangeInner}
                            textColor="inherit"
                            variant="fullWidth"
                            indicatorColor="secondary"
                        >
                            <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Generate Form" />
                            <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Payment Dues" />
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={valueInner} index={0}>
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
                <CustomTabPanel value={valueInner} index={1}>
                    <PaymentDues />
                </CustomTabPanel>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        data-testid={'new-trip-button'}
                        onClick={handleClick}
                        disabled={gstNEFTDetails.length === 0}
                    >
                        Generate Form
                    </Button>
                </div>
                <GSTDues
                    gstNEFTDetails={gstNEFTDetails}
                    setGstNEFTDetails={setGstNEFTDetails}
                    paymentDueId={paymentDueId}
                    setPaymentDueId={setPaymentDueId}
                    refresh={refresh}
                />
            </CustomTabPanel>
        </>
    )
}
export default PaymentDuesList

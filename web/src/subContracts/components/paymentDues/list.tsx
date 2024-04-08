import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import GenerateForm from './generateForm'
import PaymentDues from './paymentDues'
import { exportFile } from './NEFTForm/exportFile.ts'
import { updateNEFTStatus } from '../../services/paymentDues.ts'
import GSTDues, { gstNEFTDetailsProps } from './gstDues.tsx'
import GSTPaymentDues from './gstPaymentDues.tsx'
interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}
export interface bankDetailsProps {
    bunkName: string
    accountNumber: string
    ifsc: string
    accountTypeNumber: number
    name: string
    branchName: string
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
    const [initialDue, setInitialDue] = useState(0)
    const [fuelPay, setFuelPay] = useState(0)
    const [finalPay, setFinalPay] = useState(0)
    const [gstPay, setGstPay] = useState(0)
    const [refresh, setRefresh] = useState<boolean>(false)
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => setValue(newValue)
    const handleInitialPay = (_event: React.SyntheticEvent, newValue: number) =>
        setInitialDue(newValue)
    const handleFuelPay = (_event: React.SyntheticEvent, newValue: number) => setFuelPay(newValue)
    const handleFinalPay = (_event: React.SyntheticEvent, newValue: number) => setFinalPay(newValue)
    const handleGstPay = (_event: React.SyntheticEvent, newValue: number) => setGstPay(newValue)
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
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="initial pay" />
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Fuel Pay" />
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="Final pay" />
                    <Tab sx={{ borderBottom: '1px solid #e8e8e8' }} label="GST Pay" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '700px', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={initialDue}
                            onChange={handleInitialPay}
                            textColor="inherit"
                            variant="fullWidth"
                            indicatorColor="secondary"
                        >
                            <Tab
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label="Generate Form (Initial Pay)"
                            />
                            <Tab
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label="Add Transaction ID (Initial Pay)"
                            />
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={initialDue} index={0}>
                    <div style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            data-testid={'generate-file-button'}
                            onClick={handleClick}
                            disabled={NEFTDetails.length === 0}
                        >
                            Generate File
                        </Button>
                    </div>
                    <GenerateForm
                        NEFTDetails={NEFTDetails}
                        setNEFTDetails={setNEFTDetails}
                        paymentDueId={paymentDueId}
                        setPaymentDueId={setPaymentDueId}
                        refresh={refresh}
                        type={'initial pay'}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={initialDue} index={1}>
                    <PaymentDues type="initial pay" />
                </CustomTabPanel>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '700px', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={fuelPay}
                            onChange={handleFuelPay}
                            textColor="inherit"
                            variant="fullWidth"
                            indicatorColor="secondary"
                        >
                            <Tab
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label="Generate Form (Fuel Pay)"
                            />
                            <Tab
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label="Add Transaction ID (Fuel Pay)"
                            />
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={fuelPay} index={0}>
                    <div style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            data-testid={'new-trip-button'}
                            onClick={handleClick}
                            disabled={gstNEFTDetails.length === 0}
                        >
                            Generate File
                        </Button>
                    </div>
                    <GenerateForm
                        NEFTDetails={NEFTDetails}
                        setNEFTDetails={setNEFTDetails}
                        paymentDueId={paymentDueId}
                        setPaymentDueId={setPaymentDueId}
                        refresh={refresh}
                        type={'fuel pay'}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={fuelPay} index={1}>
                    <PaymentDues type="initial pay" />
                </CustomTabPanel>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '700px', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={finalPay}
                            onChange={handleFinalPay}
                            textColor="inherit"
                            variant="fullWidth"
                            indicatorColor="secondary"
                        >
                            <Tab
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label="Generate Form (Final Pay)"
                            />
                            <Tab
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label="Add Transaction ID (Final Pay)"
                            />
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={finalPay} index={0}>
                    <div style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            data-testid={'new-trip-button'}
                            onClick={handleClick}
                            disabled={gstNEFTDetails.length === 0}
                        >
                            Generate File
                        </Button>
                    </div>
                    <GenerateForm
                        NEFTDetails={NEFTDetails}
                        setNEFTDetails={setNEFTDetails}
                        paymentDueId={paymentDueId}
                        setPaymentDueId={setPaymentDueId}
                        refresh={refresh}
                        type={'final pay'}
                    />
                </CustomTabPanel>
                <CustomTabPanel value={finalPay} index={1}>
                    <PaymentDues type={'final pay'} />
                </CustomTabPanel>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '700px', bgcolor: 'background.paper' }}>
                        <Tabs
                            value={gstPay}
                            onChange={handleGstPay}
                            textColor="inherit"
                            variant="fullWidth"
                            indicatorColor="secondary"
                        >
                            <Tab
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label="Generate Form (GST Pay)"
                            />
                            <Tab
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label="Add Transaction ID (GST Pay)"
                            />
                        </Tabs>
                    </Box>
                </div>
                <CustomTabPanel value={gstPay} index={0}>
                    <div style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            data-testid={'new-trip-button'}
                            onClick={handleClick}
                            disabled={gstNEFTDetails.length === 0}
                        >
                            Generate File
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
                <CustomTabPanel value={gstPay} index={1}>
                    <GSTPaymentDues />
                </CustomTabPanel>
            </CustomTabPanel>
        </>
    )
}
export default PaymentDuesList

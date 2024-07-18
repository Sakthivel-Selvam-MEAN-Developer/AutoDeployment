import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import GenerateForm from './generateForm'
import PaymentDues from './paymentDues'
// import { exportFile } from './NEFTForm/exportFile.ts'
import { donwloadNEFTFile } from '../../services/paymentDues.ts'
import GSTDues, { gstNEFTDetailsProps } from './gstDues.tsx'
import GSTPaymentDues from './gstPaymentDues.tsx'
import NEFTDialog from './neftDialog.tsx'
import { CheckUser } from '../../../auth/checkUser.tsx'
import saveAs from 'file-saver'
import { paymentDueContext } from './paymentDueContext.ts'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { PaymentDueDateFilter } from './PaymentDueDateFilter.tsx'
import { dateProps } from '../invoice/generateInvoice/list.tsx'
dayjs.extend(utc)

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
    accountHolder: string
    name: string
    branchName: string
}
interface dataProps {
    type: string
    bankDetails: bankDetailsProps[]
    payableAmount: number
}
export interface NEFTDetailsProps {
    id: number
    bankDetails: bankDetailsProps[]
    type: string
    payableAmount: number
    vehicleNumber: string
    date: string
    location: string
    invoiceNumber: string
    transporterName: string
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
const PaymentDuesList: React.FC = () => {
    const authoriser = CheckUser()
    const [value, setValue] = useState(0)
    const [initialDue, setInitialDue] = useState(0)
    const [fuelPay, setFuelPay] = useState(0)
    const [finalPay, setFinalPay] = useState(0)
    const [gstPay, setGstPay] = useState(0)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [NEFTDetails, setNEFTDetails] = useState<NEFTDetailsProps[]>([])
    const [gstNEFTDetails, setGstNEFTDetails] = useState<gstNEFTDetailsProps[]>([])
    const [paymentDueId, setPaymentDueId] = useState<number[]>([])
    const [activate, setActivate] = useState<boolean>(false)
    const [type, setType] = useState<string>('')
    const [paymentDueDate, setPaymentDueDate] = useState<string | null>(null)
    const [paymentDueDateEpoch, setPaymentDueDateEpoch] = useState<number>(
        dayjs.utc().startOf('day').unix()
    )
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => setValue(newValue)
    const handleInitialPay = (_event: React.SyntheticEvent, newValue: number) =>
        setInitialDue(newValue)
    const handleFuelPay = (_event: React.SyntheticEvent, newValue: number) => setFuelPay(newValue)
    const handleFinalPay = (_event: React.SyntheticEvent, newValue: number) => setFinalPay(newValue)
    const handleGstPay = (_event: React.SyntheticEvent, newValue: number) => setGstPay(newValue)
    const handleDonwloadNEFT = async () => {
        if (NEFTDetails.length !== 0 || gstNEFTDetails.length !== 0) {
            const bankDetails: dataProps[] = NEFTDetails.length !== 0 ? NEFTDetails : gstNEFTDetails
            const iobDetails: dataProps[] = []
            const nonIobDetails: dataProps[] = []
            bankDetails.forEach((detail) => {
                if (detail.bankDetails[0].ifsc.startsWith('IOBA')) {
                    iobDetails.push(detail)
                } else {
                    nonIobDetails.push(detail)
                }
            })
            if (nonIobDetails.length !== 0) {
                await donwloadNEFTFile(nonIobDetails)
                    .then((data) => {
                        const { fileName: name, data: fileContent } = data
                        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' })
                        saveAs(blob, name)
                    })
                    // .then(() => updateNEFTStatus(paymentDueId))
                    .then(reset)
            }
            if (iobDetails.length !== 0) {
                await donwloadNEFTFile(iobDetails)
                    .then((datas) => {
                        const { fileName: name, data: fileContent } = datas
                        const blob = new Blob([fileContent], {
                            type: 'text/plain;charset=utf-8'
                        })
                        saveAs(blob, name)
                    })
                    // .then(() => updateNEFTStatus(paymentDueId))
                    .then(reset)
            }
        }
        // else if (gstNEFTDetails.length !== 0) {
        //     await exportFile(gstNEFTDetails)
        //         .then(() => updateNEFTStatus(paymentDueId))
        //         .then(reset)
        // }
    }
    const tabs = ['initial pay', 'Fuel Pay', 'Final pay', 'GST Pay']
    const reset = () => {
        setActivate(false)
        setRefresh(!refresh)
    }
    const handleClick = (type: string) => {
        setType(type)
        setActivate(true)
    }
    useEffect(() => {
        if (paymentDueDate !== null) {
            const date = dayjs((paymentDueDate as unknown as dateProps)?.$d).format('DD/MM/YYYY')
            const advanceDate = dayjs.utc(date, 'DD/MM/YYYY').unix()
            setPaymentDueDateEpoch(advanceDate)
        } else if (paymentDueDate === null) {
            setPaymentDueDateEpoch(dayjs.utc().startOf('day').unix())
        }
    }, [paymentDueDate])
    return (
        <>
            <paymentDueContext.Provider value={paymentDueDateEpoch}>
                <PaymentDueDateFilter
                    setPaymentDueDate={setPaymentDueDate}
                    paymentDueDate={paymentDueDate}
                />
                <Box sx={{ width: '100%', bgcolor: '#00000017', borderRadius: '10px 10px 0 0' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        variant="fullWidth"
                    >
                        {tabs.map((label) => (
                            <Tab
                                key={label}
                                sx={{ borderBottom: '1px solid #e8e8e8' }}
                                label={label}
                            />
                        ))}
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
                        <div
                            style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}
                        >
                            {(authoriser.adminAccess || authoriser.semiAccess) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    data-testid={'generate-file-button'}
                                    onClick={() => handleClick('initial pay')}
                                    disabled={NEFTDetails.length === 0}
                                >
                                    Preview File
                                </Button>
                            )}
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
                        <div
                            style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}
                        >
                            {(authoriser.adminAccess || authoriser.semiAccess) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    data-testid={'new-trip-button'}
                                    onClick={() => handleClick('fuel pay')}
                                    disabled={NEFTDetails.length === 0}
                                >
                                    Preview File
                                </Button>
                            )}
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
                        <PaymentDues type="fuel pay" />
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
                        <div
                            style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}
                        >
                            {(authoriser.adminAccess || authoriser.semiAccess) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    data-testid={'new-trip-button'}
                                    onClick={() => handleClick('final pay')}
                                    disabled={NEFTDetails.length === 0}
                                >
                                    Preview File
                                </Button>
                            )}
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
                        <div
                            style={{ display: 'flex', justifyContent: 'end', padding: '20px 24px' }}
                        >
                            {(authoriser.adminAccess || authoriser.semiAccess) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    data-testid={'new-trip-button'}
                                    onClick={() => handleClick('gst pay')}
                                    disabled={gstNEFTDetails.length === 0}
                                >
                                    Preview File
                                </Button>
                            )}
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
                {activate && (
                    <NEFTDialog
                        setActivate={setActivate}
                        NEFTDetails={NEFTDetails}
                        gstNEFTDetails={gstNEFTDetails}
                        handleDonwloadNEFT={handleDonwloadNEFT}
                        type={type}
                    />
                )}
            </paymentDueContext.Provider>
        </>
    )
}
export default PaymentDuesList

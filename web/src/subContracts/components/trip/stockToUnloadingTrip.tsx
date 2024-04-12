import { useEffect, useState } from 'react'
import { Autocomplete, Button, TextField } from '@mui/material'
import { getPricePoint } from '../../services/pricePoint.ts'
import { createStockTrip } from '../../services/unloadingPointTrip.ts'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AllStockProps } from './show.tsx'
import dayjs from 'dayjs'
import { CheckUser } from '../../../auth/checkUser.tsx'

interface dataProps {
    row: AllStockProps
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
    update: boolean
    unloadingPointList: unloadingPointProps[]
    setExpanded: React.Dispatch<React.SetStateAction<number | false>>
}
interface unloadingPointProps {
    id: number
    name: string
    cementCompanyId: number
    pricePointMarkerId: number
}
interface dateProps {
    $d: number
}
const StockToUnloadingFormFields: React.FC<dataProps> = ({
    row,
    setUpdate,
    update,
    unloadingPointList,
    setExpanded
}) => {
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [unloadingPointName, setUnloadingPointName] = useState<string>('')
    const [freightAmount, setFreightAmount] = useState<number>(0)
    const [transporterAmount, setTransporterAmount] = useState<number>(0)
    const [invoiceNumber, setInvoiceNumber] = useState<string>('')
    const [stockDate, setStockDate] = useState<number>(0)
    const authoriser = CheckUser()
    const coverDateToEpoc = (date: any) => {
        const formattedDays =
            date !== null ? dayjs(dayjs((date as unknown as dateProps)?.$d)).unix() : 0
        setStockDate(formattedDays)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const freightAmountFloat = freightAmount.toFixed(2)
        const transporterAmountFloat = transporterAmount.toFixed(2)
        const totalFreightAmountFloat = (row.filledLoad * freightAmount).toFixed(2)
        const totalTransporterAmountFloat = (row.filledLoad * transporterAmount).toFixed(2)
        const details = {
            startDate: stockDate,
            invoiceNumber,
            freightAmount: parseFloat(freightAmountFloat),
            transporterAmount: parseFloat(transporterAmountFloat),
            totalFreightAmount: parseFloat(totalFreightAmountFloat),
            totalTransporterAmount: parseFloat(totalTransporterAmountFloat),
            unloadingPointId,
            loadingPointToStockPointTripId: row.id,
            truckId: row.truckId
        }
        createStockTrip(details).then(() => {
            setExpanded(false)
            setUpdate(!update)
        })
    }
    useEffect(() => {
        if (unloadingPointId !== null)
            getPricePoint(null, unloadingPointId, row.stockPointId).then((pricePoint) => {
                if (pricePoint !== null)
                    setAmount(pricePoint.transporterAmount, pricePoint.freightAmount)
                else setAmount(0, 0)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unloadingPointId])

    const setAmount = (transporterAmount: number, freight: number) => {
        setTransporterAmount(transporterAmount)
        setFreightAmount(freight)
    }
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                rowGap: '10px',
                flexWrap: 'wrap',
                width: '100%'
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', justifyContent: 'left', width: '100%' }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Stock Point Date"
                        name="stockDate"
                        format="DD/MM/YYYY"
                        sx={{ marginRight: '20px' }}
                        onChange={coverDateToEpoc}
                    />
                </LocalizationProvider>
                <TextField
                    id="outlined-basic"
                    label="Invoice Number"
                    name="invoiceNumber"
                    variant="outlined"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                />
                <Autocomplete
                    sx={{ width: '200px', marginLeft: '20px' }}
                    value={unloadingPointName}
                    options={unloadingPointList.map(({ name }) => name)}
                    onChange={(_event, newValue) => {
                        const { id, name } = unloadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        ) || { id: 0, name: '' }
                        setUnloadingPointName(name)
                        setUnloadingPointId(id)
                    }}
                    renderInput={(params) => <TextField {...params} label="Unloading Point" />}
                />
                {authoriser && (
                    <TextField
                        sx={{ marginLeft: '20px' }}
                        id="outlined-number"
                        label="Company Freight"
                        name="freightAmount"
                        type="number"
                        value={freightAmount?.toFixed(2)}
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            inputProps: {
                                step: 1,
                                min: 0,
                                readOnly: true
                            },
                            endAdornment: null
                        }}
                    />
                )}
                <TextField
                    sx={{ marginLeft: '20px' }}
                    id="outlined-number"
                    label="Transporter Freight"
                    name="transporterAmount"
                    type="number"
                    value={transporterAmount?.toFixed(2)}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        inputProps: {
                            step: 1,
                            min: 0,
                            readOnly: true
                        },
                        endAdornment: null
                    }}
                />
                {authoriser && (
                    <TextField
                        sx={{ marginLeft: '20px' }}
                        id="outlined-number"
                        label="Total Freight Amount"
                        name="totalFreightAmount"
                        type="number"
                        value={(row.filledLoad * freightAmount)?.toFixed(2)}
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            inputProps: {
                                step: 1,
                                min: 0,
                                readOnly: true
                            },
                            endAdornment: null
                        }}
                    />
                )}
                <TextField
                    sx={{ marginLeft: '20px' }}
                    id="outlined-number"
                    label="Total Transporter Freight"
                    name="totalTransporterAmount"
                    type="number"
                    value={(row.filledLoad * transporterAmount)?.toFixed(2)}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        inputProps: {
                            step: 1,
                            min: 0,
                            readOnly: true
                        },
                        endAdornment: null
                    }}
                />
                <div style={{ marginLeft: '20px', display: 'flex' }}>
                    <Button
                        disabled={
                            invoiceNumber === '' || unloadingPointName === '' || stockDate === 0
                        }
                        type="submit"
                        sx={{ width: '100px' }}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default StockToUnloadingFormFields

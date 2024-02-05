import { useEffect, useState } from 'react'
import { getAllUnloadingPoint } from '../../services/unloadingPoint.ts'
import { Autocomplete, Button, TextField } from '@mui/material'
import { getPricePoint } from '../../services/pricePoint.ts'
import { createStockTrip } from '../../services/unloadingPointTrip.ts'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface dataProps {
    row: any
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
    update: boolean
}

const StockToUnloadingFormFields: React.FC<dataProps> = ({ row, setUpdate, update }) => {
    const [unloadingPointId, setUnloadingPointId] = useState<number | null>(null)
    const [unloadingPointName, setUnloadingPointName] = useState<string>('')
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [freightAmount, setFreightAmount] = useState<number>(0)
    const [transporterAmount, setTransporterAmount] = useState<number>(0)
    const [invoiceNumber, setInvoiceNumber] = useState<string>('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formattedDays =
            e.target.stockDate !== undefined && e.target.stockDate.value.split('/')
        const MMDDformat = `${formattedDays[1]}.${formattedDays[0]}.${formattedDays[2]}`
        const stockDate = Math.floor(new Date(MMDDformat).getTime() / 1000)

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
            loadingPointToStockPointTripId: row.id
        }
        createStockTrip(details).then(() => setUpdate(!update))
    }
    useEffect(() => {
        getAllUnloadingPoint().then(setUnloadingPointList)
    }, [])
    useEffect(() => {
        getPricePoint(null, unloadingPointId, row.stockPointId).then((pricePoint) => {
            setTransporterAmount(pricePoint.transporterAmount)
            setFreightAmount(pricePoint.freightAmount)
        })
    }, [row.loadingPointId, row.stockPointId, unloadingPointId])

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
                    <DatePicker label="Stock Point Date" name="stockDate" format="DD/MM/YYYY" />
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
                        disabled={invoiceNumber === '' || unloadingPointName === ''}
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

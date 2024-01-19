import { FormEvent, useEffect, useState } from 'react'
import { getAllUnloadingPoint } from '../../services/unloadingPoint.ts'
import { Autocomplete, Button, TextField } from '@mui/material'
import { getPricePoint } from '../../services/pricePoint.ts'
import { createStockTrip } from '../../services/unloadingPointTrip.ts'
import dayjs from 'dayjs'

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const details = {
            startDate: dayjs().unix(),
            invoiceNumber,
            freightAmount,
            transporterAmount,
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
                        const { id, name }: any = unloadingPointList.find(
                            (data: { name: string }) => data.name === newValue
                        )
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
                    value={freightAmount}
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
                    value={transporterAmount}
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

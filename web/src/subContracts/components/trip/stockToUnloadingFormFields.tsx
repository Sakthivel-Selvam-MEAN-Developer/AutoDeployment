import { FormEvent, useEffect, useState } from 'react'
import { getAllUnloadingPoint } from '../../services/unloadingPoint.ts'
import { Autocomplete, TextField } from '@mui/material'
import SubmitButton from '../../../form/button.tsx'
import dayjs from 'dayjs'
import { getPricePoint } from '../../services/pricePoint.ts'
import { createStockTrip } from '../../services/unloadingPointTrip.ts'
interface dataProps {
    row: any
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>
    update: boolean
}

const StockToUnloadingFormFields: React.FC<dataProps> = ({ row, setUpdate, update }) => {
    const [unloadingPointId, setUnloadingPointId] = useState()
    const [unloadingPointName, setUnloadingPointName] = useState('')
    const [unloadingPointList, setUnloadingPointList] = useState([])
    const [freightAmount, setFreightAmount] = useState(row.freightAmount)
    const [transporterPercentage, setTransporterPercentage] = useState<number>(0)
    const [invoiceNumber, setInvoiceNumber] = useState<string>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const details = {
            startDate: dayjs().unix(),
            invoiceNumber: invoiceNumber,
            freightAmount: freightAmount,
            transporterAmount: freightAmount - (freightAmount * transporterPercentage) / 100,
            unloadingPointId,
            loadingPointToStockPointTripId: row.id
        }
        createStockTrip(details)
        setUpdate(!update)
        setInvoiceNumber('')
        setFreightAmount('')
        setUnloadingPointName('')
    }
    useEffect(() => {
        getAllUnloadingPoint().then(setUnloadingPointList)
    }, [])
    useEffect(() => {
        getPricePoint(row.loadingPointId, row.stockPointId).then((pricePoint) =>
            setTransporterPercentage(pricePoint.transporterPercentage)
        )
    }, [row.loadingPointId, row.stockPointId])

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
                    label="Freight Amount"
                    name="freightAmount"
                    type="number"
                    value={freightAmount}
                    onChange={(e) => setFreightAmount(parseInt(e.target.value))}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <div style={{ marginLeft: '20px' }}>
                    <SubmitButton name="Create" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default StockToUnloadingFormFields

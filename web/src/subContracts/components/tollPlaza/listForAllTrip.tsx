import { FC, useEffect, useState } from 'react'
import Submitbutton from './tableBody'
import { getTollLocation } from '../../services/tollPlazaLocation'
import { Props } from './type'
import { ShowTable, Data } from './displayAllTable'
import { displayDataGrid } from './secondTable'
export interface dataGrid {
    row: {
        id: number
        overallTripId: number
        vehicleNumber: string
        startDate: number
        invoiceNumber: string
        loadingPoint: string
        stockPoint: string
        unloadingPoint: string
    }
}
const TollPlazaTable: FC<Props> = ({ trip, reload, setReload, display }) => {
    const [open, setOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState<dataGrid['row'] | null>()
    const [location, setLocation] = useState<{ location: string; id: number }[]>([])
    const [selectedLocation, setSelectedLocation] = useState('')
    const [tollFare, setTollFare] = useState<string>('')
    const [tollEntries, setTollEntries] = useState<
        { location: string; amount: number; overallTripId: number; tollPlazaLocationId: number }[]
    >([])
    useEffect(() => {
        getTollLocation().then(setLocation)
    }, [reload])
    const handleRowClick = (params: dataGrid) => {
        setSelectedRow(params.row)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setSelectedRow(null)
        setSelectedLocation('')
        setTollFare('')
        setTollEntries([])
    }
    const handleAddTollEntry = () => {
        if (selectedLocation && tollFare && selectedRow) {
            const details = location.find((loc) => loc.location === selectedLocation)
            setTollEntries([
                ...tollEntries,
                {
                    location: selectedLocation,
                    amount: parseInt(tollFare),
                    overallTripId: selectedRow.overallTripId,
                    tollPlazaLocationId: details ? details.id : 0
                }
            ])
            setSelectedLocation('')
            setTollFare('')
        }
    }
    const handleSubmit = Submitbutton(tollEntries, setReload, reload, handleClose)
    return (
        <div>
            <div style={{ width: '100%', marginBottom: '20px' }}>{Data(trip, handleRowClick)}</div>
            <div style={{ width: '100%', marginTop: '20px' }}>{ShowTable(display)}</div>
            {displayDataGrid(
                open,
                handleClose,
                selectedLocation,
                location,
                setSelectedLocation,
                tollFare,
                setTollFare,
                tollEntries,
                handleAddTollEntry,
                handleSubmit
            )}
        </div>
    )
}
export default TollPlazaTable

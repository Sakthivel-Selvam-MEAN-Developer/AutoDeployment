import { FC, useEffect, useState } from 'react'
import Submitbutton from './tableBody'
import { getTollLocation } from '../../services/tollPlazaLocation'
import { Props, overallTripp } from './type'
import { ShowTable } from './displayAllTable'
import { Data } from './stateTable'
import { displayDataGrid } from './secondTable'
import { secondDataGrid } from './displaySecondTable'
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
    const [selectedToll, setSelectedToll] = useState<overallTripp['tollPlaza'] | undefined>([])
    const [tollEntries, setTollEntries] = useState<
        { location: string; amount: number; overallTripId: number; tollPlazaLocationId: number }[]
    >([])
    const [openTollDialog, setOpenTollDialog] = useState(false)
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
    const handleToll = (params: dataGrid) => {
        setOpenTollDialog(true)
        const tollPlazaPlace = display.find((chk) => chk.id === params.row.overallTripId)
        console.log(tollPlazaPlace)
        setSelectedToll(tollPlazaPlace?.tollPlaza)
        //    console.log(selectedLocation,tollFare,selectedRow)
        //    if (selectedLocation && tollFare && selectedRow) {
        //     const details = location.map((loc) => loc.location === selectedLocation)
        //     console.log(details)
        // }
    }
    const handleCloseButton = () => {
        setOpenTollDialog(false)
    }
    const handleAddTollEntry = () => {
        if (selectedLocation && tollFare && selectedRow) {
            const details = location.find((loc) => loc.location === selectedLocation)
            console.log(details)
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
            <div style={{ width: '100%', marginTop: '20px' }}>{ShowTable(display, handleToll)}</div>
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
            {secondDataGrid(openTollDialog, handleToll, handleCloseButton, selectedToll)}
        </div>
    )
}
export default TollPlazaTable

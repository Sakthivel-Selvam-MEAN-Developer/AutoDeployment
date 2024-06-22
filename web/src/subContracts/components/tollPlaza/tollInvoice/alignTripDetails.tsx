import './tollFormat.css'
import { overallTrip, trip } from '../type'
import BillDetailsDialog from './dialogToGetBillDetails'
import PreviewSelectedTrips from './dialogPreviewForSelectedTrips'
import { useState } from 'react'
export interface props {
    trip: { trip: trip; toll: overallTrip['tollPlaza']; id: number; tollDetails?: tollDetails }[]
    setDialog: React.Dispatch<React.SetStateAction<boolean>>
    dialog: boolean
}
export interface tollDetails {
    [key: string]: number
}
const ListTrips: React.FC<props> = ({ trip, setDialog, dialog }) => {
    const [previewDialog, setPreviewDialog] = useState(false)
    const [billDetail, setBillDetail] = useState({ number: '', date: 0 })
    return (
        <>
            <BillDetailsDialog
                trips={trip}
                fieldDialog={dialog}
                setDialog={setDialog}
                setPreDialog={setPreviewDialog}
                setBill={setBillDetail}
                bill={billDetail}
            />
            {previewDialog && (
                <PreviewSelectedTrips
                    trips={trip}
                    setPreDialog={setPreviewDialog}
                    preDialog={previewDialog}
                    bill={billDetail}
                />
            )}
        </>
    )
}
export default ListTrips

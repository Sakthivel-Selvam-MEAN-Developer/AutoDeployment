import './invoiceFormat/tollFormat.css'
import { overallTrip, trip } from '../type'
import BillDetailsDialog from './dialogToGetBillDetails'
import PreviewSelTrips from './dialogPreviewForSelectedTrips'
import { useState } from 'react'
interface truck {
    vehicleNumber: string
}
export interface props {
    trip: {
        trip: trip
        toll: overallTrip['tollPayment']
        id: number
        tollDetails?: tollDetails
        truck: truck
    }[]
    setDialog: React.Dispatch<React.SetStateAction<boolean>>
    dialog: boolean
    setLoad: React.Dispatch<React.SetStateAction<boolean>>
    reload: boolean
}
export interface tollDetails {
    [key: string]: number
}
const ListTrips: React.FC<props> = ({ trip, setDialog, dialog, setLoad, reload }) => {
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
                <PreviewSelTrips
                    trips={trip}
                    setPreDialog={setPreviewDialog}
                    preDialog={previewDialog}
                    bill={billDetail}
                    setLoad={setLoad}
                    reload={reload}
                />
            )}
        </>
    )
}
export default ListTrips

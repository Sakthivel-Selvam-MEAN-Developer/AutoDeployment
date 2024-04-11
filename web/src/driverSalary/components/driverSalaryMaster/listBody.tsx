import { ReactElement } from 'react'
import Driver_Dialog_For_All_Details from './downloadAllDetailsDialog'
import Driver_Table, { tripProps } from './driverTable'
import Driver_FormFields from './formFields'

type driverTableType = (
    driverTripDetails: tripProps[],
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
) => ReactElement
export const driverTable: driverTableType = (driverTripDetails, setActivateDialog) => {
    return (
        <Driver_Table driverTripDetails={driverTripDetails} setActivateDialog={setActivateDialog} />
    )
}
export const driverFormFields = (
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return <Driver_FormFields setActivateDialog={setActivateDialog} />
}
type driverDialogType = (
    activateDialog: boolean,
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
) => ReactElement
export const driverDialog: driverDialogType = (activateDialog, setActivateDialog) => {
    return (
        <>
            {activateDialog && (
                <Driver_Dialog_For_All_Details setActivateDialog={setActivateDialog} />
            )}
        </>
    )
}

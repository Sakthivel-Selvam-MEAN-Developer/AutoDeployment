import { ReactElement } from 'react'
import DriverDialogForAllDetails from './downloadAllDetailsDialog'
import DriverTable, { tripProps } from './driverTable'
import DriverFormFields from './formFields'
import { expensesProps } from './driverDetails'

type driverTableType = (
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>,
    driverTrips: tripProps[],
    expenses: expensesProps[]
) => ReactElement
export const driverTable: driverTableType = (setActivateDialog, driverTrips, expenses) => {
    return (
        <DriverTable
            setActivateDialog={setActivateDialog}
            driverTrips={driverTrips}
            expenses={expenses}
        />
    )
}
export const driverFormFields = (
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
) => <DriverFormFields setActivateDialog={setActivateDialog} />

type driverDialogType = (
    activateDialog: boolean,
    setActivateDialog: React.Dispatch<React.SetStateAction<boolean>>
) => ReactElement
export const driverDialog: driverDialogType = (activateDialog, setActivateDialog) => {
    return (
        <>{activateDialog && <DriverDialogForAllDetails setActivateDialog={setActivateDialog} />}</>
    )
}

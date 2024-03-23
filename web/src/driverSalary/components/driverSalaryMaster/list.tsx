import { FC, useState } from 'react'
import Driver_FormFields from './formFields'
import Driver_Table from './driverTable'
import Driver_Dialog_For_All_Details from './downloadAllDetailsDialog'

const List_Trip_Details: FC = () => {
    const [activateDialog, setActivateDialog] = useState(false)
    return (
        <>
            <Driver_FormFields setActivateDialog={setActivateDialog} />
            <Driver_Table setActivateDialog={setActivateDialog} />
            {activateDialog && (
                <Driver_Dialog_For_All_Details setActivateDialog={setActivateDialog} />
            )}
        </>
    )
}

export default List_Trip_Details

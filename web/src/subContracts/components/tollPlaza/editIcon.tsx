import { TableCell, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import TollPlazaTable from './listForAllTrip'
import { overallTripp } from './tollTypes'
export function tableColumns(
    editMode: { [key: number]: boolean },
    toll: { id: number; tollPlazaLocation: { id: number; location: string }; amount: number },
    handleSaveClick: (id: number, tollPaymentId: number) => void,
    handleEditClick: (id: number) => void
) {
    return (
        <TableCell>
            {editMode[toll.tollPlazaLocation.id] ? (
                <Button onClick={() => handleSaveClick(toll.tollPlazaLocation.id, toll.id)}>
                    <SaveIcon />
                </Button>
            ) : (
                <Button onClick={() => handleEditClick(toll.tollPlazaLocation.id)}>
                    <EditIcon />
                </Button>
            )}
        </TableCell>
    )
}
export const tollPlazaDisplay = (
    trips: never[],
    setReload: React.Dispatch<React.SetStateAction<boolean>>,
    reload: boolean,
    setDisplay: React.Dispatch<React.SetStateAction<overallTripp[]>>,
    display: overallTripp[]
) => {
    return (
        <TollPlazaTable
            trip={trips}
            setReload={setReload}
            reload={reload}
            setDisplay={setDisplay}
            display={display}
        />
    )
}

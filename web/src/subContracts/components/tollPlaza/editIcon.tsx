import { TableCell, Button } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
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

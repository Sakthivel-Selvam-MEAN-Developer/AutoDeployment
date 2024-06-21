import { Dialog, DialogTitle } from '@mui/material'
import { dataGrid } from './listForAllTrip'
import { overallTripp } from './type'
import { CloseButton } from './show'
import { showDialogBox } from './showDialogBox'
export function secondDataGrid(
    openTollDialog: boolean,
    handleToll: (params: dataGrid) => void,
    handleCloseButton: () => void,
    selectedToll: overallTripp['tollPlaza'] | undefined
) {
    return (
        <Dialog open={openTollDialog} onClose={handleToll}>
            <DialogTitle>TollPlaza Locations</DialogTitle>
            {showDialogBox(selectedToll)}
            {CloseButton(handleCloseButton)}
        </Dialog>
    )
}

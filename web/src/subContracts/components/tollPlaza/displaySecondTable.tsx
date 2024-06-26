import { Dialog, DialogTitle } from '@mui/material'
import { dataGrid } from './listForAllTrip'
import { overallTripp } from './type'
import { CloseButton } from './show'
import { ShowDialogBox } from './showDialogBox'
export function secondDataGrid(
    openTollDialog: boolean,
    handleToll: (params: dataGrid) => void,
    handleCloseButton: () => void,
    selectedToll: overallTripp['tollPayment'] | undefined
) {
    return (
        <Dialog open={openTollDialog} onClose={handleToll}>
            <DialogTitle>TollPlaza Locations</DialogTitle>
            {ShowDialogBox(selectedToll)}
            {CloseButton(handleCloseButton)}
        </Dialog>
    )
}

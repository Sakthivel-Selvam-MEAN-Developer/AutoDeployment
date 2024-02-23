import calculateUpdatedStops, { stopProps } from './deleteStops'

const deleteStop = (stopToDelete: stopProps, deleteRowIndex: number, allStops: stopProps[]) => {
    const remainingStops = allStops
        .filter((deleteRow) => deleteRow.id !== stopToDelete.id)
        .map((stop, index) => calculateUpdatedStops(stop, index, deleteRowIndex, stopToDelete))
    return remainingStops
}

export default deleteStop

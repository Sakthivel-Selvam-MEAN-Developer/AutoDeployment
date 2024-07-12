export const findTrip = (overallTrip: any) => {
    if (overallTrip.loadingPointToStockPointTrip !== null) {
        return { trip: overallTrip.loadingPointToStockPointTrip, type: 'LoadingToStock' }
    }
    return { trip: overallTrip.loadingPointToUnloadingPointTrip, type: 'LoadingToUnloading' }
}

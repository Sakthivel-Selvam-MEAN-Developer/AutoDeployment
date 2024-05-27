export interface shortageProps {
    filledLoad: number
    unloadedQuantity: number
    shortageAmount: number
}
export const calculateShortage = (unloadedQuantity: number, oldShortage: shortageProps) => {
    const newShortage = {
        unloadedQuantity,
        shortageQuantity: oldShortage.filledLoad - unloadedQuantity,
        shortageAmount:
            oldShortage.filledLoad > 100 ? (oldShortage.filledLoad - unloadedQuantity) * 8 : 0
    }
    return newShortage
}

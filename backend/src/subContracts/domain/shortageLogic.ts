export interface shortageProps {
    filledLoad: number
    unloadedQuantity: number
    shortageAmount: number
    approvalStatus: boolean
}
const shortageAmount = (newShortage: shortageProps, oldShortage: shortageProps) => {
    if (oldShortage.filledLoad - newShortage.unloadedQuantity > 100) {
        return (oldShortage.filledLoad - newShortage.unloadedQuantity) * 8
    }
    return 0
}
export const calculateShortage = (newShortage: shortageProps, oldShortage: shortageProps) => {
    const amount = shortageAmount(newShortage, oldShortage)
    const shortage = {
        unloadedQuantity: newShortage.unloadedQuantity,
        shortageQuantity: oldShortage.filledLoad - newShortage.unloadedQuantity,
        shortageAmount: newShortage.approvalStatus === true ? 0 : amount,
        approvalStatus: newShortage.approvalStatus
    }
    return shortage
}

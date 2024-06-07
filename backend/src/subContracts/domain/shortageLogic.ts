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
type shortCal = (filledLoad: number, unload: number) => number | false

export const amountCalculation = (filledLoad: number, unload: number) => {
    if (filledLoad * 1000 >= unload) {
        return (filledLoad * 1000 - unload) * 8
    }
    return false
}

export const shortageAmountCalculation: shortCal = (filledLoad, unload) => {
    if (filledLoad * 1000 - unload > 100) return amountCalculation(filledLoad, unload)

    return false
}

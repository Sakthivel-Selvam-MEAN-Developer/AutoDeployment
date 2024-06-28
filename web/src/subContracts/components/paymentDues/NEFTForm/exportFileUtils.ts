export interface dataProps {
    type: string
    bankDetails: bankDetailsProps[]
    payableAmount: number
}
interface bankDetailsProps {
    ifsc: string
    accountTypeNumber: number
    accountNumber: number | string
    accountHolder: string
    bunkName: string
    name: string
    branchName: string
}
export const getNeftType = (type: string) => {
    return type === 'initial pay'
        ? 'INITIALPAY'
        : type === 'fuel pay'
          ? 'FUELPAY'
          : type === 'final pay'
            ? 'FINALPAY'
            : 'GSTPAY'
}

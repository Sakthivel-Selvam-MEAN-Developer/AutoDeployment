import dayjs from 'dayjs'

interface bankDetailsProps {
    ifsc: string
    accountTypeNumber: number
    accountNumber: number | string
    accountHolder: string
    name: string
    branchName: string
}
interface typeProps {
    neftType: string
    type: string
}
export interface dataProps {
    [x: string]: any
    type: string
    bankDetails: bankDetailsProps[]
    payableAmount: number
}
let NEFTDataHeaders: string
const getType = (type: string) => {
    if (type === 'initial pay') return { neftType: 'INITIALPAY', type: 'MagnumAdvance' }
    if (type === 'fuel pay') return { neftType: 'FUELPAY', type: 'MagnumFuel' }
    if (type === 'final pay') return { neftType: 'FINALPAY', type: 'MagnumFinal' }
    if (type === 'gst pay') return { neftType: 'GSTPAY', type: 'MagnumGST' }
}
const otherBank = (NEFTData: dataProps, type: string | undefined) => {
    return `${NEFTData.bankDetails[0].ifsc},${NEFTData.bankDetails[0].accountTypeNumber},${NEFTData.bankDetails[0].accountNumber},${NEFTData.bankDetails[0].accountHolder},${NEFTData.bankDetails[0].branchName},${type},${NEFTData.payableAmount}\n`
}
const ifscCheckForIob = (NEFTData: dataProps) => {
    const ifscPattern = /^IOBA/
    return ifscPattern.test(NEFTData.bankDetails[0].ifsc)
}
const getNEFTBodyForIob = (NEFTData: dataProps, type: string | undefined) => {
    const ifscCheck = ifscCheckForIob(NEFTData)
    if (ifscCheck) {
        NEFTDataHeaders = 'Account number,Amount,Narration\n'
        return `${NEFTData.bankDetails[0].accountNumber},${NEFTData.payableAmount},${type}\n`
    }
    NEFTDataHeaders =
        'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n'
    return otherBank(NEFTData, type)
}
const getNEFTBody = (NEFTData: dataProps[]) => {
    let types: typeProps | undefined = { neftType: '', type: '' }
    let NEFTDataBody: string = ''
    NEFTData.forEach((data) => {
        types = getType(data.type)
        const NEFTData = getNEFTBodyForIob(data, types?.type)
        NEFTDataBody += NEFTData
    })
    return { body: NEFTDataBody, fileType: types.neftType }
}
export const getNEFTData = async (NEFTData: dataProps[]) => {
    const { body: NEFTDataBody, fileType } = getNEFTBody(NEFTData)
    const date = dayjs().format('DDMMYYYY')
    const finalData = {
        fileName: `${fileType}${date}.txt`,
        data: NEFTDataHeaders + NEFTDataBody
    }
    return finalData
}

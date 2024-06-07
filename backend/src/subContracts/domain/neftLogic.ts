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
    type: string
    bankDetails: bankDetailsProps[]
    payableAmount: number
}
const getType = (type: string) => {
    if (type === 'initial pay') return { neftType: 'INITIALPAY', type: 'MagnumAdvance' }
    if (type === 'fuel pay') return { neftType: 'FUELPAY', type: 'MagnumFuel' }
    if (type === 'final pay') return { neftType: 'FINALPAY', type: 'MagnumFinal' }
    if (type === 'gst pay') return { neftType: 'GSTPAY', type: 'MagnumGST' }
}
const getNEFTBody = (NEFTData: dataProps[]) => {
    let types: typeProps | undefined = { neftType: '', type: '' }
    let NEFTDataBody: string = ''
    NEFTData.forEach((data) => {
        types = getType(data.type)
        NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].accountHolder},${data.bankDetails[0].branchName},${types?.type},${data.payableAmount}\n`
    })
    return { body: NEFTDataBody, fileType: types.neftType }
}
export const getNEFTData = (NEFTData: dataProps[]) => {
    const NEFTDataHeaders =
        'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n'
    const { body: NEFTDataBody, fileType } = getNEFTBody(NEFTData)
    const date = dayjs().format('DDMMYYYY')
    const finalData = {
        fileName: `${fileType}${date}.txt`,
        data: NEFTDataHeaders + NEFTDataBody
    }
    return finalData
}

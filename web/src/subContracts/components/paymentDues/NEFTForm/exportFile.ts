import { saveAs } from 'file-saver'
import dayjs from 'dayjs'
interface dataProps {
    type: string
    bankDetails: bankDetailsProps[]
    payableAmount: number
}
interface bankDetailsProps {
    ifsc: string
    accountTypeNumber: number
    accountNumber: number | string
    bunkName: string
    name: string
    branchName: string
}
export const exportFile = async (NEFTData: dataProps[]) => {
    let type = ''
    const date = dayjs().format('DDMMYYYY')
    const NEFTDataHeaders =
        'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n'
    let NEFTDataBody: string = ''

    NEFTData.map((data) => {
        if (data.type === 'fuel pay')
            NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].bunkName},${data.bankDetails[0].branchName},MagnumFuel,${data.payableAmount}\n`
        else {
            if (data.type === 'initial pay') type = 'MagnumAdvance'
            else if (data.type === 'final pay') type = 'MagnumFinal'
            else if (data.type === 'gst pay') type = 'MagnumGST'
            NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].name},${data.bankDetails[0].branchName},${type},${data.payableAmount}\n`
        }
    })
    const blob = new Blob([NEFTDataHeaders + NEFTDataBody], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `NEFT${date}.txt`)
}

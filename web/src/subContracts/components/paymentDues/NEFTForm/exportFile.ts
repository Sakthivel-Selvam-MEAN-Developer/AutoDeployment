import { saveAs } from 'file-saver'
import { NEFTDetailsProps } from '../list'

export const exportFile = async (NEFTData: NEFTDetailsProps[]) => {
    const NEFTDataHeaders =
        'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n'
    let NEFTDataBody: string = ''
    NEFTData.map((data) => {
        if (data.type === 'fuel pay')
            NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].bunkName},${data.bankDetails[0].location},${data.type},${data.payableAmount}\n`
        else
            NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].name},${data.bankDetails[0].address},${data.type},${data.payableAmount}\n`
    })
    const blob = new Blob([NEFTDataHeaders + NEFTDataBody], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'NEFT.txt')
}

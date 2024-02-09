import { saveAs } from 'file-saver'
import dayjs from 'dayjs'

export const exportFile = async (NEFTData: any[]) => {
    console.log(NEFTData)

    let type = ''
    const date = dayjs().format('DD/MM/YYYY')
    const NEFTDataHeaders =
        'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n'
    let NEFTDataBody: string = ''

    NEFTData.map((data) => {
        if (data.type === 'fuel pay')
            NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].bunkName},${data.bankDetails[0].location},Magnum-Fuel,${data.payableAmount}\n`
        else {
            if (data.type === 'inital pay') type = 'Magnum-Advance'
            else if (data.type === 'final pay') type = 'Magnum-Final'
            else if (data.type === 'gst pay') type = 'Magnum-GST'
            NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].name},${data.bankDetails[0].address},${type},${data.payableAmount}\n`
        }
    })
    const blob = new Blob([NEFTDataHeaders + NEFTDataBody], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `NEFT-${date}.txt`)
}

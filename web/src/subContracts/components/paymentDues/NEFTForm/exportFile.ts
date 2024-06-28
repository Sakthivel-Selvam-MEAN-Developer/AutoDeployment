import { saveAs } from 'file-saver'
import dayjs from 'dayjs'
import { dataProps, getNeftType } from './exportFileUtils'

const getType = (type: string) => {
    return type === 'initial pay'
        ? 'MagnumAdvance'
        : type === 'fuel pay'
          ? 'MagnumFuel'
          : type === 'final pay'
            ? 'MagnumFinal'
            : 'MagnumGST'
}
export const exportFile = async (NEFTData: dataProps[]) => {
    let type: string | undefined = ''
    let NEFTType: string | undefined = ''
    const date = dayjs().format('DDMMYYYY')
    const NEFTDataHeaders =
        'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n'
    let NEFTDataBody: string = ''

    NEFTData.map((data) => {
        NEFTType = getNeftType(data.type)
        type = getType(data.type)
        NEFTDataBody += `${data.bankDetails[0].ifsc},${data.bankDetails[0].accountTypeNumber},${data.bankDetails[0].accountNumber},${data.bankDetails[0].accountHolder},${data.bankDetails[0].branchName},${type},${data.payableAmount}\n`
    })
    const blob = new Blob([NEFTDataHeaders + NEFTDataBody], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `${NEFTType}${date}.txt`)
}

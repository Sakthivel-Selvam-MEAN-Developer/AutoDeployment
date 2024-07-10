import dayjs from 'dayjs'
import { getNEFTData } from './neftLogic.ts'

const NeftData = {
    id: 1,
    bankDetails: [
        {
            name: 'Deepak Logistics Pvt Ltd',
            accountNumber: '435534523',
            ifsc: 'zxy1234',
            accountTypeNumber: 10,
            branchName: 'Erode',
            accountHolder: 'sakthi'
        }
    ],
    type: 'initial pay',
    payableAmount: 28350,
    vehicleNumber: 'TN93D5512',
    date: '24/11/2023',
    location: 'Chennai-south - Salem',
    invoiceNumber: 'ABC123',
    transporterName: 'Deepak Logistics Pvt Ltd'
}
const NeftDataForIob = {
    id: 1,
    bankDetails: [
        {
            name: 'Deepak Logistics Pvt Ltd',
            accountNumber: '435534523',
            ifsc: 'IOBA000023',
            accountTypeNumber: 10,
            branchName: 'Erode',
            accountHolder: 'sakthi'
        }
    ],
    type: 'initial pay',
    payableAmount: 28350,
    vehicleNumber: 'TN93D5512',
    date: '24/11/2023',
    location: 'Chennai-south - Salem',
    invoiceNumber: 'ABC123',
    transporterName: 'Deepak Logistics Pvt Ltd'
}
const NeftDataWithIFSCCheck = {
    ...NeftDataForIob,
    ifscCheck: true
}
describe('NEFT file generating Logics Test', async () => {
    test('Should create generate neft file for initial payments', async () => {
        const actual = await getNEFTData([NeftData])
        expect(actual).toEqual({
            fileName: `INITIALPAY${dayjs().format('DDMMYYYY')}.txt`,
            data:
                'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n' +
                'zxy1234,10,435534523,sakthi,Erode,MagnumAdvance,28350\n'
        })
    })
    test('Should create generate neft file for final payments', async () => {
        const actual = await getNEFTData([{ ...NeftData, type: 'final pay' }])
        expect(actual).toEqual({
            fileName: `FINALPAY${dayjs().format('DDMMYYYY')}.txt`,
            data:
                'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n' +
                'zxy1234,10,435534523,sakthi,Erode,MagnumFinal,28350\n'
        })
    })
    test('Should create generate neft file for fuel payments', async () => {
        const actual = await getNEFTData([{ ...NeftData, type: 'fuel pay' }])
        expect(actual).toEqual({
            fileName: `FUELPAY${dayjs().format('DDMMYYYY')}.txt`,
            data:
                'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n' +
                'zxy1234,10,435534523,sakthi,Erode,MagnumFuel,28350\n'
        })
    })
    test('Should create generate neft file for gst payments', async () => {
        const actual = await getNEFTData([{ ...NeftData, type: 'gst pay' }])
        expect(actual).toEqual({
            fileName: `GSTPAY${dayjs().format('DDMMYYYY')}.txt`,
            data:
                'IFSC Code,Account type,Account number,Name of the beneficiary,Address of the beneficiary,Sender information,Amount\n' +
                'zxy1234,10,435534523,sakthi,Erode,MagnumGST,28350\n'
        })
    })
    test('Should create generate neft file with IFSC check', async () => {
        const actual = await getNEFTData([NeftDataWithIFSCCheck])
        expect(actual).toEqual({
            fileName: `INITIALPAY${dayjs().format('DDMMYYYY')}.txt`,
            data: 'Account number,Amount,Narration\n' + '435534523,28350,MagnumAdvance\n'
        })
    })
})

import seedBankDetails from '../seed/bankDetails.ts'
import seedTransporter from '../seed/transporter.ts'
import { getBankDetailsByTransporter } from './bankDetails.ts'
import { create } from './transporter.ts'

describe('Bank Details model', () => {
    test('should able to create', async () => {
        const transporter = await create(seedTransporter)
        const actual = await getBankDetailsByTransporter(transporter.id)
        expect(actual?.accountNumber).toBe(seedBankDetails.accountNumber)
    })
})

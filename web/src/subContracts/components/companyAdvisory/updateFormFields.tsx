import { useState, useEffect, FC } from 'react'
import { getAllCementCompany } from '../../services/cementCompany'
import AdvisoryList from './companyListField'
import InvoiceNumberList from './invoiceNumberField'
import { invoiceList } from './types'
import { SubmitButton } from './advisoryFormFields'
import ReceivedAmountField from './receivedAmountField'

const UpdateFormFields: FC<{ control: invoiceList['control'] }> = ({ control }) => {
    const [invoiceList] = useState<invoiceList['invoiceList']>([])
    const [advisoryList, setadvisoryList] = useState<invoiceList['advisoryList']>([])
    const [advisoryId, setAdvId] = useState<string>('')
    useEffect(() => {
        console.log(advisoryId)
        getAllCementCompany().then(setadvisoryList)
        // getCompanyInvoiceNames().then(setInvoiceList)
    }, [])
    return (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <AdvisoryList control={control} advisoryList={advisoryList} setAdvId={setAdvId} />
            <InvoiceNumberList control={control} invoiceList={invoiceList} advisoryList={[]} />
            <ReceivedAmountField control={control} />
            <SubmitButton name={'Update'} />
        </div>
    )
}
export default UpdateFormFields

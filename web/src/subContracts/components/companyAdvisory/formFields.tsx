import InvoiceNumberList from './invoiceNumberField'
import ReceivedAmountField from './paymentDetailsFields'
// import BankRefNumberField from './BankRefNumberField'
import { invoiceList } from './types'
import { FC, useEffect, useState } from 'react'
import CompanyList from './companyListField'
import { getAllCementCompany } from '../../services/cementCompany'

const FormFields: FC<{ control: invoiceList['control'] }> = ({ control }) => {
    const [invoiceList] = useState<invoiceList['invoiceList']>([])
    const [companyList, setCompanyList] = useState<invoiceList['companyList']>([])
    const [companyName, setCompanyName] = useState<string>('')
    useEffect(() => {
        getAllCementCompany().then(setCompanyList)
    }, [])
    useEffect(() => {
        // getCompanyInvoiceNames().then(setInvoiceList)
    }, [companyName])
    return (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', rowGap: '20px' }}>
            <CompanyList control={control} companyList={companyList} setCpnyName={setCompanyName} />
            <InvoiceNumberList control={control} invoiceList={invoiceList} companyList={[]} />
            {/* <BankRefNumberField control={control} /> */}
            <ReceivedAmountField control={control} />
        </div>
    )
}
export default FormFields

import { FC, useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { cementCompanyProps } from '../generateInvoice/list'
import { advisoryFilterData } from './addAdvisoryContext'
import FormField from '../formField'
import { invoice } from './list'
import InvoiceTabs from './tabs'
export interface update {
    shortageAmount: number
    billNo: string
    invoiceId: number
}
interface advisory {
    onFilter: () => void
    invoice: invoice
    invoiceGST: invoice
}
const AddAdvisory: FC<advisory> = ({ onFilter, invoice, invoiceGST }) => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [update, setUpdate] = useState<update>({ billNo: '', invoiceId: 0, shortageAmount: 0 })
    return (
        <>
            <form onSubmit={handleSubmit(onFilter)}>
                <FormField
                    control={control}
                    cementCompany={cementCompany}
                    setCementCompany={setCementCompany}
                    FilterData={advisoryFilterData}
                />
            </form>
            <InvoiceTabs
                invoice={invoice}
                setUpdate={setUpdate}
                update={update}
                onFilter={onFilter}
                invoiceGST={invoiceGST}
            />
        </>
    )
}

export default AddAdvisory

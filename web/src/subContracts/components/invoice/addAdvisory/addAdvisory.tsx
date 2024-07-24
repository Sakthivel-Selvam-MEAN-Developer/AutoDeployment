import { FC, useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { cementCompanyProps } from '../generateInvoice/list'
import { advisoryFilterData } from './addAdvisoryContext'
import FormField from '../formField'
import DataGridTable from './dataGrid'
import { invoice } from './list'
export interface update {
    shortageAmount: number
    shortagedBillNo: string
    invoiceId: number
}
const AddAdvisory: FC<{ onFilter: () => void; invoice: invoice }> = ({ onFilter, invoice }) => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [update, setUpdate] = useState<update>({} as update)
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
            <DataGridTable
                invoice={invoice}
                setUpdate={setUpdate}
                update={update}
                onFilter={onFilter}
            />
        </>
    )
}

export default AddAdvisory

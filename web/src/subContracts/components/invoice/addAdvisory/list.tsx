import { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { cementCompanyProps } from '../generateInvoice/list'
import { filterDataProps, advisoryFilterData } from './addAdvisoryContext'
import FormField from '../formField'

const defaultFilterData = {
    startDate: 0,
    endDate: 0,
    cementCompany: { name: '', id: 0 },
    pageNumber: 1
}

const AddAdvisory = () => {
    const { handleSubmit, control } = useForm<FieldValues>()
    const [cementCompany, setCementCompany] = useState<cementCompanyProps[]>([])
    const [filterData, setFilterData] = useState<filterDataProps>(defaultFilterData)

    const onFilter = (data: FieldValues) => {
        console.log(filterData, data)
    }
    return (
        <advisoryFilterData.Provider value={{ filterData, setFilterData }}>
            <form onSubmit={handleSubmit(onFilter)}>
                <FormField
                    control={control}
                    cementCompany={cementCompany}
                    setCementCompany={setCementCompany}
                    FilterData={advisoryFilterData}
                />
            </form>
        </advisoryFilterData.Provider>
    )
}

export default AddAdvisory

import { FieldValues, UseFormSetValue } from 'react-hook-form'
import { checkAllFields } from '../../../commonUtils/checkAllFields'
import { createCompanyAdvisory } from '../../services/companyAdvisory'
import dayjs from 'dayjs'
import { clearFields } from './clearFields'

interface dateProps {
    $d: number
}
type type = (
    data: FieldValues,
    setMsg: React.Dispatch<React.SetStateAction<string>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: UseFormSetValue<FieldValues>
) => void
export const onCreate: type = async (data, setMsg, setOpen, setValue) => {
    if (!checkAllFields(data)) return alert('All Fields are Required')
    const date = dayjs((data.paymentReceivedDate as unknown as dateProps).$d).format('DD/MM/YYYY')
    const advanceDate = dayjs.utc(date, 'DD/MM/YYYY').unix()
    await createCompanyAdvisory({
        bankReferenceNumber: data.bankReferenceNumber,
        paymentDocumentNumber: data.paymentDocumentNumber,
        paymentReceivedDate: advanceDate
    }).then(() => {
        setMsg('Company Advisory Created Successfully')
        setOpen(true)
        clearFields(setValue, data)
    })
}
export const onUpdate: type = (data, setMsg, setOpen, setValue) => {
    if (!checkAllFields(data)) return alert('All Fields are Required')
    setMsg('')
    setOpen(false)
    clearFields(setValue, data)
}

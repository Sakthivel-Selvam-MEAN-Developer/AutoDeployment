import { useState } from 'react'
import BunkReportList from '../bunkReport/list'
import AddBunk from './addBunk'
import { bunkDetailsProps } from './types'
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form'

const Bunk = () => {
    const { control, handleSubmit: useFormHandleSubmit, setValue } = useForm()
    const [reCall, setReCall] = useState<boolean>(false)
    const [id, setId] = useState({ type: 0, id: 0 })
    const handleEdit = (row: bunkDetailsProps) => setEditableDetails(row, setValue, setId)
    return (
        <>
            <AddBunk
                setReCall={setReCall}
                reCall={reCall}
                control={control}
                handleSubmit={useFormHandleSubmit}
                setValue={setValue}
                id={id}
                setId={setId}
            />
            <BunkReportList reCall={reCall} handleEdit={handleEdit} />
        </>
    )
}
export default Bunk
type type = (
    row: bunkDetailsProps,
    setValue: UseFormSetValue<FieldValues>,
    setId: React.Dispatch<React.SetStateAction<{ type: number; id: number }>>
) => void
const setEditableDetails: type = (row, setValue, setId) => {
    setId({ type: row.accountTypeNumber, id: row.id ? row.id : 0 })
    setValue('bunkName', row.bunkName)
    setValue('bunkType', row.bunkType)
    setValue('accountNumber', row.accountNumber)
    setValue('accountHolder', row.accountHolder)
    setValue('location', row.location)
    setValue('accountBranchName', row.branchName)
    setSubEditable(setValue, row)
}
const setSubEditable = (setValue: UseFormSetValue<FieldValues>, row: bunkDetailsProps) => {
    setValue('contactPersonName', row.contactPersonName)
    setValue('contactPersonNumber', row.contactPersonNumber)
    setValue('creditDays', row.creaditDays)
    setValue('mailId', row.emailId)
    setValue('ifsc', row.ifsc)
    setValue('accountType', row.accountTypeName)
}

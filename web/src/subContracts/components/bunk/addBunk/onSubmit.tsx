import { FieldValues } from 'react-hook-form'
import { createBunk } from '../../../services/bunk'

const checkAllFields = (allFieldsData: FieldValues): boolean => {
    let check = true
    Object.entries(allFieldsData).forEach(([key, value]) => {
        console.log(key)
        if (value === '') {
            check = false
            return
        }
    })
    return check
}
type submitType = (
    data: FieldValues,
    typeNumber: number,
    setDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setReCall: React.Dispatch<React.SetStateAction<boolean>>,
    reCall: boolean,
    id: number
) => void
export const onSubmit: submitType = async (data, typeNumber, setDialog, setReCall, reCall, id) => {
    if (!checkAllFields(data)) return alert('All Fields are Required')
    const details = getBunkDetails(data, typeNumber)
    await createBunk({ details, id })
        .then(() => {
            setDialog(true)
            setReCall(!reCall)
        })
        .catch((err) => alert(err.response.data.error))
}
const getBunkDetails = (data: FieldValues, typeNumber: number) => {
    return {
        bunkName: data.bunkName,
        accountHolder: data.accountHolder,
        accountNumber: data.accountNumber,
        accountTypeNumber: typeNumber,
        ifsc: data.ifsc,
        location: data.location,
        branchName: data.branchName,
        bunkType: data.bunkType,
        contactPersonName: data.contactPersonName,
        contactPersonNumber: data.contactPersonNumber,
        creaditDays: parseInt(data.creditDays),
        emailId: data.mailId
    }
}

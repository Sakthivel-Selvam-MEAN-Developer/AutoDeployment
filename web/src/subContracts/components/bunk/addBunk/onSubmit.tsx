import { FieldValues } from 'react-hook-form'
import { createBunk } from '../../../services/bunk'
import { checkAllFields } from '../../../../commonUtils/checkAllFields'

type submitType = (
    data: FieldValues,
    id: { type: number; id: number },
    setDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setReCall: React.Dispatch<React.SetStateAction<boolean>>,
    reCall: boolean,
    setId: React.Dispatch<React.SetStateAction<{ type: number; id: number }>>
) => void
export const onSubmit: submitType = async (data, id, setDialog, setReCall, reCall, setId) => {
    if (!checkAllFields(data)) return alert('All Fields are Required')
    const details = getBunkDetails(data, id.type)
    await createBunk({ details, id: id.id })
        .then(() => {
            setDialog(true)
            setReCall(!reCall)
            setId({ type: 0, id: 0 })
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

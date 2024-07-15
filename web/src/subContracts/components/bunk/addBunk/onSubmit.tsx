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
    accTypeNumber: number,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
) => void
export const onSubmit: submitType = async (data, accTypeNumber, setOpenDialog) => {
    if (!checkAllFields(data)) return alert('All Fields are Required')
    const details = {
        bunkName: data.bunkName,
        accountHolder: data.accountHolder,
        accountNumber: data.accountNumber,
        accountTypeNumber: accTypeNumber,
        ifsc: data.ifsc,
        location: data.location,
        branchName: data.branchName,
        bunkType: data.bunkType,
        contactPersonName: data.contactPersonName,
        contactPersonNumber: data.contactPersonNumber,
        creaditDays: parseInt(data.creditDays),
        emailId: data.mailId
    }
    await createBunk(details)
        .then(() => setOpenDialog(true))
        .catch((err) => alert(err.response.data.error))
}

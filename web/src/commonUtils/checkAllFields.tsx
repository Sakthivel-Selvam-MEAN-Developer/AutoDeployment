import { FieldValues } from 'react-hook-form'

export const checkAllFields = (allFieldsData: FieldValues): boolean => {
    let check = true
    Object.entries(allFieldsData).forEach(([key, value]) => {
        console.log(key)
        if (value === '' || value === undefined || value === null) {
            check = false
            return
        }
    })
    return check
}

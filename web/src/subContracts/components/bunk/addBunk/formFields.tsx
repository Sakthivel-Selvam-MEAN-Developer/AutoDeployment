import BunkNameAndTypeFields from './bunkNameAndTypeFields'
import { FC } from 'react'
import AccountHolderDetailFields from './accountHolderDetailsFields'
import AccountTypeFields from './accountTypeFields'
import ContactPersonDetailsFields from './contactPersonDetailsFields'
import CreditDaysAndMailFields from './creditDaysAndMailIdFields'
import { accTypeField as accFld } from './types'
import SuccessDialog from '../../../../commonUtils/SuccessDialog'
import { clearFields } from './clearFields'

const style = {
    display: 'flex',
    gap: '10px',
    rowGap: '10px'
}
const FormFields: FC<accFld> = ({ setValue, control, setAccType, setOpenDialog, openDialog }) => {
    return (
        <div style={{ ...style, flexWrap: 'wrap' }}>
            <BunkNameAndTypeFields control={control} />
            <AccountHolderDetailFields control={control} />
            <AccountTypeFields control={control} setAccType={setAccType} />
            <ContactPersonDetailsFields control={control} />
            <CreditDaysAndMailFields control={control} />
            <SuccessDialog
                open={openDialog}
                handleClose={() => {
                    clearFields(setValue)
                    setOpenDialog(false)
                }}
                message="Bunk Creation is Successful"
            />
        </div>
    )
}

export default FormFields

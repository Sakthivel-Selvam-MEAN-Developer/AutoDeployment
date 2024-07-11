import { Control } from 'react-hook-form'
import BunkNameAndTypeFields from './bunkNameAndTypeFields'
import { FC } from 'react'
import AccountHolderDetailFields from './accountHolderDetailsFields'
import AccountTypeFields from './accountTypeFields'
import ContactPersonDetailsFields from './contactPersonDetailsFields'
import CreditDaysAndMailFields from './creditDaysAndMailIdFields'
export interface bunkField {
    control: Control
}
const style = {
    display: 'flex',
    gap: '10px',
    rowGap: '10px'
}
const BunkFormFields: FC<bunkField> = ({ control }) => {
    return (
        <div style={{ ...style, flexWrap: 'wrap' }}>
            <BunkNameAndTypeFields control={control} />
            <AccountHolderDetailFields control={control} />
            <AccountTypeFields control={control} />
            <ContactPersonDetailsFields control={control} />
            <CreditDaysAndMailFields control={control} />
        </div>
    )
}

export default BunkFormFields

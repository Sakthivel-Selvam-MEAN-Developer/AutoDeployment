import { Control } from 'react-hook-form'
import DateInput from '../../../../form/DateInput'
export interface FormFieldsProps {
    control: Control
}
const DiscrepancyReportFilter: React.FC<FormFieldsProps> = ({ control }) => {
    return (
        <div style={{ display: 'flex', gap: '10px', rowGap: '10px', flexWrap: 'wrap' }}>
            {dateInput(control)}
            <DateInput control={control} format="DD/MM/YYYY" fieldName="to" label="Due End Date" />
        </div>
    )
}
export default DiscrepancyReportFilter

function dateInput(control: Control) {
    return (
        <DateInput control={control} format="DD/MM/YYYY" fieldName="from" label="Due Start Date" />
    )
}

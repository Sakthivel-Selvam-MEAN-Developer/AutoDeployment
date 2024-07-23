import { Control } from 'react-hook-form'
import FormField from './formField'
import { cementCompanyProps } from './tableList'
export const columns = [
    { field: 'id', headerName: '#', flex: 1, minWidth: 100 },
    { field: 'billNo', headerName: 'Bill Number', width: 150, flex: 1 },
    { field: 'billDate', headerName: 'Date Created', width: 150, flex: 1 },
    { field: 'company', headerName: 'Company Name', width: 200, flex: 1 },
    { field: 'amount', headerName: 'Amount', width: 150, flex: 1 },
    {
        field: 'pdfLink',
        headerName: 'PDF File Link',
        width: 200,
        flex: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderCell: (params: any) => (
            <a href={params.value} target="_blank" rel="noopener noreferrer">
                View PDF
            </a>
        )
    }
]
export function formFieldDisplay(
    control: Control,
    cementCompany: cementCompanyProps[],
    setCementCompany: React.Dispatch<React.SetStateAction<cementCompanyProps[]>>
) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <FormField
                control={control}
                cementCompany={cementCompany}
                setCementCompany={setCementCompany}
            />
        </div>
    )
}

import { finalDataProps } from './show'
export const tripListForSecondary: string[] = [
    'secondaryFreightAmount',
    'secondaryTransporterAmount',
    'secondaryTotalFreightAmount',
    'secondaryTotalTransporterAmount',
    'totalFreightAmount',
    'totalTransporterAmount',
    'overallFreightAmount',
    'overallTransporterAmount'
]
const shouldRenderColumn = (key: string, value: finalDataProps[keyof finalDataProps]) => {
    const isSecondary = tripListForSecondary.includes(key)
    return isSecondary ? value !== 'null' : true
}

const renderColumnContent = (
    key: string,
    value: finalDataProps[keyof finalDataProps],
    formatKey: (key: string) => string
) => (
    <div style={{ marginBottom: '10px' }}>
        <strong>{formatKey(key)}:</strong> {value}
    </div>
)

export const renderColumn = (
    key: string,
    row: finalDataProps,
    formatKey: (key: string) => string
) => {
    const value = row[key as keyof typeof row]
    if (!shouldRenderColumn(key, value)) {
        return null
    }
    return renderColumnContent(key, value, formatKey)
}

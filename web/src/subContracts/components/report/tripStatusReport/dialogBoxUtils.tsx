import React from 'react'
import { finalDataProps } from './show'

interface ColumnProps {
    keys: string[]
    row: finalDataProps
}

export const Column: React.FC<ColumnProps> = ({ keys, row }) => {
    return (
        <div style={{ display: 'inline-block', marginRight: '20px' }}>
            {keys.map((key) => (
                <div key={key} style={{ marginBottom: '10px' }}>
                    <strong>{key}:</strong> {row[key as keyof finalDataProps]}
                </div>
            ))}
        </div>
    )
}

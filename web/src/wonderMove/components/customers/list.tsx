import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { getCustomers } from '../../services/customer.ts'
import SearchCustomer from './search.tsx'
import Customer from './view.tsx'

interface CustomerListProps {}
const CustomerList: React.FC<CustomerListProps> = () => {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState<string[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState()

    useEffect(() => {
        // @ts-ignore
        getCustomers().then(setCustomers.toString())
    }, [])

    return (
        <>
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'right',
                }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate('create')}
                >
                    Add New Customer
                </Button>
            </div>
            <SearchCustomer customers={customers} onSelect={setSelectedCustomer} />
            {selectedCustomer && <Customer number={selectedCustomer} />}
        </>
    )
}

export default CustomerList

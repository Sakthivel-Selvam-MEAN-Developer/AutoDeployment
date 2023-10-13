import { Outlet } from 'react-router-dom'

const CustomersHome: React.FC = () => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Customers</div>
            <Outlet />
        </>
    )
}

export default CustomersHome

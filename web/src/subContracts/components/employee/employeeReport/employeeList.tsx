import { useEffect, useState } from 'react'
import { Row } from './employeeReportShow'
import { getAllEmployee } from '../../../services/employee'
import ListAllEmployee from './employeeReportShow'
const EmployeeReport: React.FC<{ handleEdit: (row: Row) => void }> = ({ handleEdit }) => {
    const [allEmployee, setAllEmployee] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllEmployee()
            .then((data) => {
                setAllEmployee(data)
            })
            .then(() => setLoading(false))
    }, [])
    return <ListAllEmployee allEmployee={allEmployee} loading={loading} handleEdit={handleEdit} />
}
export default EmployeeReport

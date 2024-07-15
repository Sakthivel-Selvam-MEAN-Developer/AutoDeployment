import { useEffect, useState } from 'react'
import ListAllCompany, { Rows } from './companyReportShow'
import { getAllCementCompany } from '../../../services/cementCompany'
const CompanyReport: React.FC<{ handleEdit: (row: Rows) => void }> = ({ handleEdit }) => {
    const [allCompany, setAllCompany] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllCementCompany()
            .then(setAllCompany)
            .then(() => setLoading(false))
    }, [])
    return <ListAllCompany allCompany={allCompany} loading={loading} handleEdit={handleEdit} />
}
export default CompanyReport

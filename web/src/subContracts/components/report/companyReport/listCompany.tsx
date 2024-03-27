import { useEffect, useState } from 'react'
import ListAllCompany from './companyReportShow'
import { getAllCementCompany } from '../../../services/cementCompany'

const CompanyReport: React.FC = () => {
    const [allCompany, setAllCompany] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getAllCementCompany()
            .then(setAllCompany)
            .then(() => setLoading(false))
    }, [])
    return (
        <>
            <ListAllCompany allCompany={allCompany} loading={loading} />
        </>
    )
}
export default CompanyReport

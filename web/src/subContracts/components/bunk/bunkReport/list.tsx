import { FC, useEffect, useState } from 'react'
import { getAllBunk } from '../../../services/bunk'
import { accType, bunkDetailsProps } from '../addBunk/types'
import BunkDataGrid from './bunkDataGrid'
import { getAllAccountTypes } from '../../../services/accountType'

interface list {
    reCall: boolean
    handleEdit: (row: bunkDetailsProps) => void
}

const BunkReportList: FC<list> = ({ reCall, handleEdit }) => {
    const [bunkList, setBunkList] = useState<bunkDetailsProps[]>([])
    const [accTypes, setAccTypes] = useState<accType[]>([])
    useEffect(() => {
        getAllBunk().then(setBunkList)
    }, [reCall])
    useEffect(() => {
        getAllAccountTypes().then(setAccTypes)
    }, [])
    return (
        <>
            <br />
            <p>Bunk List</p>
            <BunkDataGrid bunkList={bunkList} accTypes={accTypes} handleEdit={handleEdit} />
        </>
    )
}

export default BunkReportList

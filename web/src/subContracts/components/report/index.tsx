import React, { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Report: React.FC = (): ReactElement => {
    return (
        <>
            <div style={{ marginBottom: '30px' }}>Report</div>
            <Outlet />
        </>
    )
}

export default Report

// update "subContract"."ov90erallTrip" set "pricePointApprovalStatus"=true where id in (SELECT o."id" FROM "subContract"."overallTrip" o JOIN "subContract"."paymentDues" p ON p."overallTripId" = o."id" where p."type"='initial pay' and o."pricePointApprovalStatus"=false);

import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const ApprovalPage: React.FC = (): ReactElement => {
  return (
    <>
      <div style={{ marginBottom: "30px" }}>Approval List</div>
      <Outlet />
    </>
  );
};

export default ApprovalPage;
import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const EmployeeLeaveList: React.FC = (): ReactElement => {
  return (
    <>
      <div style={{ marginBottom: "30px" }}>Employee Leave List</div>
      <Outlet />
    </>
  );
};

export default EmployeeLeaveList;
import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const EmployeeForm: React.FC = (): ReactElement => {
  return (
    <>
      <div style={{ marginBottom: "30px" }}>Employee Leave Form</div>
      <Outlet />
    </>
  );
};

export default EmployeeForm;
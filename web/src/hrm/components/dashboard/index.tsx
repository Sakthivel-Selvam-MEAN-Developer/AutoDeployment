import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const HrmDashboard: React.FC = (): ReactElement => {
  return (
    <>
      <div style={{ marginBottom: "30px" }}>Hrm</div>
      <Outlet />
    </>
  );
};

export default HrmDashboard;

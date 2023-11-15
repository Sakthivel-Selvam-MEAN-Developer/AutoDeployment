import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const Leaves: React.FC = (): ReactElement => {
  return (
    <>
      <div style={{ marginBottom: "30px" }}>Leave List</div>
      <Outlet />
    </>
  );
};

export default Leaves;
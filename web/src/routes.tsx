import { createBrowserRouter } from "react-router-dom";
import MoveItLayout from "./wonderMove/components/layout";
import Dashboard from "./wonderMove/components/dashboard";
import DashboardList from "./wonderMove/components/dashboard/list.tsx";
import VehiclesHome from "./wonderMove/components/vehicles/home.tsx";
import VehicleList from "./wonderMove/components/vehicles/list.tsx";
import { NewVehicle } from "./wonderMove/components/vehicles/new.tsx";
import CustomersHome from "./wonderMove/components/customers/home.tsx";
import CustomerList from "./wonderMove/components/customers/list.tsx";
import { NewCustomer } from "./wonderMove/components/customers/new.tsx";
import StopsHome from "./wonderMove/components/stops/home.tsx";
import StopList from "./wonderMove/components/stops/list.tsx";
import PendingReasonHome from "./wonderMove/components/pendingReason/home.tsx";
import PendingList from "./wonderMove/components/pendingReason/list.tsx";
import Details from "./wonderMove/components/pendingReason/view.tsx";
import Reason from "./wonderMove/components/reason/home.tsx";
import ReasonList from "./wonderMove/components/reason/list.tsx";
import HrmLayout from "./hrm/components/layout";
import HrmDashboard from "./hrm/components/dashboard";
import HrmDashboardList from "./hrm/components/dashboard/list.tsx";
import EmployeeFormList from "./hrm/components/employeeLeaveList/applyLeave.tsx";
import ManagerForm from "./hrm/components/managerForm/index.tsx";
import ManagerFormList from "./hrm/components/managerForm/list.tsx";
import EmployeeLeaveList from "./hrm/components/employeeLeaveList/index.tsx";
import EmployeeList from "./hrm/components/employeeLeaveList/list.tsx";

export const router = createBrowserRouter([
  {
    path: "/moveit",
    element: <MoveItLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <DashboardList />,
          },
        ],
      },
      {
        path: "reason",
        element: <Reason />,
        children: [
          {
            path: "",
            element: <ReasonList />,
          },
        ],
      },
      {
        path: "pending-reasons",
        element: <PendingReasonHome />,
        children: [
          {
            path: "",
            element: <PendingList />,
          },
          {
            path: "details/:number",
            element: <Details />,
          },
        ],
      },
      {
        path: "stops",
        element: <StopsHome />,
        children: [
          {
            path: "",
            element: <StopList />,
          },
        ],
      },
      {
        path: "vehicles",
        element: <VehiclesHome />,
        children: [
          {
            path: "",
            element: <VehicleList />,
          },
          {
            path: "create",
            element: <NewVehicle />,
          },
        ],
      },
      {
        path: "customers",
        element: <CustomersHome />,
        children: [
          {
            path: "",
            element: <CustomerList />,
          },
          {
            path: "create",
            element: <NewCustomer />,
          },
        ],
      },
    ],
  },
  {
    path: "/hrm",
    element: <HrmLayout />,
    children: [
      {
        path: "",
        element: <HrmDashboard />,
        children: [
          {
            path: "",
            element: <HrmDashboardList />,
          },
        ],
      },
      {
        path: "manager",
        element: <ManagerForm />,
        children: [
          {
            path: "",
            element: <ManagerFormList />,
          },
        ],
      },
      {
        path: "employee",
        element: <EmployeeLeaveList />,
        children: [
          {
            path: "",
            element: <EmployeeList />,
          },
          {
            path: "apply",
            element: <EmployeeFormList />,
          }
        ],
      },
    ],
  },
]);

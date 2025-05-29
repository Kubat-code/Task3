import { Navigate } from "react-router-dom";
import { AdminLayout } from "../../layout/AdminLayout";

export const AdminRoutes = () => {
  return [
    {
      index: true,
      element: <Navigate to="layout" replace />,
    },
    {
      path: "layout",
      element: <AdminLayout />,
    },
  ];
};

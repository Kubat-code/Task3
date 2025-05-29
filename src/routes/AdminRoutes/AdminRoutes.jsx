import { Navigate } from "react-router-dom";
import { AdminLayout } from "../../layout/AdminLayout";

export const AdminRoutes = () => {
  return [
    {
      path: "/admin",
      element: <Navigate to={"/admin"} />,
    },
    {
      path: "/admin/layout",
      element: <AdminLayout />,
    },
  ];
};

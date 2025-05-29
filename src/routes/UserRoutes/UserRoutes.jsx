import React from "react";
import { UserLayout } from "../../layout/UserLayout";
import { InnerPage } from "../../page/InnerPage";
import { UserCard } from "../../components/UserCard";

export const UserRoutes = () => {
  return [
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <UserCard />,
        },
        {
          path: ":id",
          element: <InnerPage />,
        },
      ],
    },
  ];
};

import React from "react";
import { GuestLayout } from "../../layout/GuestLayout";
import { InnerPage } from "../../page/InnerPage";
import { GuestCard } from "../../components/GuestCard";

export const GuestRoutes = () => {
  return [
    {
      path: "/guest",
      element: <GuestLayout />,
      children: [
        {
          index: true,
          element: <GuestCard />,
        },
        {
          path: ":id",
          element: <InnerPage />,
        },
      ],
    },
  ];
};

import React from "react";
import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

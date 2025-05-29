import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../store/slice/authSlice";
import { SignUp } from "../auth/SignUp";
import { SignIn } from "../auth/SignIn";
import { AdminRoutes } from "./AdminRoutes/AdminRoutes";
import { UserRoutes } from "./UserRoutes/UserRoutes";
import { GuestRoutes } from "./GuestRoutes.jsx/GuestRoutes";
import { MainLayout } from "../layout/MainLayout";

export const AppRoutes = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  console.log(role, "rolessss");

  useEffect(() => {
    if (!role) {
      const { data } = JSON.parse(localStorage.getItem("auth")) || {};
      dispatch(isAuth(data?.role || "GUEST"));
    }
  }, [dispatch, role]);

  const pathByRole = {
    ADMIN: "/admin",
    USER: "/user",
    GUEST: "/sign-in",
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/" replace />,
    },
    {
      path: "sign-up",
      element: (
        <PrivateRouter
          Component={<SignUp />}
          fallBackPath={pathByRole[role]}
          isAllowed={role === "GUEST"}
        />
      ),
    },
    {
      path: "sign-in",
      element: (
        <PrivateRouter
          Component={<SignIn />}
          fallBackPath={pathByRole[role]}
          isAllowed={role === "GUEST"}
        />
      ),
    },
    {
      path: "admin",
      element: (
        <PrivateRouter
          Component={<MainLayout />}
          fallBackPath={pathByRole[role]}
          isAllowed={role === "ADMIN"}
        />
      ),
      children: AdminRoutes(),
    },
    {
      path: "user",
      element: (
        <PrivateRouter
          Component={<MainLayout />}
          fallBackPath={pathByRole[role]}
          isAllowed={role === "USER"}
        />
      ),
      children: UserRoutes(),
    },
    {
      path: "guest",
      element: (
        <PrivateRouter
          Component={<MainLayout />}
          fallBackPath={pathByRole[role]}
          isAllowed={role === "GUEST"}
        />
      ),
      children: GuestRoutes(),
    },
    {
      path: "*",
      element: (
        <div>
          <h1>Not found page!!!</h1>
        </div>
      ),
    },
  ]);
  return <RouterProvider router={routes} />;
};

import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRouter = ({ Component, fallBackPath, isAllowed }) => {
  return isAllowed ? Component : <Navigate to={fallBackPath} replace />;
};

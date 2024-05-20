import React from "react";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";
const DashLayout = () => {
  return (
    <div>
      <DashHeader />
      <Outlet />
      <DashFooter />
    </div>
  );
};

export default DashLayout;

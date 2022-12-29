import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import LeftSidebar from "../Pages/Shared/Sidebars/LeftSidebar";
import RightSidebar from "../Pages/Shared/Sidebars/RightSidebar";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="grid grid-cols-4 gap-4 container mx-auto">
        <div className="col-1">
          <LeftSidebar></LeftSidebar>
        </div>

        <div className="col-span-2 mx-auto">
          <Outlet></Outlet>
        </div>

        <div className=" col-1">
        <RightSidebar></RightSidebar>
        </div>
      </div>
    </div>
  );
};

export default Layout;

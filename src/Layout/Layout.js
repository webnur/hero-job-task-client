import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import LeftSidebar from "../Pages/Shared/Sidebars/LeftSidebar";
import RightSidebar from "../Pages/Shared/Sidebars/RightSidebar";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="md:grid md:grid-cols-4 gap-4 container mx-auto">
        <div className="md:col-1 md:block lg:block hidden">
          <LeftSidebar></LeftSidebar>
        </div>

        <div className="md:col-span-2 mx-auto">
          <Outlet></Outlet>
        </div>

        <div className=" md:col-1  md:block lg:block hidden">
        <RightSidebar></RightSidebar>
        </div>
      </div>
    </div>
  );
};

export default Layout;

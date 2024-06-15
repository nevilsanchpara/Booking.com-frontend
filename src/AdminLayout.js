// AdminLayout.js
import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 bg-gray-100'>
        <Outlet />
      </div>
      {/* <Dashboard /> */}
    </div>
  );
};

export default AdminLayout;

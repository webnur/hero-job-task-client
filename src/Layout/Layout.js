import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <h2 className="text-2xl">this is layout page</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;
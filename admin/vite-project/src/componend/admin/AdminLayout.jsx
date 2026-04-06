import React from 'react';
import SidebarMenu from './SidebarMenu';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarMenu />
      <main className="ml-64 w-full min-h-screen bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;

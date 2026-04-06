import React from 'react';
import DashboardSummary from '../componend/admin/DashboardSummary';
import AdminLayout from '../componend/admin/AdminLayout';

const DashboardHome = () => {
  return (
    <AdminLayout>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <DashboardSummary />
    </AdminLayout>
  );
};

export default DashboardHome;


import React from 'react';
import JournalistSessionAdmin from '../componend/admin/JournalistSessionAdmin';
import AdminLayout from '../componend/admin/AdminLayout';

const JournalistPage = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">
      <JournalistSessionAdmin />
    </div>
    </AdminLayout>
  );
};

export default JournalistPage;

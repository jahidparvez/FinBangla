import React from 'react';
import TestimonialsAdmin from '../componend/admin/TestimonialsAdmin';
import AdminLayout from '../componend/admin/AdminLayout';

const TestimonialsPage = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">
      <TestimonialsAdmin />
    </div>
    </AdminLayout>
  );
};

export default TestimonialsPage;

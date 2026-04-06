import React from 'react';
import BlogsAdmin from '../componend/admin/BlogsAdmin';
import AdminLayout from '../componend/admin/AdminLayout';

const BlogsPage = () => {
  return (
   <AdminLayout>
     <div className="min-h-screen bg-gray-100 p-6">
      <BlogsAdmin />
    </div>
   </AdminLayout>
  );
};

export default BlogsPage;

import React from 'react';
import ContactInfoAdmin from '../componend/admin/ContactInfoAdmin';
import AdminLayout from '../componend/admin/AdminLayout';

const ContactPage = () => {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-6">
      <ContactInfoAdmin />
    </div>
    </AdminLayout>
  );
};

export default ContactPage;

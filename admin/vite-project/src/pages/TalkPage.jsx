import React from 'react';
import TalkToJournalistAdmin from '../componend/admin/TalkToJournalistAdmin';
import AdminLayout from '../componend/admin/AdminLayout';

const TalkPage = () => {
  return (
   <AdminLayout>
     <div className="min-h-screen bg-gray-100 p-6">
      <TalkToJournalistAdmin />
    </div>
   </AdminLayout>
  );
};

export default TalkPage;

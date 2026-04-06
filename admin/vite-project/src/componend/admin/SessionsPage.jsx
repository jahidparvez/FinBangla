import React from 'react';
import UpcomingSessionsAdmin from './UpcomingSessionsAdmin';
import AdminLayout from './AdminLayout';

const SessionsPage = () => {
  return (
   <AdminLayout>
     <div className="min-h-screen bg-gray-100 p-6">
      <UpcomingSessionsAdmin />
    </div>
   </AdminLayout>
  );
};

export default SessionsPage;

import React from 'react'
import AdminLayout from '../componend/admin/AdminLayout'
import JournalistDashboard from './JournalistDashboard'

const TeacherPage = () => {
  return (
    <div>
        <AdminLayout>
            <JournalistDashboard/>
        </AdminLayout>
    </div>
  )
}

export default TeacherPage
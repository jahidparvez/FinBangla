import React from 'react'
import AdminLayout from '../componend/admin/AdminLayout'
import TeacherAdminPanel from '../componend/admin/TeacherAdminPanel'

const TeacherAdminPage = () => {
  return (
    <div>
        <AdminLayout>
            <TeacherAdminPanel/>
        </AdminLayout>
    </div>
  )
}

export default TeacherAdminPage
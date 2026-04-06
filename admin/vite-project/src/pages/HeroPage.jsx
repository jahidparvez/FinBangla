import React from 'react'
import AdminLayout from '../componend/admin/AdminLayout'
import HeroSectionAdmin from '../componend/admin/HeroSectionAdmin'

const HeroPage = () => {
  return (
    <div>
        <AdminLayout>
            <HeroSectionAdmin/>
        </AdminLayout>
    </div>
  )
}

export default HeroPage
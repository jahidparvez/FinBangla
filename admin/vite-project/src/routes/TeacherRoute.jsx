import React from 'react'
import { Route, Routes } from 'react-router-dom'
import JournalistAdminPanel from '../componend/Journalist info/JournalistAdminPanel'
import JournalistBioAdmin from '../componend/Journalist info/JournalistBioAdmin'
import ContactInfoAdmin from '../componend/Journalist info/ContactInfoAdmin'
import FeaturedArticles from '../componend/Journalist info/FeaturedArticles'
import AdminHighlightsPanel from '../componend/Journalist info/AdminHighlightsPanel'
import AdminMediaAppearances from '../componend/Journalist info/AdminMediaAppearances'

import { Link } from 'react-router-dom';

const TeacherRoute = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <aside className="sm:w-64 bg-gray-100 p-4">
        <nav className="space-y-2">
          <Link to="/teacher/profile" className="block hover:text-indigo-600">🧑 Profile</Link>
          <Link to="/teacher/bio" className="block hover:text-indigo-600">📄 Bio</Link>
          <Link to="/teacher/highlight" className="block hover:text-indigo-600">🚀 Highlights</Link>
          <Link to="/teacher/featured" className="block hover:text-indigo-600">📰 Articles</Link>
          <Link to="/teacher/media" className="block hover:text-indigo-600">🎙 Media</Link>
          <Link to="/teacher/contact" className="block hover:text-indigo-600">📬 Contact</Link>
        </nav>
      </aside>

      <main className="flex-1 p-4">
        <Routes>
          <Route path="profile" element={<JournalistAdminPanel />} />
          <Route path="bio" element={<JournalistBioAdmin />} />
          <Route path="highlight" element={<AdminHighlightsPanel />} />
          <Route path="featured" element={<FeaturedArticles />} />
          <Route path="media" element={<AdminMediaAppearances />} />
          <Route path="contact" element={<ContactInfoAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

export default TeacherRoute
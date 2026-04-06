import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardHome from './pages/DashboardHome';
import CoursesPage from './componend/admin/CoursesPage';
import SessionsPage from './componend/admin/SessionsPage';
import BlogsPage from './pages/BlogsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import TalkPage from './pages/TalkPage';
import JournalistPage from './pages/JournalistPage';
import HeroPage from './pages/HeroPage';
import JournalistFooterPage from './pages/JournalistFooterPage';
import TeacherPage from './pages/TeacherPage';
import TeacherAdminPage from './pages/TeacherAdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/admin/courses" element={<CoursesPage />} />
        <Route path="/admin/sessions" element={<SessionsPage />} />
        <Route path="/admin/blogs" element={<BlogsPage />} />
        <Route path="/admin/testimonials" element={<TestimonialsPage />} />
        <Route path="/admin/contact" element={<ContactPage />} />
        <Route path="/admin/talk" element={<TalkPage />} />
        <Route path='/journalist' element={<JournalistPage />} />
        <Route path='/hero' element={<HeroPage/>}/>
        <Route path='/journalistfooter' element={<JournalistFooterPage/>}/>
        <Route path='/teacher' element={<TeacherPage/>}/>
        <Route path='/teacheradmin' element={<TeacherAdminPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Book, Video, MessageSquare, Users, Settings,Pencil,Footprints,BookOpenText } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: <Home size={18} /> },
  { name: 'Courses', path: '/admin/courses', icon: <Book size={18} /> },
  { name: 'Sessions', path: '/admin/sessions', icon: <Video size={18} /> },
{ name: 'Meet Teacher', path: '/teacheradmin', icon: <BookOpenText size={18} /> },
  { name: 'Blogs', path: '/admin/blogs', icon: <MessageSquare size={18} /> },
  { name: 'Testimonials', path: '/admin/testimonials', icon: <Users size={18} /> },
  { name: 'Contact Info', path: '/admin/contact', icon: <Settings size={18} /> },
  { name: 'Talk to Journalist', path: '/admin/talk', icon: <Settings size={18} /> },
  { name: 'Live session', path: '/journalist', icon: <Video size={18} /> },
  { name: 'Hero Section', path: '/hero', icon: <Pencil size={18} /> },
  { name: 'Journalist Footer', path: '/journalistfooter', icon: <Footprints size={18} /> },
  { name: 'Teacher Info', path: '/teacher', icon: <BookOpenText size={18} /> }

];

const SidebarMenu = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 space-y-2 fixed">
      <h1 className="text-xl font-bold mb-6">🎓 Admin Panel</h1>
      {menuItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          {item.icon}
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SidebarMenu;

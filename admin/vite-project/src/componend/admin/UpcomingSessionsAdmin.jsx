import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarPlus, Trash2, Link2, Pencil, Save } from 'lucide-react';

const UpcomingSessionsAdmin = () => {
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    mode: '',
    instructor: '',
    joinLink: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const res = await axios.get('http://localhost:3000/upcomingSessions');
    setSessions(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) {
      alert("Title, Date, and Time are required!");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/upcomingSessions/${editingId}`, form);
        alert('✅ Session updated!');
      } else {
        await axios.post('http://localhost:3000/upcomingSessions', form);
        alert('🎉 Session added!');
      }
      setForm({ title: '', date: '', time: '', mode: '', instructor: '', joinLink: '' });
      setEditingId(null);
      fetchSessions();
    } catch {
      alert("Something went wrong!");
    }
  };

  const handleEdit = (session) => {
    setForm(session);
    setEditingId(session.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      await axios.delete(`http://localhost:3000/upcomingSessions/${id}`);
      fetchSessions();
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-tr from-white to-blue-50 rounded-2xl shadow-lg max-w-6xl mx-auto mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <CalendarPlus size={28} /> {editingId ? 'Edit Session' : 'Manage Upcoming Sessions'}
      </h2>

      {/* Session Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 border border-gray-200 rounded-xl shadow mb-8"
      >
        <input name="title" value={form.title} onChange={handleChange} placeholder="Session Title" className="input-style" />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date (e.g. June 20, 2025)" className="input-style" />
        <input name="time" value={form.time} onChange={handleChange} placeholder="Time (e.g. 8:00 PM - 9:30 PM)" className="input-style" />
        <input name="mode" value={form.mode} onChange={handleChange} placeholder="Mode (Zoom/Meet)" className="input-style" />
        <input name="instructor" value={form.instructor} onChange={handleChange} placeholder="Instructor Name" className="input-style" />
        <input name="joinLink" value={form.joinLink} onChange={handleChange} placeholder="Join Link (URL)" className="input-style" />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md col-span-1 sm:col-span-2 transition flex items-center justify-center gap-2"
        >
          <Save size={18} />
          {editingId ? 'Update Session' : 'Add Session'}
        </button>
      </form>

      {/* Sessions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow border border-gray-200 text-sm rounded-lg overflow-hidden">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Instructor</th>
              <th className="p-3 border">Mode</th>
              <th className="p-3 border">Link</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-blue-50 transition">
                <td className="p-3 border">{session.title}</td>
                <td className="p-3 border">{session.date}</td>
                <td className="p-3 border">{session.time}</td>
                <td className="p-3 border">{session.instructor}</td>
                <td className="p-3 border">{session.mode}</td>
                <td className="p-3 border text-center">
                  <a
                    href={session.joinLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-blue-600 hover:underline hover:text-blue-800"
                  >
                    <Link2 size={16} className="mr-1" /> Join
                  </a>
                </td>
                <td className="p-3 border flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handleEdit(session)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {sessions.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">No upcoming sessions.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingSessionsAdmin;


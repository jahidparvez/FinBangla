import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, Save } from 'lucide-react';

const AdminCoursesPanel = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    subject: '',
    level: '',
    description: '',
    rating: '',
    enrolled: '',
    badge: '',
    startDate: '',
    isFree: false,
    image: '', // store base64 string or file path
  });
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null); // local image preview

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:3000/courses');
      setCourses(res.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result }); // base64 string
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.subject || !form.level) {
      alert('Title, Subject, and Level are required!');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/courses/${editingId}`, form);
        alert('✅ Course updated!');
      } else {
        await axios.post('http://localhost:3000/courses', form);
        alert('🎉 Course added!');
      }

      setForm({
        title: '',
        subject: '',
        level: '',
        description: '',
        rating: '',
        enrolled: '',
        badge: '',
        startDate: '',
        isFree: false,
        image: '',
      });
      setEditingId(null);
      setPreview(null);
      fetchCourses();
    } catch (err) {
      alert('❌ Error saving course!');
      console.error(err);
    }
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditingId(course.id);
    setPreview(course.image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:3000/courses/${id}`);
        fetchCourses();
      } catch (err) {
        alert('❌ Error deleting course!');
        console.error(err);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        {editingId ? <Pencil size={24} /> : <Plus size={24} />}
        {editingId ? 'Edit Course' : 'Add New Course'}
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow border border-gray-200 mb-10"
      >
        <input name="title" value={form.title} onChange={handleChange} placeholder="Course Title" className="input-style" />
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="input-style" />
        <input name="level" value={form.level} onChange={handleChange} placeholder="Level" className="input-style" />
        <input name="badge" value={form.badge} onChange={handleChange} placeholder="Badge" className="input-style" />
        <input name="startDate" value={form.startDate} onChange={handleChange} type="date" className="input-style" />
        <input name="rating" value={form.rating} onChange={handleChange} type="number" step="0.1" placeholder="Rating" className="input-style" />
        <input name="enrolled" value={form.enrolled} onChange={handleChange} type="number" placeholder="Enrolled" className="input-style" />

        {/* ✅ File Upload Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Course Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-md"
          />
          {preview && (
            <div className="mt-3">
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded border" />
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" name="isFree" checked={form.isFree} onChange={handleChange} className="w-5 h-5" />
          <span>Free Course?</span>
        </label>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} className="input-style md:col-span-2" />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition md:col-span-2 flex items-center justify-center gap-2"
        >
          <Save size={18} /> {editingId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg text-sm border border-gray-200">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Level</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">Free?</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-4">No courses found.</td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-blue-50 transition">
                  <td className="p-2 border">{course.title}</td>
                  <td className="p-2 border">{course.subject}</td>
                  <td className="p-2 border">{course.level}</td>
                  <td className="p-2 border">{course.startDate || 'N/A'}</td>
                  <td className="p-2 border text-center">{course.isFree ? 'Yes' : 'No'}</td>
                  <td className="p-2 border flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCoursesPanel;




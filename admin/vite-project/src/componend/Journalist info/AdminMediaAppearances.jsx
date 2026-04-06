import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminMediaAppearances = () => {
  const [appearances, setAppearances] = useState([]);
  const [form, setForm] = useState({
    title: '',
    platform: '',
    image: '',
    description: '',
    link: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const fetchData = async () => {
    const res = await axios.get('http://localhost:3000/mediaAppearances');
    setAppearances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, platform, image, description, link } = form;

    if (!title || !platform || !image || !description || !link)
      return alert('Fill all fields');

    if (editingId) {
      await axios.put(`http://localhost:3000/mediaAppearances/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:3000/mediaAppearances', form);
    }

    setForm({ title: '', platform: '', image: '', description: '', link: '' });
    setPreviewImage('');
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setPreviewImage(item.image);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this media appearance?')) {
      await axios.delete(`http://localhost:3000/mediaAppearances/${id}`);
      fetchData();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? '✏️ Edit Media Appearance' : '➕ Add Media Appearance'}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input-style" />
        <input name="platform" value={form.platform} onChange={handleChange} placeholder="Platform" className="input-style" />
        
        <input type="file" accept="image/*" onChange={handleImageUpload} className="input-style md:col-span-2" />
        {previewImage && (
          <div className="md:col-span-2">
            <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded border" />
          </div>
        )}

        <input name="link" value={form.link} onChange={handleChange} placeholder="Link" className="input-style" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="md:col-span-2 input-style h-24" />
        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Platform</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appearances.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.platform}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-yellow-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {appearances.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-4 text-center text-gray-400">No entries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMediaAppearances;


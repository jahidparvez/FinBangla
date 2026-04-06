// src/components/Admin/AdminHighlightsPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Icons from 'lucide-react';

const ICON_OPTIONS = [
  'Award', 'FileText', 'UserCheck', 'Activity', 'Briefcase', 'TrendingUp'
];
const COLOR_OPTIONS = [
  'text-yellow-500', 'text-green-500', 'text-blue-500', 'text-red-500', 'text-purple-500'
];

const AdminHighlightsPanel = () => {
  const [highlights, setHighlights] = useState([]);
  const [form, setForm] = useState({ label: '', value: '', icon: 'Award', color: 'text-yellow-500' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const res = await axios.get('http://localhost:3000/highlights');
      setHighlights(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.label || !form.value || !form.icon || !form.color) return alert("Fill all fields");

    if (editingId) {
      await axios.put(`http://localhost:3000/highlights/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(`http://localhost:3000/highlights`, form);
    }

    setForm({ label: '', value: '', icon: 'Award', color: 'text-yellow-500' });
    fetchHighlights();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this highlight?")) {
      await axios.delete(`http://localhost:3000/highlights/${id}`);
      fetchHighlights();
    }
  };

  const renderIcon = (iconName, colorClass) => {
    const LucideIcon = Icons[iconName];
    return LucideIcon ? <LucideIcon className={`w-5 h-5 ${colorClass}`} /> : iconName;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingId ? '✏️ Edit Highlight' : '➕ Add Highlight'}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input name="label" value={form.label} onChange={handleChange} placeholder="Label (e.g. Awards Won)" className="p-2 border rounded" />
        <input name="value" value={form.value} onChange={handleChange} placeholder="Value (e.g. 8)" className="p-2 border rounded" />

        {/* Icon select */}
        <select name="icon" value={form.icon} onChange={handleChange} className="p-2 border rounded">
          {ICON_OPTIONS.map(icon => (
            <option key={icon} value={icon}>{icon}</option>
          ))}
        </select>

        {/* Color select */}
        <select name="color" value={form.color} onChange={handleChange} className="p-2 border rounded">
          {COLOR_OPTIONS.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Icon</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {highlights.map(h => (
              <tr key={h.id} className="border-t">
                <td className="px-4 py-2">{h.label}</td>
                <td className="px-4 py-2">{h.value}</td>
                <td className="px-4 py-2">{renderIcon(h.icon, h.color)}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(h)} className="text-yellow-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(h.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {highlights.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-4 text-center text-gray-400">No highlights yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHighlightsPanel;


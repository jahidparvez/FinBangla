import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: '',
    image: '',
    summary: '',
    link: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/featuredArticles');
      setArticles(res.data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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
    const { title, image, summary, link } = form;

    if (!title || !image || !summary || !link) {
      return alert('Please fill all fields');
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/featuredArticles/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:3000/featuredArticles', form);
      }

      setForm({ title: '', image: '', summary: '', link: '' });
      setPreviewImage('');
      fetchArticles();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setPreviewImage(item.image);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`http://localhost:3000/featuredArticles/${id}`);
        fetchArticles();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? '✏️ Edit Featured Article' : '➕ Add Featured Article'}
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-md mb-10"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded-md"
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Link"
          className="border p-2 rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded-md md:col-span-2"
        />

        {previewImage && (
          <div className="md:col-span-2">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md border"
            />
          </div>
        )}

        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="md:col-span-2 border p-2 rounded-md h-24 resize-none"
        />
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {editingId ? 'Update Article' : 'Add Article'}
        </button>
      </form>

      {/* Article Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white border rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 flex-1 line-clamp-3">{article.summary}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-600 text-sm underline"
              >
                Visit Link →
              </a>
              <div className="mt-4 flex justify-between text-sm font-medium">
                <button
                  onClick={() => handleEdit(article)}
                  className="text-yellow-600 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <p className="text-gray-400 text-center col-span-full py-4">No articles found</p>
        )}
      </div>
    </div>
  );
};

export default AdminFeaturedArticles;





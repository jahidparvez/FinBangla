import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminJournalistBanner = () => {
  const [data, setData] = useState({
    name: '',
    title: '',
    tagline: '',
    profileImage: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/journalist')
      .then(res => {
        setData(res.data);
        setPreviewImage(res.data.profileImage);
      })
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setData(prev => ({ ...prev, profileImage: reader.result })); // Save base64 or preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/journalist', data);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📝 Update Journalist Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Image upload */}
        <div className="sm:col-span-2">
          <label className="block text-gray-700 mb-1 font-medium">Upload Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-md p-2 shadow-sm"
          />
        </div>

        {/* Preview */}
        {previewImage && (
          <div className="sm:col-span-2 flex justify-center">
            <img
              src={previewImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-indigo-100 shadow-md"
            />
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md shadow-sm"
            placeholder="Journalist Name"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md shadow-sm"
            placeholder="e.g., Senior Reporter"
          />
        </div>

        {/* Tagline */}
        <div className="sm:col-span-2">
          <label className="block text-gray-700 mb-1 font-medium">Tagline</label>
          <textarea
            name="tagline"
            value={data.tagline}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md shadow-sm h-20"
            placeholder="Short quote or intro"
          />
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminJournalistBanner;


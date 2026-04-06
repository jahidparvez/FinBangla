import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TalkToJournalistAdmin = () => {
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchTalkInfo();
  }, []);

  const fetchTalkInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/talkToJournalist');
      setData(res.data);
      setPreview(res.data.image); // initialize preview
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => ({ ...prev, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/talkToJournalist', data);
      alert('✅ Info updated successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update info.');
    }
  };

  if (!data) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8 sm:p-10 space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700 text-center">
        🧑‍💼 Manage Journalist Info
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Full Name</label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            value={data.title}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">WhatsApp Number</label>
          <input
            name="whatsapp"
            value={data.whatsapp}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Default WhatsApp Message</label>
          <input
            name="whatsappMessage"
            value={data.whatsappMessage}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="md:col-span-2 flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Messenger Link</label>
          <input
            name="messenger"
            value={data.messenger}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-medium text-gray-700 mb-1 block">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Image preview */}
        <div className="md:col-span-2 flex justify-center mt-4">
          <div className="flex flex-col items-center">
            <img
              src={preview || '/journalist-avatar.png'}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full shadow-md border-4 border-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-2">Live Image Preview</p>
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-semibold text-lg shadow-md"
          >
            💾 Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default TalkToJournalistAdmin;

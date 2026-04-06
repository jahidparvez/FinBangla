import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

const ContactInfoAdmin = () => {
  const [contact, setContact] = useState({
    email: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      youtube: ''
    }
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/contactInfo');
      setContact(res.data);
    } catch (error) {
      alert('❌ Failed to fetch contact info');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['facebook', 'twitter', 'linkedin', 'youtube'].includes(name)) {
      setContact((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value
        }
      }));
    } else {
      setContact((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3000/contactInfo', contact);
      alert('✅ Contact info updated!');
    } catch (error) {
      alert('❌ Failed to save contact info');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Edit Contact Information</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Facebook</label>
          <input
            type="text"
            name="facebook"
            value={contact.socialLinks.facebook}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Facebook URL"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Twitter</label>
          <input
            type="text"
            name="twitter"
            value={contact.socialLinks.twitter}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Twitter URL"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={contact.socialLinks.linkedin}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="LinkedIn URL"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">YouTube</label>
          <input
            type="text"
            name="youtube"
            value={contact.socialLinks.youtube}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="YouTube URL"
          />
        </div>

        <button
          type="submit"
          className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition"
        >
          <Save size={18} />
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ContactInfoAdmin;

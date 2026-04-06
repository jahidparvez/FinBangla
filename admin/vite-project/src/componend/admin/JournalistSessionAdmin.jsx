import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Save, Video, Calendar, User, Mic, Trash2, Edit } from 'lucide-react';

const JournalistSessionAdmin = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    const res = await axios.get('http://localhost:3000/journalistSession');
    setSession(res.data);
  };

  const handleChange = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const handleHighlightChange = (index, value) => {
    const updated = [...session.highlights];
    updated[index] = value;
    setSession({ ...session, highlights: updated });
  };

  const addHighlight = () => {
    setSession({ ...session, highlights: [...session.highlights, ''] });
  };

  const removeHighlight = (index) => {
    const updated = session.highlights.filter((_, i) => i !== index);
    setSession({ ...session, highlights: updated });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload'); // your preset name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dpgags9kx/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setSession((prev) => ({ ...prev, guestImage: data.secure_url }));
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('❌ Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:3000/journalistSession', session);
    alert('✅ Journalist session updated successfully!');
  };

  if (!session) return <p className="p-4 text-gray-600">Loading...</p>;

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg max-w-5xl mx-auto mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Mic size={28} /> Edit Journalist Live Session
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 border border-gray-200 rounded-xl shadow"
      >
        <h3 className="col-span-2 text-lg font-semibold text-gray-700 flex items-center gap-2">
          <User size={18} /> Guest Info
        </h3>

        <input name="guestName" value={session.guestName} onChange={handleChange} placeholder="Guest Name" className="input-style" />
        <input name="guestTitle" value={session.guestTitle} onChange={handleChange} placeholder="Guest Title" className="input-style" />

        {/* Cloudinary File Upload */}
        <label className="col-span-2 font-semibold text-gray-700">Upload Guest Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="input-style col-span-2"
        />

        {session.guestImage && (
          <div className="col-span-2 flex justify-center mt-2">
            <img
              src={session.guestImage}
              alt="Guest"
              className="h-32 w-32 rounded-full object-cover border shadow-md"
            />
          </div>
        )}

        <h3 className="col-span-2 text-lg font-semibold text-gray-700 mt-2 flex items-center gap-2">
          <Calendar size={18} /> Schedule
        </h3>
        <input name="date" value={session.date} onChange={handleChange} placeholder="Date (e.g. June 16, 2025)" className="input-style" />
        <input name="time" value={session.time} onChange={handleChange} placeholder="Time (e.g. 8:00 PM)" className="input-style" />

        <input name="topic" value={session.topic} onChange={handleChange} placeholder="Session Topic" className="input-style col-span-2" />
        <input name="tagline" value={session.tagline} onChange={handleChange} placeholder="Session Tagline" className="input-style col-span-2" />
        <textarea name="guestBio" value={session.guestBio} onChange={handleChange} placeholder="Guest Bio" rows={3} className="input-style col-span-2" />

        <div className="col-span-2">
          <label className="font-semibold mb-1 block text-gray-700">✨ Highlights:</label>
          {session.highlights.map((h, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                value={h}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="input-style flex-grow"
              />
              <button type="button" onClick={() => removeHighlight(index)} className="text-red-600 font-bold text-xl">×</button>
            </div>
          ))}
          <button type="button" onClick={addHighlight} className="text-blue-600 text-sm underline">
            + Add highlight
          </button>
        </div>

        <h3 className="col-span-2 text-lg font-semibold text-gray-700 mt-2 flex items-center gap-2">
          <Video size={18} /> Join Links
        </h3>
        <input
          name="joinLinks.zoom"
          value={session.joinLinks.zoom}
          onChange={(e) => setSession({ ...session, joinLinks: { ...session.joinLinks, zoom: e.target.value } })}
          placeholder="Zoom Link"
          className="input-style"
        />
        <input
          name="joinLinks.youtube"
          value={session.joinLinks.youtube}
          onChange={(e) => setSession({ ...session, joinLinks: { ...session.joinLinks, youtube: e.target.value } })}
          placeholder="YouTube Link"
          className="input-style"
        />
        <input
          name="joinLinks.facebook"
          value={session.joinLinks.facebook}
          onChange={(e) => setSession({ ...session, joinLinks: { ...session.joinLinks, facebook: e.target.value } })}
          placeholder="Facebook Link"
          className="input-style"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center gap-2 mt-4"
        >
          <Save size={18} /> Update Session
        </button>
      </form>

      {/* Preview Card */}
      <div className="mt-10 bg-white rounded-xl shadow p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🧾 Session Preview</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {session.guestImage && (
            <img
              src={session.guestImage}
              alt="Guest"
              className="h-24 w-24 object-cover rounded-full border"
            />
          )}
          <div className="flex-1">
            <p className="text-lg font-semibold">
              {session.guestName}{' '}
              <span className="text-gray-500 text-sm">({session.guestTitle})</span>
            </p>
            <p className="text-sm text-gray-700 mt-1">{session.date} • {session.time}</p>
            <p className="mt-2 text-blue-600 font-medium">{session.topic}</p>
            <p className="text-sm italic text-gray-500">{session.tagline}</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
              <Edit size={16} /> Edit
            </button>
            <button className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalistSessionAdmin;



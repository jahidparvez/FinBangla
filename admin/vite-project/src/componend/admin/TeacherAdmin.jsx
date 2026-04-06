import React, { useEffect, useState } from 'react';

const TeacherAdmin = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/teacher')
      .then(res => res.json())
      .then(data => {
        setTeacher(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (field, value) => {
    setTeacher((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (section, key, value) => {
    setTeacher((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  const handleArrayChange = (index, value) => {
    const updated = [...teacher.typingWords];
    updated[index] = value;
    setTeacher((prev) => ({ ...prev, typingWords: updated }));
  };

  // New: Handle image file selection and convert to base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // reader.result is base64 string of the image
      setTeacher((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveTeacher = async () => {
    setSaving(true);
    try {
      await fetch('http://localhost:3000/teacher', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      });
      alert('Teacher info updated!');
    } catch (err) {
      alert('Failed to save');
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-10">Loading admin panel...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">👩‍🏫 Teacher Profile Admin</h2>

      {/* Profile Image Upload */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Profile Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {teacher.profileImage && (
          <img
            src={teacher.profileImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full border"
          />
        )}
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="font-semibold">Name:</label>
        <input
          type="text"
          value={teacher.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="font-semibold">Description:</label>
        <textarea
          value={teacher.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          rows={5}
        />
      </div>

      {/* Typing Words */}
      <div className="mb-4">
        <label className="font-semibold">Typing Words:</label>
        {teacher.typingWords.map((word, i) => (
          <input
            key={i}
            type="text"
            value={word}
            onChange={(e) => handleArrayChange(i, e.target.value)}
            className="w-full mt-1 p-2 border rounded mb-2"
          />
        ))}
      </div>

      {/* Quote */}
      <div className="mb-4">
        <label className="font-semibold">Quote:</label>
        <input
          type="text"
          value={teacher.quote}
          onChange={(e) => handleChange('quote', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      {/* Social Links */}
      <div className="mb-4">
        <label className="font-semibold">Social Links:</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <input
            type="text"
            placeholder="Facebook URL"
            value={teacher.socialLinks.facebook}
            onChange={(e) => handleNestedChange('socialLinks', 'facebook', e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="YouTube URL"
            value={teacher.socialLinks.youtube}
            onChange={(e) => handleNestedChange('socialLinks', 'youtube', e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={teacher.socialLinks.linkedin}
            onChange={(e) => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Email"
            value={teacher.socialLinks.email}
            onChange={(e) => handleNestedChange('socialLinks', 'email', e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="mb-4">
        <label className="font-semibold">CTA Button:</label>
        <input
          type="text"
          placeholder="CTA Text"
          value={teacher.cta.text}
          onChange={(e) => handleNestedChange('cta', 'text', e.target.value)}
          className="w-full mt-1 p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="CTA Link"
          value={teacher.cta.link}
          onChange={(e) => handleNestedChange('cta', 'link', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={saveTeacher}
        disabled={saving}
        className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700"
      >
        {saving ? 'Saving...' : '💾 Save Changes'}
      </button>
    </div>
  );
};

export default TeacherAdmin;


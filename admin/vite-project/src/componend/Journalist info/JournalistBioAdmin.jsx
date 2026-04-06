import React, { useEffect, useState } from 'react';

const JournalistBioAdmin = () => {
  const [bio, setBio] = useState({
    name: '',
    description: '',
    quote: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/journalistBio')
      .then(res => res.json())
      .then(data => {
        setBio(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading bio:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (field, value) => {
    setBio(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('http://localhost:3000/journalistBio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bio),
      });
      alert('Journalist bio updated!');
    } catch (err) {
      alert('Failed to save bio.');
    }
    setSaving(false);
  };

  if (loading) return <div className="text-center py-10">Loading Bio Admin...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl my-10">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">📝 Journalist Bio Admin Panel</h2>

      <div className="mb-4">
        <label className="font-semibold block">Name:</label>
        <input
          type="text"
          value={bio.name}
          onChange={e => handleChange('name', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold block">Description:</label>
        <textarea
          value={bio.description}
          onChange={e => handleChange('description', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          rows={6}
        />
      </div>

      <div className="mb-6">
        <label className="font-semibold block">Quote:</label>
        <input
          type="text"
          value={bio.quote}
          onChange={e => handleChange('quote', e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        {saving ? 'Saving...' : '💾 Save Bio'}
      </button>
    </div>
  );
};

export default JournalistBioAdmin;

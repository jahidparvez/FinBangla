import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Save, PlusCircle, Trash } from 'lucide-react';

const HeroSectionAdmin = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/hero')
      .then(res => {
        setHero(res.data);
        setLoading(false);
      })
      .catch(err => console.error('Failed to fetch hero data', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHero({ ...hero, [name]: value });
  };

  const handleButtonChange = (section, field, value) => {
    setHero({
      ...hero,
      [section]: {
        ...hero[section],
        [field]: value,
      },
    });
  };

  const updateTagline = (index, value) => {
    const updated = [...hero.taglines];
    updated[index] = value;
    setHero({ ...hero, taglines: updated });
  };

  const addTagline = () => {
    setHero({ ...hero, taglines: [...hero.taglines, ''] });
  };

  const removeTagline = (index) => {
    const updated = hero.taglines.filter((_, i) => i !== index);
    setHero({ ...hero, taglines: updated });
  };

  const saveChanges = () => {
    axios.put('http://localhost:3000/hero', hero)
      .then(() => alert('✅ Hero section updated!'))
      .catch(err => console.error('Failed to save hero data', err));
  };

  if (loading || !hero) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-gradient-to-tr from-purple-600 to-blue-600 text-white rounded-xl shadow-xl p-6 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-1">🎯 Hero Section Settings</h2>
        <p className="text-sm opacity-90">Update your landing page hero section content</p>
      </div>

      <div className="grid gap-6 bg-white rounded-xl p-6 shadow-lg">
        {/* Badge */}
        <div>
          <label className="text-sm font-medium text-gray-700">Badge</label>
          <input
            name="badge"
            value={hero.badge}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Title & Highlight */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Main Title</label>
            <input
              name="title"
              value={hero.title}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Highlight Text</label>
            <input
              name="highlight"
              value={hero.highlight}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-yellow-300 rounded bg-yellow-50"
            />
          </div>
        </div>

        {/* Taglines */}
        <div>
          <label className="text-sm font-medium text-gray-700">Typewriter Taglines</label>
          <div className="space-y-2 mt-2">
            {hero.taglines.map((tagline, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  value={tagline}
                  onChange={(e) => updateTagline(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button onClick={() => removeTagline(index)} className="text-red-500 hover:text-red-700">
                  <Trash size={18} />
                </button>
              </div>
            ))}
            <button
              onClick={addTagline}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-1"
            >
              <PlusCircle size={16} /> Add Tagline
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Primary Button */}
          <div className="p-4 border rounded bg-blue-50">
            <h3 className="font-semibold text-blue-800 mb-2">Primary Button</h3>
            <label className="text-sm">Text</label>
            <input
              value={hero.primaryButton.text}
              onChange={(e) => handleButtonChange('primaryButton', 'text', e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded mb-2"
            />
            <label className="text-sm">Link</label>
            <input
              value={hero.primaryButton.link}
              onChange={(e) => handleButtonChange('primaryButton', 'link', e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>

          {/* Secondary Button */}
          <div className="p-4 border rounded bg-purple-50">
            <h3 className="font-semibold text-purple-800 mb-2">Secondary Button</h3>
            <label className="text-sm">Text</label>
            <input
              value={hero.secondaryButton.text}
              onChange={(e) => handleButtonChange('secondaryButton', 'text', e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded mb-2"
            />
            <label className="text-sm">Link</label>
            <input
              value={hero.secondaryButton.link}
              onChange={(e) => handleButtonChange('secondaryButton', 'link', e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={saveChanges}
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition-all duration-300"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionAdmin;


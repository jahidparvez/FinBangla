import React, { useEffect, useState } from 'react';

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-800 mb-1">{label}</label>
    <input
      {...props}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
    />
  </div>
);

const TeacherAdminPanel = () => {
  const [teacher, setTeacher] = useState({
    name: '',
    profileImage: '',
    typingWords: [],
    description: '',
    quote: '',
    socialLinks: {
      facebook: '',
      youtube: '',
      linkedin: '',
      email: '',
    },
    cta: {
      text: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/teacher')
      .then(res => res.json())
      .then(data => {
        setTeacher(data);
        setImagePreview(data.profileImage);
        setLoading(false);
      })
      .catch(err => console.error('Error loading teacher data:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profileImage' && files?.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setTeacher(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    } else if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setTeacher(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
    } else if (name.startsWith('cta.')) {
      const key = name.split('.')[1];
      setTeacher(prev => ({
        ...prev,
        cta: {
          ...prev.cta,
          [key]: value,
        },
      }));
    } else {
      setTeacher(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTypingWordsChange = (e) => {
    setTeacher(prev => ({
      ...prev,
      typingWords: e.target.value.split(',').map(word => word.trim()),
    }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:3000/teacher', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacher),
    })
      .then(res => res.json())
      .then(() => alert('✅ Teacher data successfully updated!'))
      .catch(err => console.error('Error updating teacher data:', err));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-b from-white to-gray-100 shadow-2xl rounded-2xl mt-10">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">🎓 Teacher Profile Settings</h2>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow mb-10">
        <Input label="👤 Full Name" name="name" value={teacher.name} onChange={handleChange} />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-800 mb-1">🖼️ Upload Profile Image</label>
          <input type="file" accept="image/*" name="profileImage" onChange={handleChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-full mt-2 border" />
          )}
        </div>

        <div className="md:col-span-2">
          <Input label="📝 Short Description" name="description" value={teacher.description} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Input label="💬 Motivational Quote" name="quote" value={teacher.quote} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Input
            label="⌨️ Typing Words (comma separated)"
            name="typingWords"
            value={teacher.typingWords.join(', ')}
            onChange={handleTypingWordsChange}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow mb-10">
        <Input label="🌐 Facebook" name="socialLinks.facebook" value={teacher.socialLinks.facebook} onChange={handleChange} />
        <Input label="▶️ YouTube" name="socialLinks.youtube" value={teacher.socialLinks.youtube} onChange={handleChange} />
        <Input label="💼 LinkedIn" name="socialLinks.linkedin" value={teacher.socialLinks.linkedin} onChange={handleChange} />
        <Input label="📧 Email Address" name="socialLinks.email" value={teacher.socialLinks.email} onChange={handleChange} />
      </section>

      <section className="bg-white p-6 rounded-xl shadow mb-8">
        <Input label="📍 CTA Button Text" name="cta.text" value={teacher.cta.text} onChange={handleChange} />
      </section>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-200 shadow-lg"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default TeacherAdminPanel;


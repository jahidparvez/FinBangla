import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const res = await axios.get('http://localhost:3000/testimonials');
    setTestimonials(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      alert("Name and message are required!");
      return;
    }

    await axios.post('http://localhost:3000/testimonials', form);
    setForm({ name: '', message: '' });
    fetchTestimonials();
  };

  const handleDelete = async (index) => {
    const testimonial = testimonials[index];
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      await axios.delete(`http://localhost:3000/testimonials/${testimonial.id}`);
      fetchTestimonials();
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mb-10">
      <h2 className="text-2xl font-bold mb-4">⭐ Manage Testimonials</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Student Name" className="p-2 border rounded" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Feedback Message" className="p-2 border rounded col-span-1 sm:col-span-2" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded col-span-1 sm:col-span-2">
          Add Testimonial
        </button>
      </form>

      {/* Testimonial List */}
      <ul className="divide-y">
        {testimonials.map((t, index) => (
          <li key={index} className="py-3">
            <p className="font-semibold">{t.name}</p>
            <p className="text-sm text-gray-700">{t.message}</p>
            <button
              onClick={() => handleDelete(index)}
              className="mt-2 text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestimonialsAdmin;

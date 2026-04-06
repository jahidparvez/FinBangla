import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactInfoAdmin = () => {
  const [contact, setContact] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get("http://localhost:3000/contact");
      setContact(res.data);
    } catch (err) {
      console.error("Failed to fetch contact info:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...contact[field]];
    updated[index] = value;
    setContact((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field) => {
    setContact((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const updated = contact[field].filter((_, i) => i !== index);
    setContact((prev) => ({ ...prev, [field]: updated }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload"); // replace with your preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpgags9kx/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setContact((prev) => ({ ...prev, journalistImage: data.secure_url }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("❌ Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3000/contact", contact);
      alert("✅ Contact information updated!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Update failed. Please try again.");
    }
  };

  if (!contact)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 rounded-xl shadow-xl mt-10">
      <h2 className="text-3xl font-extrabold text-indigo-900 mb-8 text-center tracking-wide">
        Edit Contact Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-indigo-700 font-semibold mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="+880 1234-567890"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-indigo-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="hello@yourdomain.com"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-indigo-700 font-semibold mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={contact.address}
              onChange={handleChange}
              required
              className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="House #12, Road #4, Dhanmondi, Dhaka 1209"
            />
          </div>
        </div>

        {/* Social Media URLs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="facebook"
              className="block text-indigo-700 font-semibold mb-1"
            >
              Facebook URL
            </label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={contact.facebook}
              onChange={handleChange}
              className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div>
            <label
              htmlFor="instagram"
              className="block text-indigo-700 font-semibold mb-1"
            >
              Instagram URL
            </label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={contact.instagram}
              onChange={handleChange}
              className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>
          <div>
            <label
              htmlFor="youtube"
              className="block text-indigo-700 font-semibold mb-1"
            >
              YouTube URL
            </label>
            <input
              type="url"
              id="youtube"
              name="youtube"
              value={contact.youtube}
              onChange={handleChange}
              className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="https://youtube.com/yourchannel"
            />
          </div>
        </div>

        {/* Journalist Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label
              htmlFor="journalistName"
              className="block text-indigo-700 font-semibold mb-1"
            >
              Journalist Name
            </label>
            <input
              type="text"
              id="journalistName"
              name="journalistName"
              value={contact.journalistName}
              onChange={handleChange}
              className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="Dr. Anisul Islam"
            />
          </div>
          <div>
            <label
              htmlFor="journalistTitle"
              className="block text-indigo-700 font-semibold mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="journalistTitle"
              name="journalistTitle"
              value={contact.journalistTitle}
              onChange={handleChange}
              className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder="Political Analyst"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="journalistBio"
            className="block text-indigo-700 font-semibold mb-1"
          >
            Journalist Bio
          </label>
          <textarea
            id="journalistBio"
            name="journalistBio"
            rows="3"
            value={contact.journalistBio}
            onChange={handleChange}
            className="w-full border border-indigo-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition resize-none"
            placeholder="Brief bio..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-indigo-700 font-semibold mb-1">
            Journalist Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block cursor-pointer text-indigo-700"
            />
            {uploading && (
              <span className="text-indigo-600 font-semibold animate-pulse">
                Uploading...
              </span>
            )}
          </div>
          {contact.journalistImage && (
            <img
              src={contact.journalistImage}
              alt="Journalist"
              className="mt-4 w-40 h-40 object-cover rounded-full shadow-lg border-4 border-indigo-300"
            />
          )}
        </div>

        {/* Expertise */}
        <div>
          <label className="block text-indigo-700 font-semibold mb-2">
            Key Expertise
          </label>
          {contact.expertise.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 mb-3 border border-indigo-200 rounded-md px-4 py-2 shadow-sm"
            >
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange("expertise", idx, e.target.value)
                }
                className="flex-grow focus:outline-none text-indigo-900 font-medium"
                placeholder="Expertise item"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("expertise", idx)}
                className="text-red-500 hover:text-red-700 font-bold text-xl"
                title="Remove"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("expertise")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 font-semibold transition"
          >
            + Add Expertise
          </button>
        </div>

        {/* Media Appearances */}
        <div>
          <label className="block text-indigo-700 font-semibold mb-2">
            Media Appearances
          </label>
          {contact.mediaAppearances.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 mb-3 border border-indigo-200 rounded-md px-4 py-2 shadow-sm"
            >
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange("mediaAppearances", idx, e.target.value)
                }
                className="flex-grow focus:outline-none text-indigo-900 font-medium"
                placeholder="Media appearance"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("mediaAppearances", idx)}
                className="text-red-500 hover:text-red-700 font-bold text-xl"
                title="Remove"
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("mediaAppearances")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 font-semibold transition"
          >
            + Add Media Appearance
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-bold text-lg rounded-lg py-3 mt-6 hover:scale-105 transition-transform shadow-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ContactInfoAdmin;





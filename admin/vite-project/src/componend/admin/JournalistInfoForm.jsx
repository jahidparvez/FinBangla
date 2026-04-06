// components/ContactInfo/JournalistInfoForm.jsx
import React from 'react';

const JournalistInfoForm = ({ contact, handleChange, handleImageUpload }) => {
  return (
    <>
      <h3 className="col-span-2 text-lg font-semibold text-gray-700 mt-4">🧑‍💼 Journalist Info</h3>

      <input
        name="journalistName"
        value={contact.journalistName}
        onChange={handleChange}
        placeholder="Name"
        className="input-style"
      />
      <input
        name="journalistTitle"
        value={contact.journalistTitle}
        onChange={handleChange}
        placeholder="Title"
        className="input-style"
      />

      {/* Image Upload + URL */}
      <div className="col-span-2 grid gap-2">
        <input
          name="journalistImage"
          value={contact.journalistImage}
          onChange={handleChange}
          placeholder="Image URL (or upload below)"
          className="input-style"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm text-gray-600"
        />
      </div>

      {/* Image Preview */}
      {contact.journalistImage && (
        <div className="col-span-2 flex justify-center mt-2">
          <img
            src={contact.journalistImage}
            alt="Preview"
            className="h-32 w-32 object-cover rounded-full border shadow"
          />
        </div>
      )}

      <textarea
        name="journalistBio"
        value={contact.journalistBio}
        onChange={handleChange}
        placeholder="Bio"
        rows={3}
        className="input-style col-span-2"
      />
    </>
  );
};

export default JournalistInfoForm;


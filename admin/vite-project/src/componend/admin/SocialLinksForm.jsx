// components/ContactInfo/SocialLinksForm.jsx
import React from 'react';

const SocialLinksForm = ({ contact, handleChange }) => {
  return (
    <>
      <h3 className="col-span-2 text-lg font-semibold text-gray-700 mt-4">🌐 Social Media Links</h3>
      <input name="facebook" value={contact.facebook} onChange={handleChange} placeholder="Facebook Link" className="input-style" />
      <input name="instagram" value={contact.instagram} onChange={handleChange} placeholder="Instagram Link" className="input-style" />
      <input name="youtube" value={contact.youtube} onChange={handleChange} placeholder="YouTube Link" className="input-style col-span-2" />
    </>
  );
};

export default SocialLinksForm;

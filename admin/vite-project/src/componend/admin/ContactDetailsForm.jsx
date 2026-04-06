// components/ContactInfo/ContactDetailsForm.jsx
import React from 'react';

const ContactDetailsForm = ({ contact, handleChange }) => {
  return (
    <>
      <h3 className="col-span-2 text-lg font-semibold text-gray-700">📞 Contact Info</h3>
      <input name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" className="input-style" />
      <input name="email" value={contact.email} onChange={handleChange} placeholder="Email" className="input-style" />
      <input name="address" value={contact.address} onChange={handleChange} placeholder="Address" className="input-style col-span-2" />
    </>
  );
};

export default ContactDetailsForm;

// components/ContactInfo/ExpertiseList.jsx
import React from 'react';

const ExpertiseList = ({ expertise, handleArrayChange, addExpertise, removeExpertise }) => {
  return (
    <div className="col-span-2 mt-2">
      <label className="font-semibold block mb-2 text-gray-700">🧠 Journalist Expertise:</label>
      {expertise.map((exp, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            value={exp}
            onChange={(e) => handleArrayChange(index, e.target.value)}
            className="input-style flex-grow"
          />
          <button type="button" onClick={() => removeExpertise(index)} className="text-red-600 font-bold text-xl">×</button>
        </div>
      ))}
      <button type="button" onClick={addExpertise} className="text-blue-600 text-sm mt-1 underline">+ Add more</button>
    </div>
  );
};

export default ExpertiseList;

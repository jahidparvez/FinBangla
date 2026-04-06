// components/UpcomingSessionCard.jsx
import React from 'react';

const UpcomingSessionCard = ({ session }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 border border-gray-200 max-w-xl mx-auto">
      <div className="flex items-center gap-4">
        {session.guestImage && (
          <img src={session.guestImage} alt="Guest" className="w-20 h-20 rounded-full object-cover border" />
        )}
        <div>
          <h3 className="text-lg font-bold">{session.guestName}</h3>
          <p className="text-sm text-gray-500">{session.guestTitle}</p>
          <p className="text-sm text-gray-600">{session.date} • {session.time}</p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold text-blue-600">{session.topic}</h4>
        <p className="text-sm italic text-gray-500">{session.tagline}</p>
        <p className="mt-2 text-sm text-gray-700">{session.guestBio}</p>
        {session.joinLinks?.zoom && (
          <a href={session.joinLinks.zoom} target="_blank" rel="noreferrer" className="text-blue-500 underline text-sm mt-2 inline-block">
            🔗 Join via Zoom
          </a>
        )}
      </div>
    </div>
  );
};

export default UpcomingSessionCard;

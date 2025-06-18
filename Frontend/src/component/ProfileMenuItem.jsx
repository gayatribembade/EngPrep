import React from 'react';

const ProfileMenuItem = ({ icon: Icon, text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-all duration-200 ${className}`}
    >
      <Icon size={18} className="flex-shrink-0" />
      {typeof text === 'string' ? (
        <span className="font-medium">{text}</span>
      ) : (
        text
      )}
    </button>
  );
};

export default ProfileMenuItem; 
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import './UserProfile.css';

const defaultAvatar = 'https://www.gravatar.com/avatar/?d=mp&f=y';

function UserProfile() {
  const { profile, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!profile) {
    return null;
  }

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <div className="user-profile" ref={dropdownRef}>
      <img
        src={profile.avatar || defaultAvatar}
        alt="User Avatar"
        className="user-avatar"
        onClick={toggleDropdown}
        style={{ cursor: 'pointer' }}
      />
      {open && (
        <div className="user-dropdown">
          <div className="user-info">
            <strong>{profile.username}</strong>
            <p>{profile.email}</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;

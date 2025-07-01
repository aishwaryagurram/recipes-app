import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USER_STORAGE_KEY = 'recipeAppUser';
const PROFILE_STORAGE_KEY = 'recipeAppProfile';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, [profile]);

  const login = (userData) => {
    setUser(userData);
    // Create profile based on userData
    setProfile({
      username: userData.username || userData.email,
      email: userData.email,
      bio: '',
      avatar: '',
      joined: new Date().toISOString(),
    });
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

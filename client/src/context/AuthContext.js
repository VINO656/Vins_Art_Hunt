import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Load state from localStorage on init
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAdmin');
    const storedPassword = localStorage.getItem('adminPassword');
    if (storedAuth === 'true' && storedPassword) {
      setIsAdmin(true);
      setAdminPassword(storedPassword);
    }
  }, []);

  const login = (password) => {
    // For now we just trust the client side login and verify against the API later on request
    // Alternatively, we could ping an API endpoint here to verify the password.
    setIsAdmin(true);
    setAdminPassword(password);
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('adminPassword', password);
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminPassword('');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminPassword');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminPassword, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

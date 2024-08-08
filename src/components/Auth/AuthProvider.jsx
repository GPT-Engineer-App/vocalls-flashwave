import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and set user
      // This is a placeholder, replace with actual token validation
      setUser({ id: '1', username: 'user' });
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${userData.username}!`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

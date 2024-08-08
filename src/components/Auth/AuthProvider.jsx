import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const login = useCallback((userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${userData.username}!`,
    });
  }, [toast]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  }, [toast]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and set user
      // This is a placeholder, replace with actual token validation
      setUser({ id: '1', username: 'user' });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export default AuthProvider;

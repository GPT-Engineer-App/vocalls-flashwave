import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './Auth/AuthProvider';
import { Button } from "@/components/ui/button";
import { navItems } from '../nav-items';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">VoCalls</Link>
          <nav>
            <ul className="flex space-x-4">
              {navItems.map(({ title, to, icon, protected: isProtected }) => (
                (!isProtected || user) && (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`flex items-center ${location.pathname === to ? 'text-blue-400' : 'text-white'}`}
                    >
                      {icon}
                      <span className="ml-1">{title}</span>
                    </Link>
                  </li>
                )
              ))}
              {user ? (
                <li>
                  <Button onClick={handleLogout} variant="ghost">Logout</Button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="text-white">Login</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 VoCalls. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;

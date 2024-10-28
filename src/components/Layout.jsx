import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './Auth/AuthProvider';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { navItems } from '../nav-items';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold">VoCalls</Link>
            
            {/* Mobile menu button */}
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map(({ title, to, icon, protected: isProtected }) => (
                (!isProtected || user) && (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      location.pathname === to
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-700'
                    }`}
                  >
                    {icon}
                    <span className="ml-2">{title}</span>
                  </Link>
                )
              ))}
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:bg-blue-700"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4">
              {navItems.map(({ title, to, icon, protected: isProtected }) => (
                (!isProtected || user) && (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      location.pathname === to
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {icon}
                    <span className="ml-2">{title}</span>
                  </Link>
                )
              ))}
              {user ? (
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full text-left text-white hover:bg-blue-700 px-3 py-2"
                >
                  Logout
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          )}
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} VoCalls. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
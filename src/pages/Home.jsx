import React, { useContext } from 'react';
import { AuthContext } from '../components/Auth/AuthProvider';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to VoCalls</h1>
        <p className="text-xl mb-6">Hello, {user?.username}!</p>
        <div className="space-y-4">
          <Button onClick={() => navigate('/call')} className="w-full flex items-center justify-center">
            <Phone className="mr-2" /> Start a New Call
          </Button>
          <Button onClick={logout} variant="outline" className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

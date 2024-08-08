import React, { useContext } from 'react';
import { AuthContext } from '../components/Auth/AuthProvider';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Phone, Users, BarChart } from 'lucide-react';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to VoCalls</h1>
      <p className="text-xl mb-8 text-center">Hello, {user?.username}!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Phone className="mx-auto mb-4 text-blue-500" size={48} />
          <h2 className="text-2xl font-semibold mb-4">Make a Call</h2>
          <p className="mb-4">Start a new voice or video call with anyone, anywhere.</p>
          <Button onClick={() => navigate('/call')} className="w-full">
            Start a New Call
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Users className="mx-auto mb-4 text-green-500" size={48} />
          <h2 className="text-2xl font-semibold mb-4">Contacts</h2>
          <p className="mb-4">Manage your contacts and favorite people to call.</p>
          <Button onClick={() => navigate('/contacts')} className="w-full">
            View Contacts
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <BarChart className="mx-auto mb-4 text-purple-500" size={48} />
          <h2 className="text-2xl font-semibold mb-4">Call History</h2>
          <p className="mb-4">View your recent calls and call statistics.</p>
          <Button onClick={() => navigate('/history')} className="w-full">
            View Call History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

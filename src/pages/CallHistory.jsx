import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Phone, Video } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CallHistory = () => {
  const [callHistory] = useState([
    { id: 1, name: 'John Doe', date: '2024-03-01', duration: 300, type: 'audio' },
    { id: 2, name: 'Jane Smith', date: '2024-03-02', duration: 450, type: 'video' },
    { id: 3, name: 'Alice Johnson', date: '2024-03-03', duration: 180, type: 'audio' },
    { id: 4, name: 'Bob Brown', date: '2024-03-04', duration: 600, type: 'video' },
  ]);

  const chartData = [
    { name: 'Audio Calls', value: callHistory.filter(call => call.type === 'audio').length },
    { name: 'Video Calls', value: callHistory.filter(call => call.type === 'video').length },
  ];

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Call History</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Call Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Calls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {callHistory.map(call => (
            <div key={call.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{call.name}</h3>
              <p className="text-gray-600 mb-1">{call.date}</p>
              <p className="text-gray-600 mb-2">Duration: {formatDuration(call.duration)}</p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  {call.type === 'audio' ? <Phone className="mr-2" /> : <Video className="mr-2" />}
                  {call.type === 'audio' ? 'Call' : 'Video Call'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallHistory;

import React from 'react';
import { Calendar, Users, BookOpen, Activity } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Available Rooms', value: '24', icon: BookOpen },
    { title: 'Active Events', value: '12', icon: Calendar },
    { title: 'Total Bookings', value: '156', icon: Activity },
    { title: 'Active Users', value: '1,204', icon: Users },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Room {i}01</p>
                  <p className="text-sm text-gray-600">Booked by John Doe</p>
                </div>
                <span className="text-sm text-indigo-600">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Student Workshop {i}</p>
                  <p className="text-sm text-gray-600">March {i + 14}, 2024</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Upcoming
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
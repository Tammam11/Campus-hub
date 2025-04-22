import React, { useState } from 'react';
import { Building2, Users, Clock } from 'lucide-react';

// Generate classroom data
const generateClassrooms = () => {
  const buildings = ['G', 'H', 'K'];
  const floors = [1, 2, 3];
  const classrooms = [];

  for (const building of buildings) {
    for (const floor of floors) {
      for (let room = 1; room <= 16; room++) {
        classrooms.push({
          id: `${building}${floor}${room.toString().padStart(2, '0')}`,
          building,
          floor,
          roomNumber: room,
          capacity: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
          status: Math.random() > 0.5 ? 'available' : 'occupied',
          currentClass: Math.random() > 0.5 ? 'Computer Science 101' : null,
          nextClass: '2:00 PM - Database Systems',
        });
      }
    }
  }
  return classrooms;
};

const classrooms = generateClassrooms();

export default function ClassroomSchedule() {
  const [selectedBuilding, setSelectedBuilding] = useState('G');
  const [selectedFloor, setSelectedFloor] = useState(1);

  const filteredClassrooms = classrooms.filter(
    (classroom) => classroom.building === selectedBuilding && classroom.floor === selectedFloor
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="University Classroom"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Classroom Schedule</h1>
            <p className="text-xl">Find available classrooms across campus</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Building and Floor Selection */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Building</label>
              <div className="flex space-x-4">
                {['G', 'H', 'K'].map((building) => (
                  <button
                    key={building}
                    onClick={() => setSelectedBuilding(building)}
                    className={`px-6 py-2 rounded-md ${
                      selectedBuilding === building
                        ? 'bg-[#003366] text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Building {building}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Floor</label>
              <div className="flex space-x-4">
                {[1, 2, 3].map((floor) => (
                  <button
                    key={floor}
                    onClick={() => setSelectedFloor(floor)}
                    className={`px-6 py-2 rounded-md ${
                      selectedFloor === floor
                        ? 'bg-[#003366] text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Floor {floor}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Classrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClassrooms.map((classroom) => (
            <div
              key={classroom.id}
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                classroom.status === 'available' ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Room {classroom.id}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    classroom.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {classroom.status === 'available' ? 'Available' : 'Occupied'}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  Building {classroom.building}, Floor {classroom.floor}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  Capacity: {classroom.capacity} students
                </div>
                {classroom.currentClass && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Current: {classroom.currentClass}
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Next: {classroom.nextClass}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Beach Cleanup Initiative",
    date: "March 25, 2024",
    time: "9:00 AM - 2:00 PM",
    location: "Red Sea Coast",
    image: "https://images.unsplash.com/photo-1618477462146-050d2757163d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "Join us for our monthly beach cleanup initiative. Help preserve our beautiful coastline while making new friends!"
  },
  {
    id: 2,
    title: "Tech Innovation Workshop",
    date: "March 28, 2024",
    time: "10:00 AM - 3:00 PM",
    location: "Innovation Lab",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "Explore the latest technologies and learn how to build innovative solutions for real-world problems."
  },
  {
    id: 3,
    title: "Cultural Festival",
    date: "April 1, 2024",
    time: "11:00 AM - 6:00 PM",
    location: "Main Campus Square",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    description: "Celebrate diversity through food, music, and traditional performances from different cultures."
  }
];

const upcomingEvents = [
  {
    id: 4,
    title: "Sports Tournament",
    date: "April 5, 2024",
    description: "Annual inter-college sports competition featuring football, basketball, and tennis."
  },
  {
    id: 5,
    title: "Career Fair 2024",
    date: "April 10, 2024",
    description: "Connect with leading companies and explore career opportunities."
  },
  {
    id: 6,
    title: "Science Exhibition",
    date: "April 15, 2024",
    description: "Showcase your scientific projects and innovations to the university community."
  }
];

export default function StudentActivities() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Campus Life"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Discover exciting events happening on campus!</h1>
            <p className="text-xl">Join, learn, and grow with our vibrant community</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Calendar Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">EVENTS</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-lg font-medium">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Featured Events */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button className="bg-[#003366] text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors w-full">
                    LEARN MORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Descriptions */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">EVENTS DESCRIPTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.date}</p>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors w-full">
                  REGISTER
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Calendar, X, MapPin, Clock, Users, Info, Star, CheckCircle, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

const facilities = [
  {
    id: 'main-field',
    name: 'Main Field',
    image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.8,
    reviews: 156,
    capacity: 500,
    price: 200,
    amenities: ['Floodlights', 'Changing Rooms', 'Spectator Seating', 'First Aid Station'],
    description: 'Our premier multi-purpose field suitable for various sports and events.',
    location: 'Central Campus'
  },
  {
    id: 'football-1',
    name: 'Football Field 1',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.6,
    reviews: 98,
    capacity: 200,
    price: 150,
    amenities: ['Professional Turf', 'Goal Posts', 'Training Equipment', 'Floodlights'],
    description: 'FIFA-standard football field with professional maintenance.',
    location: 'North Campus'
  },
  {
    id: 'football-2',
    name: 'Football Field 2',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.5,
    reviews: 85,
    capacity: 200,
    price: 150,
    amenities: ['Professional Turf', 'Goal Posts', 'Training Equipment', 'Scoreboard'],
    description: 'Secondary football field perfect for training and matches.',
    location: 'South Campus'
  },
  {
    id: 'tennis-1',
    name: 'Tennis Court 1',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.9,
    reviews: 124,
    capacity: 4,
    price: 80,
    amenities: ['Hard Court', 'Night Lighting', 'Equipment Rental', 'Seating Area'],
    description: 'Professional-grade tennis court with premium surface.',
    location: 'Sports Complex'
  },
  {
    id: 'tennis-2',
    name: 'Tennis Court 2',
    image: 'https://images.unsplash.com/photo-1599019195221-f0f69582b365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.7,
    reviews: 92,
    capacity: 4,
    price: 80,
    amenities: ['Clay Court', 'Night Lighting', 'Equipment Rental', 'Practice Wall'],
    description: 'Clay court perfect for training and recreational play.',
    location: 'Sports Complex'
  },
  {
    id: 'basketball-1',
    name: 'Basketball Court 1',
    image: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.7,
    reviews: 89,
    capacity: 10,
    price: 100,
    amenities: ['Indoor Court', 'Scoreboards', 'Locker Rooms', 'Air Conditioning'],
    description: 'Indoor basketball court with professional flooring.',
    location: 'Indoor Sports Center'
  },
  {
    id: 'basketball-2',
    name: 'Basketball Court 2',
    image: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.6,
    reviews: 76,
    capacity: 10,
    price: 90,
    amenities: ['Outdoor Court', 'Night Lighting', 'Water Fountains', 'Seating Area'],
    description: 'Outdoor basketball court with excellent lighting.',
    location: 'Central Campus'
  },
  {
    id: 'swimming',
    name: 'Olympic Pool',
    image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.9,
    reviews: 203,
    capacity: 50,
    price: 120,
    amenities: ['Olympic Size', 'Heated Water', 'Professional Lanes', 'Lifeguard'],
    description: 'Olympic-standard swimming pool with temperature control.',
    location: 'Aquatics Center'
  },
  {
    id: 'volleyball',
    name: 'Volleyball Court',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    rating: 4.7,
    reviews: 112,
    capacity: 12,
    price: 90,
    amenities: ['Indoor Court', 'Air Conditioning', 'Equipment Rental', 'Spectator Area'],
    description: 'Professional volleyball court with adjustable net height.',
    location: 'Indoor Sports Center'
  }
];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 6; hour < 22; hour++) {
    const hourStr = hour === 12 ? '12' : hour > 12 ? (hour - 12).toString() : hour.toString();
    const period = hour >= 12 ? 'PM' : 'AM';
    slots.push(`${hourStr}:00 ${period}`);
    slots.push(`${hourStr}:30 ${period}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const dates = Array.from({ length: 15 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date;
});

export default function FacilityBooking({ user }) {
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast.error('Error fetching bookings');
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please sign in to make a booking');
      return;
    }

    if (selectedSlot) {
      try {
        // Check if the facility is already booked for the selected time slot
        const { data: existingBookings, error: checkError } = await supabase
          .from('bookings')
          .select('*')
          .eq('facility', selectedFacility.name)
          .eq('date', selectedSlot.date.toISOString().split('T')[0])
          .eq('time', selectedSlot.time)
          .limit(1);

        if (checkError) {
          throw checkError;
        }

        if (existingBookings && existingBookings.length > 0) {
          toast.error('This time slot is already booked');
          setIsModalOpen(false);
          setSelectedSlot(null);
          return;
        }

        const { data, error } = await supabase
          .from('bookings')
          .insert([
            {
              user_id: user.id,
              facility: selectedFacility.name,
              date: selectedSlot.date.toISOString().split('T')[0],
              time: selectedSlot.time,
              status: 'upcoming'
            }
          ]);

        if (error) throw error;

        setBookings([...bookings, data[0]]);
        setIsModalOpen(false);
        setSelectedSlot(null);
        setBookingSuccess(true);
        toast.success('Booking confirmed successfully!');
        setTimeout(() => setBookingSuccess(false), 3000);
      } catch (error) {
        if (error.code === '23505') {
          toast.error('This time slot was just booked by someone else');
        } else {
          toast.error('Error creating booking');
        }
        setIsModalOpen(false);
        setSelectedSlot(null);
      }
    }
  };

  const isSlotBooked = (date, time) => {
    return bookings.some(
      booking => 
        booking.facility === selectedFacility.name &&
        booking.date === date.toISOString().split('T')[0] &&
        booking.time === time
    );
  };

  const filteredFacilities = selectedCategory === 'all' 
    ? facilities 
    : facilities.filter(f => f.id.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Toast */}
      {bookingSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Booking confirmed successfully!
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Sports Facilities"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Sports Facility Booking</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Book your favorite sports facilities with ease. Whether it's for training, 
              competition, or leisure, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === 'all'
                  ? 'bg-[#003366] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Facilities
            </button>
            <button
              onClick={() => setSelectedCategory('football')}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === 'football'
                  ? 'bg-[#003366] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Football
            </button>
            <button
              onClick={() => setSelectedCategory('tennis')}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === 'tennis'
                  ? 'bg-[#003366] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tennis
            </button>
            <button
              onClick={() => setSelectedCategory('basketball')}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === 'basketball'
                  ? 'bg-[#003366] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Basketball
            </button>
            <button
              onClick={() => setSelectedCategory('swimming')}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === 'swimming'
                  ? 'bg-[#003366] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Swimming
            </button>
            <button
              onClick={() => setSelectedCategory('volleyball')}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === 'volleyball'
                  ? 'bg-[#003366] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Volleyball
            </button>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                selectedFacility.id === facility.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="relative h-48">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{facility.rating}</span>
                  <span className="text-sm text-gray-500">({facility.reviews})</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{facility.name}</h3>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    {facility.price}/hr
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{facility.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {facility.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    Capacity: {facility.capacity} people
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {facility.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedFacility(facility)}
                  className={`w-full py-2 px-4 rounded-md ${
                    selectedFacility.id === facility.id
                      ? 'bg-green-500 text-white'
                      : 'bg-[#003366] text-white hover:bg-blue-800'
                  } transition-colors`}
                >
                  {selectedFacility.id === facility.id ? 'Selected' : 'Select Facility'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Select Date</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {dates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`flex flex-col items-center p-4 rounded-lg min-w-[100px] ${
                  selectedDate.toISOString() === date.toISOString()
                    ? 'bg-[#003366] text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <span className="text-lg font-bold">{date.getDate()}</span>
                <span className="text-sm">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Available Time Slots</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {timeSlots.map((time) => {
              const isBooked = isSlotBooked(selectedDate, time);
              const isSelected = selectedSlot?.date.toISOString() === selectedDate.toISOString() && selectedSlot?.time === time;
              
              return (
                <button
                  key={time}
                  onClick={() => {
                    if (!isBooked) {
                      setSelectedSlot({ date: selectedDate, time });
                      setIsModalOpen(true);
                    }
                  }}
                  disabled={isBooked}
                  className={`p-3 rounded-lg text-center ${
                    isBooked
                      ? 'bg-red-100 text-red-800 cursor-not-allowed'
                      : isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="block font-medium">{time}</span>
                  <span className="text-sm">{isBooked ? 'Booked' : 'Available'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Confirm Booking</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedSlot(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Info className="w-5 h-5" />
                <span>Booking Details</span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <p><strong>Facility:</strong> {selectedFacility.name}</p>
                <p><strong>Date:</strong> {selectedSlot.date.toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedSlot.time}</p>
                <p><strong>Location:</strong> {selectedFacility.location}</p>
                <p><strong>Price:</strong> ${selectedFacility.price}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Please arrive 10 minutes before your scheduled time. Bookings cannot be modified after confirmation.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleBooking}
                className="flex-1 bg-[#003366] text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Confirm Booking (${selectedFacility.price})
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedSlot(null);
                }}
                className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
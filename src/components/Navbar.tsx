import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: any;
  onAuthClick: () => void;
}

export default function Navbar({ currentPage, onNavigate, user, onAuthClick }: NavbarProps) {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onNavigate('home');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  if (!user) {
    return (
      <nav className="bg-[#003366] text-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate('home')}
              className="font-bold text-xl hover:text-yellow-300 transition-colors"
            >
              King Salman International University
            </button>
            <button
              onClick={onAuthClick}
              className="bg-white text-[#003366] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#003366] text-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="font-bold text-xl hover:text-yellow-300 transition-colors"
            >
              King Salman International University
            </button>
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => onNavigate('booking')}
                className={`${
                  currentPage === 'booking' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Booking System
              </button>
              <button
                onClick={() => onNavigate('activities')}
                className={`${
                  currentPage === 'activities' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Student Activities
              </button>
              <button
                onClick={() => onNavigate('schedule')}
                className={`${
                  currentPage === 'schedule' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Classroom Schedule
              </button>
              <button
                onClick={() => onNavigate('food')}
                className={`${
                  currentPage === 'food' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Food Court
              </button>
              <button
                onClick={() => onNavigate('complaints')}
                className={`${
                  currentPage === 'complaints' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Students Complaints
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 cursor-pointer hover:text-gray-300" />
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <User className="h-6 w-6" />
              <span className="hidden md:inline">{user.user_metadata?.full_name || 'Profile'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <LogOut className="h-6 w-6" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
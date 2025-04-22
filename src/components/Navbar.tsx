import React, { useState } from 'react';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: any;
  onAuthClick: () => void;
}

export default function Navbar({ currentPage, onNavigate, user, onAuthClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onNavigate('home');
      setIsMenuOpen(false);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  if (!user) {
    return (
      <nav className="bg-[#003366] text-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNavigate('home')}
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
              onClick={() => handleNavigate('home')}
              className="font-bold text-xl hover:text-yellow-300 transition-colors"
            >
              King Salman International University
            </button>
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => handleNavigate('booking')}
                className={`${
                  currentPage === 'booking' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Booking System
              </button>
              <button
                onClick={() => handleNavigate('activities')}
                className={`${
                  currentPage === 'activities' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Student Activities
              </button>
              <button
                onClick={() => handleNavigate('schedule')}
                className={`${
                  currentPage === 'schedule' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Classroom Schedule
              </button>
              <button
                onClick={() => handleNavigate('food')}
                className={`${
                  currentPage === 'food' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300`}
              >
                Food Court
              </button>
              <button
                onClick={() => handleNavigate('complaints')}
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
              onClick={() => handleNavigate('profile')}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <User className="h-6 w-6" />
              <span className="hidden md:inline">{user.user_metadata?.full_name || 'Profile'}</span>
            </button>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 hover:text-gray-300"
            >
              <LogOut className="h-6 w-6" />
              <span className="hidden md:inline">Logout</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } w-64 bg-[#003366] shadow-lg transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-yellow-300 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-4">
              <div className="border-b border-gray-700 pb-4 mb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="h-6 w-6" />
                  <span>{user.user_metadata?.full_name || 'Profile'}</span>
                </div>
              </div>
              <button
                onClick={() => handleNavigate('booking')}
                className={`${
                  currentPage === 'booking' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300 text-left py-2`}
              >
                Booking System
              </button>
              <button
                onClick={() => handleNavigate('activities')}
                className={`${
                  currentPage === 'activities' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300 text-left py-2`}
              >
                Student Activities
              </button>
              <button
                onClick={() => handleNavigate('schedule')}
                className={`${
                  currentPage === 'schedule' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300 text-left py-2`}
              >
                Classroom Schedule
              </button>
              <button
                onClick={() => handleNavigate('food')}
                className={`${
                  currentPage === 'food' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300 text-left py-2`}
              >
                Food Court
              </button>
              <button
                onClick={() => handleNavigate('complaints')}
                className={`${
                  currentPage === 'complaints' ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-300 text-left py-2`}
              >
                Students Complaints
              </button>
            </div>
            <div className="mt-auto p-4 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-300"
              >
                <LogOut className="h-6 w-6" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}

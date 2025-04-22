import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabaseClient';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FacilityBooking from './components/FacilityBooking';
import StudentActivities from './components/StudentActivities';
import ClassroomSchedule from './components/ClassroomSchedule';
import StudentComplaints from './components/StudentComplaints';
import FoodCourt from './components/FoodCourt';
import ChatBot from './components/ChatBot';
import Auth from './components/Auth';
import Profile from './components/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
        user={user}
        onAuthClick={() => setShowAuth(true)}
      />
      
      {currentPage === 'home' && <Home />}
      {currentPage === 'booking' && <FacilityBooking user={user} />}
      {currentPage === 'activities' && <StudentActivities />}
      {currentPage === 'schedule' && <ClassroomSchedule />}
      {currentPage === 'complaints' && <StudentComplaints user={user} />}
      {currentPage === 'food' && <FoodCourt />}
      {currentPage === 'profile' && <Profile />}
      
      <ChatBot />
      
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
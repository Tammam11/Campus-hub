import React from 'react';
import { GraduationCap, BookOpen, Users, Globe, Award, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="University Campus"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">King Salman International University</h1>
            <p className="text-xl md:text-2xl mb-8">Empowering Minds, Shaping Futures</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#003366] text-white px-8 py-3 rounded-full hover:bg-blue-800 transition-colors flex items-center">
                Explore Programs <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="bg-white text-[#003366] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
                Virtual Tour
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#003366] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">5,000+</div>
            <div className="text-gray-300">Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">300+</div>
            <div className="text-gray-300">Faculty Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-gray-300">Programs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-gray-300">Employment Rate</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose KSIU?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-[#003366]" />
            </div>
            <h3 className="text-xl font-bold mb-4">World-Class Education</h3>
            <p className="text-gray-600">Experience excellence through our internationally recognized programs and distinguished faculty.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-[#003366]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Global Perspective</h3>
            <p className="text-gray-600">Join a diverse community of students and faculty from around the world.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-[#003366]" />
            </div>
            <h3 className="text-xl font-bold mb-4">Research Excellence</h3>
            <p className="text-gray-600">Engage in cutting-edge research and innovation across multiple disciplines.</p>
          </div>
        </div>
      </div>

      {/* News & Events Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Latest News & Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="University Event"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">March 15, 2024</div>
                <h3 className="text-xl font-bold mb-2">Spring Innovation Summit</h3>
                <p className="text-gray-600 mb-4">Join us for our annual innovation showcase featuring student projects.</p>
                <button className="text-[#003366] font-medium hover:text-blue-800">Learn More →</button>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Research Lab"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">March 20, 2024</div>
                <h3 className="text-xl font-bold mb-2">Research Breakthrough</h3>
                <p className="text-gray-600 mb-4">KSIU researchers make significant advances in renewable energy.</p>
                <button className="text-[#003366] font-medium hover:text-blue-800">Learn More →</button>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Graduation"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">March 25, 2024</div>
                <h3 className="text-xl font-bold mb-2">Graduation Ceremony</h3>
                <p className="text-gray-600 mb-4">Celebrating the achievements of our Class of 2024.</p>
                <button className="text-[#003366] font-medium hover:text-blue-800">Learn More →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
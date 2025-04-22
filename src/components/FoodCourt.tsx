import React, { useState } from 'react';
import { Coffee, Pizza, X, Clock, MapPin, Phone, Star, ThumbsUp, Utensils, DollarSign } from 'lucide-react';

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: "Campus Café",
    type: "Café",
    rating: 4.5,
    totalRatings: 128,
    userRating: 0,
    location: "Building G, Ground Floor",
    hours: "7:00 AM - 8:00 PM",
    phone: "123-456-7890",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    menu: {
      "Hot Drinks": [
        { name: "Espresso", price: 15 },
        { name: "Cappuccino", price: 20 },
        { name: "Latte", price: 22 },
        { name: "Turkish Coffee", price: 18 }
      ],
      "Cold Drinks": [
        { name: "Iced Coffee", price: 25 },
        { name: "Frappuccino", price: 28 },
        { name: "Fresh Juice", price: 20 }
      ],
      "Desserts": [
        { name: "Chocolate Cake", price: 35 },
        { name: "Cheesecake", price: 40 },
        { name: "Cookies", price: 15 }
      ]
    }
  },
  {
    id: 2,
    name: "Pizza Paradise",
    type: "Italian",
    rating: 4.7,
    totalRatings: 256,
    userRating: 0,
    location: "Building H, First Floor",
    hours: "11:00 AM - 10:00 PM",
    phone: "123-456-7891",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    menu: {
      "Pizza": [
        { name: "Margherita", price: 55 },
        { name: "Pepperoni", price: 65 },
        { name: "Vegetarian", price: 60 },
        { name: "BBQ Chicken", price: 70 }
      ],
      "Pasta": [
        { name: "Spaghetti Bolognese", price: 45 },
        { name: "Fettuccine Alfredo", price: 50 },
        { name: "Penne Arrabiata", price: 45 }
      ],
      "Desserts": [
        { name: "Tiramisu", price: 35 },
        { name: "Panna Cotta", price: 30 }
      ]
    }
  },
  {
    id: 3,
    name: "Sushi Station",
    type: "Japanese",
    rating: 4.8,
    totalRatings: 189,
    userRating: 0,
    location: "Building K, Ground Floor",
    hours: "11:30 AM - 9:00 PM",
    phone: "123-456-7892",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    menu: {
      "Sushi Rolls": [
        { name: "California Roll", price: 45 },
        { name: "Spicy Tuna Roll", price: 50 },
        { name: "Dragon Roll", price: 60 },
        { name: "Rainbow Roll", price: 65 }
      ],
      "Main Dishes": [
        { name: "Chicken Teriyaki", price: 55 },
        { name: "Salmon Teriyaki", price: 65 },
        { name: "Udon Noodles", price: 45 }
      ],
      "Sides": [
        { name: "Miso Soup", price: 20 },
        { name: "Edamame", price: 25 }
      ]
    }
  },
  {
    id: 4,
    name: "Healthy Bowl",
    type: "Health Food",
    rating: 4.6,
    totalRatings: 147,
    userRating: 0,
    location: "Building G, Second Floor",
    hours: "8:00 AM - 8:00 PM",
    phone: "123-456-7893",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    menu: {
      "Bowls": [
        { name: "Quinoa Buddha Bowl", price: 50 },
        { name: "Acai Bowl", price: 45 },
        { name: "Poke Bowl", price: 60 }
      ],
      "Salads": [
        { name: "Greek Salad", price: 40 },
        { name: "Caesar Salad", price: 45 },
        { name: "Cobb Salad", price: 50 }
      ],
      "Smoothies": [
        { name: "Green Detox", price: 30 },
        { name: "Berry Blast", price: 30 },
        { name: "Protein Power", price: 35 }
      ]
    }
  },
  {
    id: 5,
    name: "Shawarma House",
    type: "Middle Eastern",
    rating: 4.7,
    totalRatings: 223,
    userRating: 0,
    location: "Building H, Ground Floor",
    hours: "10:00 AM - 10:00 PM",
    phone: "123-456-7894",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    menu: {
      "Shawarma": [
        { name: "Chicken Shawarma", price: 35 },
        { name: "Beef Shawarma", price: 40 },
        { name: "Mixed Shawarma", price: 45 }
      ],
      "Plates": [
        { name: "Falafel Plate", price: 40 },
        { name: "Mixed Grill", price: 65 },
        { name: "Kofta Plate", price: 55 }
      ],
      "Sides": [
        { name: "Hummus", price: 20 },
        { name: "Tabbouleh", price: 25 },
        { name: "Fattoush", price: 25 }
      ]
    }
  }
];

export default function FoodCourt() {
  const [restaurantsList] = useState(restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof restaurants[0] | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRating = (restaurantId: number, rating: number) => {
    setSelectedRating(0);
    setIsRatingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Food Court"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Campus Food Court</h1>
            <p className="text-lg md:text-xl">Discover delicious dining options on campus</p>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantsList.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 md:h-56">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                      setIsRatingModalOpen(true);
                    }}
                    className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-md"
                  >
                    <Star className={`w-4 h-4 ${restaurant.userRating > 0 ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="text-sm text-gray-500">({restaurant.totalRatings})</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
                    <p className="text-gray-600">{restaurant.type}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {restaurant.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {restaurant.hours}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {restaurant.phone}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    setIsMenuModalOpen(true);
                  }}
                  className="w-full bg-[#003366] text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>View Menu</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Modal */}
      {isRatingModalOpen && selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Rate {selectedRestaurant.name}</h3>
              <button
                onClick={() => setIsRatingModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setSelectedRating(rating)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 ${
                      rating <= (hoveredRating || selectedRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handleRating(selectedRestaurant.id, selectedRating)}
              disabled={selectedRating === 0}
              className={`w-full py-2 px-4 rounded-md ${
                selectedRating > 0
                  ? 'bg-[#003366] text-white hover:bg-blue-800'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              } transition-colors`}
            >
              Submit Rating
            </button>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {isMenuModalOpen && selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold">{selectedRestaurant.name}</h3>
                <p className="text-gray-600">{selectedRestaurant.type}</p>
              </div>
              <button
                onClick={() => setIsMenuModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-8">
              {Object.entries(selectedRestaurant.menu).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-xl font-semibold mb-4">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="flex items-center text-green-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
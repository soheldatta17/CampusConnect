import React, { useState } from 'react';
import { ShoppingCart, Coffee, Pizza, Sandwich } from 'lucide-react';

export function CanteenPage() {
  const [cart, setCart] = useState<string[]>([]);

  const menuItems = [
    {
      id: '1',
      name: 'Classic Burger',
      description: 'Juicy beef patty with fresh vegetables',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      category: 'Main Course',
      available: true
    },
    {
      id: '2',
      name: 'Cappuccino',
      description: 'Rich espresso with steamed milk',
      price: 3.49,
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c00e?w=400',
      category: 'Beverages',
      available: true
    },
    // Add more menu items as needed
  ];

  const categories = ['All', 'Main Course', 'Beverages', 'Snacks', 'Desserts'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Virtual Canteen</h1>
        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <ShoppingCart className="h-5 w-5" />
          <span>Cart ({cart.length})</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => setCart([...cart, item.id])}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
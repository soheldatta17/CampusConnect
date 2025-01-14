import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for books
  const books = [
    {
      id: '1',
      title: 'Introduction to Computer Science',
      author: 'Dr. Sarah Johnson',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
      description: 'A comprehensive guide to computer science fundamentals.',
      available: true,
      category: 'Computer Science'
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      author: 'Prof. Michael Chen',
      cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400',
      description: 'Advanced concepts in mathematics for engineering students.',
      available: false,
      category: 'Mathematics'
    },
    // Add more mock books as needed
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Virtual Library</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{book.author}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{book.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  book.available 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {book.available ? 'Available' : 'Borrowed'}
                </span>
                <button className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                  <BookOpen className="h-4 w-4" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
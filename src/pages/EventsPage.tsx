import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

export function EventsPage() {
  const events = [
    {
      id: '1',
      title: 'Tech Symposium 2024',
      description: 'Annual technology symposium featuring industry experts and workshops',
      date: new Date('2024-04-15T10:00:00'),
      location: 'Main Auditorium',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      category: 'seminar'
    },
    {
      id: '2',
      title: 'Coding Competition',
      description: 'Inter-college coding competition with exciting prizes',
      date: new Date('2024-04-20T09:00:00'),
      location: 'Computer Lab',
      image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=400',
      category: 'competition'
    },
    // Add more events as needed
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'competition':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'seminar':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Events & News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{format(event.date, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{format(event.date, 'h:mm a')}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2">
                <Users className="h-5 w-5" />
                <span>RSVP</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
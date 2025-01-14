import React from 'react';
import { useStore } from '../store/useStore';
import { User, Mail, Phone, BookOpen, Building } from 'lucide-react';

export function ProfilePage() {
  const user = useStore((state) => state.user);

  // Temporary mock data
  const mockUser = {
    rollNumber: "2024CS001",
    fullName: "John Doe",
    profilePicture: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
    email: "john.doe@college.edu",
    phone: "+1 234 567 8900",
    course: "Computer Science",
    department: "Engineering"
  };

  const currentUser = user || mockUser;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute -bottom-16 left-8">
            <img
              src={currentUser.profilePicture}
              alt={currentUser.fullName}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
            />
          </div>
        </div>
        
        <div className="pt-20 pb-8 px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentUser.fullName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Roll Number: {currentUser.rollNumber}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              icon={<Mail className="w-5 h-5 text-indigo-500" />}
              label="Email"
              value={currentUser.email}
            />
            <InfoCard
              icon={<Phone className="w-5 h-5 text-indigo-500" />}
              label="Phone"
              value={currentUser.phone}
            />
            <InfoCard
              icon={<BookOpen className="w-5 h-5 text-indigo-500" />}
              label="Course"
              value={currentUser.course}
            />
            <InfoCard
              icon={<Building className="w-5 h-5 text-indigo-500" />}
              label="Department"
              value={currentUser.department}
            />
          </div>

          <button className="mt-8 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      {icon}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
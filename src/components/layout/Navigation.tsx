import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import {
  User,
  BookOpen,
  CheckSquare,
  Coffee,
  Calendar,
  Users,
  Menu,
  Sun,
  Moon,
} from 'lucide-react';

export function Navigation() {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              College Super App
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/profile" icon={<User />} text="Profile" />
            <NavLink to="/library" icon={<BookOpen />} text="Library" />
            <NavLink to="/tasks" icon={<CheckSquare />} text="Tasks" />
            <NavLink to="/canteen" icon={<Coffee />} text="Canteen" />
            <NavLink to="/events" icon={<Calendar />} text="Events" />
            <NavLink to="/social" icon={<Users />} text="Social" />
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
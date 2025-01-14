import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  User,
  BookOpen,
  CheckSquare,
  Coffee,
  Calendar,
  Users,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

export function Sidebar() {
  const { darkMode, toggleDarkMode, sidebarOpen, toggleSidebar } = useStore();

  const navItems = [
    { to: '/', icon: <Home />, text: 'Home', id: 'home' },
    { to: '/library', icon: <BookOpen />, text: 'Library', id: 'library' },
    { to: '/tasks', icon: <CheckSquare />, text: 'Tasks', id: 'tasks' },
    { to: '/canteen', icon: <Coffee />, text: 'Canteen', id: 'canteen' },
    { to: '/events', icon: <Calendar />, text: 'Events', id: 'events' },
    { to: '/social', icon: <Users />, text: 'Social', id: 'social' },
  ];

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-screen bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">CampusConnect</span>
            </motion.div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            id="sidebar-toggle"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-4">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    }`
                  }
                  title={!sidebarOpen ? item.text : undefined}
                  id={item.id}
                >
                  {item.icon}
                  {sidebarOpen && <span>{item.text}</span>}
                </NavLink>
              </motion.div>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <NavLink
            to="/profile"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors"
            title={!sidebarOpen ? "Profile" : undefined}
            id="profile"
          >
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
              alt="Profile"
              className="w-8 h-8 rounded-full ring-2 ring-indigo-500/50"
            />
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student</p>
              </div>
            )}
          </NavLink>

          <button
            onClick={toggleDarkMode}
            className="mt-4 w-full flex items-center justify-center space-x-2 p-3 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors"
            title={!sidebarOpen ? "Toggle Theme" : undefined}
            id="theme-toggle"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {sidebarOpen && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
import React from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

export function Layout({ children }: { children: React.ReactNode }) {
  const { darkMode, sidebarOpen } = useStore();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-900">
        <Sidebar />
        <main className={`transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-20'}`}>
          <motion.div 
            className="max-w-7xl mx-auto px-8 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
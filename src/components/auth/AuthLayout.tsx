import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center space-x-2">
            <BookOpen className="w-8 h-8 text-indigo-400" />
            <span className="text-2xl font-bold text-white">College Super App</span>
          </Link>
          <h2 className="text-2xl font-bold text-white mt-6">{title}</h2>
          <p className="text-gray-400 mt-2">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
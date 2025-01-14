import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-6 text-center text-gray-600 dark:text-gray-400">
      <p className="flex items-center justify-center space-x-2">
        <span>Made with</span>
        <Heart className="w-4 h-4 text-red-500 fill-current" />
        <span>by Sohel Datta</span>
      </p>
    </footer>
  );
}
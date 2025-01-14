import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Coffee, Calendar, CheckSquare, Sun, Cloud, CloudRain, Wind, Newspaper, Trophy, TrendingUp, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

function FadeInSection({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export function HomePage() {
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [weather, setWeather] = React.useState({
    temp: '24°C',
    condition: 'Partly Cloudy',
    icon: <Cloud className="w-8 h-8" />
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    {
      title: 'Library',
      icon: <Book className="w-8 h-8" />,
      description: 'Browse and borrow books',
      link: '/library',
      color: 'bg-blue-500',
    },
    {
      title: 'Canteen',
      icon: <Coffee className="w-8 h-8" />,
      description: 'Order food and drinks',
      link: '/canteen',
      color: 'bg-orange-500',
    },
    {
      title: 'Events',
      icon: <Calendar className="w-8 h-8" />,
      description: 'View upcoming events',
      link: '/events',
      color: 'bg-purple-500',
    },
    {
      title: 'Tasks',
      icon: <CheckSquare className="w-8 h-8" />,
      description: 'Manage your tasks',
      link: '/tasks',
      color: 'bg-green-500',
    },
  ];

  const campusNews = [
    {
      title: 'Annual Tech Fest Announced',
      date: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      category: 'Events'
    },
    {
      title: 'New Research Lab Opening',
      date: 'March 18, 2024',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      category: 'Facilities'
    },
    {
      title: 'Sports Tournament Results',
      date: 'March 20, 2024',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      category: 'Sports'
    }
  ];

  const academicProgress = {
    semester: '6th Semester',
    cgpa: '3.8',
    completedCredits: '90',
    totalCredits: '120',
    recentGrades: [
      { subject: 'Computer Networks', grade: 'A' },
      { subject: 'Database Systems', grade: 'A+' },
      { subject: 'Software Engineering', grade: 'A-' }
    ]
  };

  if (showWelcome) {
    return (
      <motion.div 
        className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to CampusConnect</h1>
          <p className="text-xl">Your all-in-one campus companion</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <FadeInSection>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Welcome back, John! 👋
              </motion.h1>
              <p className="text-indigo-100">Here's what's happening in your campus today</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-3">
                {weather.icon}
                <div>
                  <p className="font-semibold">{weather.temp}</p>
                  <p className="text-sm text-indigo-100">{weather.condition}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Quick Actions */}
      <FadeInSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={action.link} className="block group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg">
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      {/* Academic Progress */}
      <FadeInSection delay={0.3}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Academic Progress</h2>
            <TrendingUp className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Current CGPA</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{academicProgress.cgpa}</p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Semester</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{academicProgress.semester}</p>
            </div>
            <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Credits Completed</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {academicProgress.completedCredits}/{academicProgress.totalCredits}
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Recent Performance</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">Excellent</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Grades</h3>
            <div className="space-y-3">
              {academicProgress.recentGrades.map((grade, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white">{grade.subject}</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">{grade.grade}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Campus News */}
      <FadeInSection delay={0.4}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Campus News</h2>
            <Newspaper className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campusNews.map((news, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-sm">
                    {news.category}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{news.date}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Upcoming & Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FadeInSection delay={0.5}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Schedule</h2>
              <Calendar className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Computer Networks</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">9:00 AM - 10:30 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Mathematics</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">11:00 AM - 12:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.6}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</h2>
              <Bell className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Research Paper</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Computer Networks</p>
                </div>
                <span className="text-red-500 text-sm">Due Tomorrow</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Math Assignment</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Chapter 5 Problems</p>
                </div>
                <span className="text-yellow-500 text-sm">Due in 3 days</span>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
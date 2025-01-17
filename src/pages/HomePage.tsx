import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Coffee, Calendar, CheckSquare, Sun, Cloud, CloudRain, Wind, Newspaper, Trophy, TrendingUp, Bell, GraduationCap, Award, Users, Zap } from 'lucide-react';
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
      gradient: 'from-blue-500/20 via-blue-400/10 to-blue-300/5',
      iconGradient: 'from-blue-600 to-blue-400',
      borderGlow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
    },
    {
      title: 'Canteen',
      icon: <Coffee className="w-8 h-8" />,
      description: 'Order food and drinks',
      link: '/canteen',
      gradient: 'from-orange-500/20 via-orange-400/10 to-orange-300/5',
      iconGradient: 'from-orange-600 to-orange-400',
      borderGlow: 'hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]'
    },
    {
      title: 'Events',
      icon: <Calendar className="w-8 h-8" />,
      description: 'View upcoming events',
      link: '/events',
      gradient: 'from-purple-500/20 via-purple-400/10 to-purple-300/5',
      iconGradient: 'from-purple-600 to-purple-400',
      borderGlow: 'hover:shadow-[0_0_15px_rgba(147,51,234,0.5)]'
    },
    {
      title: 'Tasks',
      icon: <CheckSquare className="w-8 h-8" />,
      description: 'Manage your tasks',
      link: '/tasks',
      gradient: 'from-green-500/20 via-green-400/10 to-green-300/5',
      iconGradient: 'from-green-600 to-green-400',
      borderGlow: 'hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]'
    },
  ];

  const campusNews = [
    {
      title: 'Annual Tech Fest Announced',
      date: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      category: 'Events',
      gradient: 'from-indigo-500/20 to-purple-500/20'
    },
    {
      title: 'New Research Lab Opening',
      date: 'March 18, 2024',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
      category: 'Facilities',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: 'Sports Tournament Results',
      date: 'March 20, 2024',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
      category: 'Sports',
      gradient: 'from-green-500/20 to-emerald-500/20'
    }
  ];

  const academicProgress = {
    semester: '6th Semester',
    cgpa: '3.8',
    completedCredits: '90',
    totalCredits: '120',
    recentGrades: [
      { subject: 'Computer Networks', grade: 'A', score: 92 },
      { subject: 'Database Systems', grade: 'A+', score: 98 },
      { subject: 'Software Engineering', grade: 'A-', score: 89 }
    ],
    achievements: [
      { title: 'Dean\'s List', date: 'Fall 2023', icon: <Award className="w-5 h-5" /> },
      { title: 'Research Excellence', date: 'Spring 2024', icon: <Zap className="w-5 h-5" /> },
      { title: 'Perfect Attendance', date: 'Current', icon: <Trophy className="w-5 h-5" /> }
    ]
  };

  const upcomingEvents = [
    {
      title: 'Tech Workshop',
      date: 'Tomorrow, 2:00 PM',
      location: 'Lab 204',
      type: 'workshop',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400'
    },
    {
      title: 'Career Fair',
      date: 'March 25, 10:00 AM',
      location: 'Main Hall',
      type: 'career',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400'
    }
  ];

  if (showWelcome) {
    return (
      <motion.div 
        className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
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
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
          <div className="relative flex justify-between items-start">
            <div>
              <motion.h1 
                className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Welcome back, John! 👋
              </motion.h1>
              <p className="text-lg text-indigo-100">Here's what's happening in your campus today</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                {weather.icon}
                <div>
                  <p className="font-semibold text-xl">{weather.temp}</p>
                  <p className="text-indigo-100">{weather.condition}</p>
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
                <div className={`relative overflow-hidden bg-gradient-to-br ${action.gradient} backdrop-blur-xl rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] ${action.borderGlow} border border-white/20 dark:border-gray-800`}>
                  <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
                  <div className={`relative bg-gradient-to-br ${action.iconGradient} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 transition-colors duration-300">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      {/* Academic Progress */}
      <FadeInSection delay={0.3}>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Academic Progress
            </h2>
            <GraduationCap className="w-6 h-6 text-indigo-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl backdrop-blur-xl border border-white/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Current CGPA</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{academicProgress.cgpa}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-2xl backdrop-blur-xl border border-white/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Semester</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{academicProgress.semester}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-2xl backdrop-blur-xl border border-white/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Credits Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {academicProgress.completedCredits}/{academicProgress.totalCredits}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 p-6 rounded-2xl backdrop-blur-xl border border-white/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Achievement Points</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">850</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Grades</h3>
              <div className="space-y-4">
                {academicProgress.recentGrades.map((grade, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 p-4 rounded-xl backdrop-blur-xl border border-white/20 dark:border-gray-700/20">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900 dark:text-white">{grade.subject}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{grade.score}%</span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{grade.grade}</span>
                      </div>
                    </div>
                    <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full"
                        style={{ width: `${grade.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
              <div className="space-y-4">
                {academicProgress.achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 p-4 rounded-xl backdrop-blur-xl border border-white/20 dark:border-gray-700/20 flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-lg text-white">
                      {achievement.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{achievement.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Campus News */}
      <FadeInSection delay={0.4}>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Campus News
            </h2>
            <Newspaper className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campusNews.map((news, index) => (
              <motion.div
                key={index}
                className={`group cursor-pointer bg-gradient-to-br ${news.gradient} backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-md">
                    {news.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{news.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Upcoming Events */}
      <FadeInSection delay={0.5}>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Upcoming Events
            </h2>
            <Calendar className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="relative p-6">
                  <span className="inline-block px-3 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full text-sm font-medium backdrop-blur-md mb-4">
                    {event.type}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <div className="space-y-2 text-gray-200">
                    <p className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{event.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
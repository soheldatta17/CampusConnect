import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { LibraryPage } from './pages/LibraryPage';
import { TasksPage } from './pages/TasksPage';
import { CanteenPage } from './pages/CanteenPage';
import { EventsPage } from './pages/EventsPage';
import { SocialPage } from './pages/SocialPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { Toaster } from 'react-hot-toast';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useStore } from './store/useStore';

function App() {
  const { darkMode } = useStore();

  const steps = [
    {
      target: '#home',
      content: 'Welcome to CampusConnect Hub! This is your dashboard where you can see all your important information.',
      disableBeacon: true,
    },
    {
      target: '#library',
      content: 'Browse and borrow books from our digital library.',
    },
    {
      target: '#tasks',
      content: 'Manage your assignments, projects, and deadlines.',
    },
    {
      target: '#canteen',
      content: 'Order food and drinks from the campus canteen.',
    },
    {
      target: '#social',
      content: 'Connect with your classmates and join the campus community.',
    },
    {
      target: '#profile',
      content: 'View and edit your profile information.',
    },
    {
      target: '#theme-toggle',
      content: 'Switch between light and dark mode for comfortable viewing.',
    },
    {
      target: '#sidebar-toggle',
      content: 'Collapse or expand the sidebar for more space.',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Save to localStorage that the tour is completed
      localStorage.setItem('tourCompleted', 'true');
    }
  };

  const showTour = !localStorage.getItem('tourCompleted');

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Joyride
            steps={steps}
            continuous
            showProgress
            showSkipButton
            run={showTour}
            callback={handleJoyrideCallback}
            styles={{
              options: {
                primaryColor: '#4f46e5',
                textColor: darkMode ? '#fff' : '#111827',
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              },
            }}
          />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/library" element={<PrivateRoute><LibraryPage /></PrivateRoute>} />
            <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
            <Route path="/canteen" element={<PrivateRoute><CanteenPage /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><EventsPage /></PrivateRoute>} />
            <Route path="/social" element={<PrivateRoute><SocialPage /></PrivateRoute>} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
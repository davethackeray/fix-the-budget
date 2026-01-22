import React, { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import CinematicDashboard from './components/CinematicDashboard';
import GovUkDashboard from './components/GovUkDashboard';
import Onboarding from './components/Onboarding';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5
});

function App() {
  const [state, setState] = useState(null);
  const [initialState, setInitialState] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [crisisActive, setCrisisActive] = useState(false);
  const [achievementToast, setAchievementToast] = useState(null);
  const [viewMode, setViewMode] = useState('cinematic'); // 'cinematic' | 'govuk'
  const [headlines, setHeadlines] = useState([
    { type: 'LIVE', text: 'Welcome to the Treasury. The Red Box awaits your first move, Chancellor.' }
  ]);

  useEffect(() => {
    // Only apply global theme updates if in cinematic mode, GovUkDashboard handles its own
    if (viewMode === 'cinematic') {
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
    }
  }, [theme, viewMode]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'cinematic' ? 'govuk' : 'cinematic');
  };

  // CRISIS EFFECT: Trigger screen shake on bad news
  const triggerCrisis = useCallback(() => {
    setCrisisActive(true);
    setTimeout(() => setCrisisActive(false), 500);
  }, []);

  // ACHIEVEMENT SYSTEM
  const checkAchievements = useCallback((newState, prevState) => {
    if (!prevState || !newState) return;

    const totalExp = newState.expenditure.reduce((sum, e) => sum + e.value, 0);
    const totalRev = newState.revenue.reduce((sum, r) => sum + r.value, 0);
    const deficit = totalExp - totalRev;

    const prevTotalExp = prevState.expenditure.reduce((sum, e) => sum + e.value, 0);
    const prevTotalRev = prevState.revenue.reduce((sum, r) => sum + r.value, 0);
    const prevDeficit = prevTotalExp - prevTotalRev;

    // First Surplus Achievement
    if (prevDeficit > 0 && deficit <= 0) {
      setAchievementToast({
        icon: '🏆',
        title: 'SURPLUS ACHIEVED!',
        desc: "You've balanced the books. The markets love you."
      });
      setTimeout(() => setAchievementToast(null), 4000);
    }

    // Market Crash Achievement (bad)
    if (newState.marketConfidence < 40 && prevState.marketConfidence >= 40) {
      setAchievementToast({
        icon: '📉',
        title: 'MARKET PANIC',
        desc: 'Investors are fleeing. Sterling is tanking.'
      });
      setTimeout(() => setAchievementToast(null), 4000);
    }

    // GDP Growth Achievement
    if (newState.gdp > 2884 && prevState.gdp <= 2884) {
      setAchievementToast({
        icon: '📈',
        title: 'KEYNESIAN HERO',
        desc: '3% GDP growth achieved through investment!'
      });
      setTimeout(() => setAchievementToast(null), 4000);
    }
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnectionStatus('connected');
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setConnectionStatus('error');
    });

    socket.on('init', (data) => {
      console.log('Received init data');
      setState(data);
      if (!initialState) setInitialState(data);
    });

    socket.on('state-update', (data) => {
      checkAchievements(data, state);
      setState(data);
    });

    socket.on('news-flash', (newHeadlines) => {
      // Trigger crisis effect for crisis headlines
      if (newHeadlines.some(h => h.type === 'CRISIS')) {
        triggerCrisis();
      }
      setHeadlines(prev => [...newHeadlines, ...prev].slice(0, 15));
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('init');
      socket.off('state-update');
      socket.off('news-flash');
    };
  }, [initialState, state, checkAchievements, triggerCrisis]);

  const handleUpdate = (type, id, value) => {
    socket.emit('update-budget', { type, id, value });
  };

  const handleReset = () => {
    socket.emit('reset');
    setHeadlines([{ type: 'LIVE', text: 'Budget reset. A fresh start for the nation.' }]);
  };

  if (connectionStatus === 'error') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-bg-main text-red-500 gap-6">
        <div className="bg-grid" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative"
        >
          <AlertTriangle size={80} className="text-red-500" />
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
        </motion.div>
        <h1 className="text-4xl font-display tracking-wider">CONNECTION LOST</h1>
        <p className="text-text-muted text-center max-w-md">
          The Treasury systems are offline. Ensure the backend server is running on port 3001.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-danger mt-4"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!state) return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-bg-main gap-6 overflow-hidden">
      <div className="bg-grid" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-chancellor-gold border-t-transparent rounded-full mx-auto mb-8"
        />
        <h1 className="text-5xl font-display text-gradient-gold mb-4">OPENING THE RED BOX</h1>
        <p className="text-text-muted font-mono text-sm animate-pulse">
          {connectionStatus === 'connecting' ? '// Establishing secure Treasury link...' : '// Awaiting fiscal data...'}
        </p>
      </motion.div>
    </div>
  );

  return viewMode === 'cinematic' ? (
    <CinematicDashboard
      state={state}
      initialState={initialState}
      headlines={headlines}
      crisisActive={crisisActive}
      achievementToast={achievementToast}
      showOnboarding={showOnboarding}
      setShowOnboarding={setShowOnboarding}
      connectionStatus={connectionStatus}
      theme={theme}
      toggleTheme={toggleTheme}
      handleReset={handleReset}
      handleUpdate={handleUpdate}
      toggleViewMode={toggleViewMode}
    />
  ) : (
    <GovUkDashboard
      state={state}
      initialState={initialState}
      headlines={headlines}
      toggleViewMode={toggleViewMode}
      handleReset={handleReset}
      handleUpdate={handleUpdate}
      toggleTheme={toggleTheme}
      theme={theme}
    />
  );
}

export default App;
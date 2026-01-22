import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Landmark, Percent, Users, BarChart3, AlertTriangle, Heart } from 'lucide-react';

// Circular Gauge Component
const CircularGauge = ({ value, max = 100, color, size = 60 }) => {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percent = Math.min(Math.max(value / max, 0), 1);
  const offset = circumference - percent * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut" }}
        strokeLinecap="round"
        className="gauge-glow"
      />
    </svg>
  );
};

const KpiCards = ({ state, initialState }) => {
  const totalExp = state.expenditure.reduce((sum, e) => sum + e.value, 0);
  const totalRev = state.revenue.reduce((sum, r) => sum + r.value, 0);
  const deficit = totalExp - totalRev;
  const deficitPct = (deficit / state.gdp) * 100;

  // Calculate changes from initial state
  const getChange = (current, initial) => {
    if (!initial) return null;
    return current - initial;
  };

  const initialDeficit = initialState
    ? initialState.expenditure.reduce((s, e) => s + e.value, 0) - initialState.revenue.reduce((s, r) => s + r.value, 0)
    : null;

  const cards = [
    {
      label: 'THE DEFICIT',
      value: `£${Math.abs(deficit).toFixed(0)}bn`,
      sub: deficit > 0 ? 'OVERSPENDING' : 'SURPLUS',
      icon: deficit > 0 ? TrendingDown : TrendingUp,
      color: deficit > 50 ? '#ef4444' : deficit > 0 ? '#f97316' : '#22c55e',
      gauge: Math.min(100, Math.abs(deficitPct) * 10),
      critical: deficit > 50,
    },
    {
      label: 'GDP',
      value: `£${(state.gdp / 1000).toFixed(2)}tn`,
      sub: 'THE ECONOMY',
      icon: Landmark,
      color: '#D4AF37',
      gauge: (state.gdp / 3500) * 100,
      change: initialState ? ((state.gdp - initialState.gdp) / initialState.gdp * 100).toFixed(1) : null,
    },
    {
      label: 'BORROWING COST',
      value: `${state.giltYield.toFixed(2)}%`,
      sub: 'GILT YIELD',
      icon: Percent,
      color: state.giltYield > 5 ? '#ef4444' : '#3b82f6',
      gauge: (state.giltYield / 10) * 100,
      critical: state.giltYield > 6,
    },
    {
      label: 'PUBLIC MOOD',
      value: `${state.publicMood.toFixed(0)}%`,
      sub: 'HAPPINESS',
      icon: state.publicMood < 40 ? AlertTriangle : Users,
      color: state.publicMood < 30 ? '#ef4444' : state.publicMood < 50 ? '#f97316' : '#22c55e',
      gauge: state.publicMood,
      critical: state.publicMood < 30,
    },
    {
      label: 'MARKET TRUST',
      value: `${state.marketConfidence.toFixed(0)}%`,
      sub: 'INVESTORS',
      icon: BarChart3,
      color: state.marketConfidence < 50 ? '#ef4444' : '#a855f7',
      gauge: state.marketConfidence,
      critical: state.marketConfidence < 40,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.08, type: "spring", damping: 20 }}
          className={`
            glass-panel rounded-2xl p-5 relative overflow-hidden group
            ${card.critical ? 'crisis-pulse border-chancellor-red' : ''}
          `}
        >
          {/* Background Glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${card.color}20 0%, transparent 70%)`
            }}
          />

          {/* Header */}
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
              {card.label}
            </span>
            <div
              className="p-2 rounded-lg transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${card.color}20` }}
            >
              <card.icon size={16} style={{ color: card.color }} />
            </div>
          </div>

          {/* Value & Gauge */}
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div
                className="text-3xl font-display tracking-wider"
                style={{ color: card.color }}
              >
                {card.value}
              </div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider mt-1 flex items-center gap-2">
                {card.sub}
                {card.change && (
                  <span className={`font-mono ${parseFloat(card.change) >= 0 ? 'text-accent-green' : 'text-chancellor-red'}`}>
                    {parseFloat(card.change) >= 0 ? '+' : ''}{card.change}%
                  </span>
                )}
              </div>
            </div>
            <div className="relative">
              <CircularGauge value={card.gauge} color={card.color} />
              {card.critical && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <AlertTriangle size={20} className="text-chancellor-red" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KpiCards;
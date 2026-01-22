import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Info, ChevronDown, ChevronUp, AlertTriangle, Heart, Skull } from 'lucide-react';

// EMPATHY MATRIX - same as server
const EMPATHY_MATRIX = {
  'Health': { factor: 45000, unit: 'waiting list entries', icon: '🏥' },
  'Education': { factor: 1000, unit: 'teachers at risk', icon: '📚' },
  'Social Protection': { factor: 50000, unit: 'families affected', icon: '👪' },
  'Infrastructure': { factor: 100000, unit: 'potholes unfixed', icon: '🚧' },
  'Other Services': { factor: 5000, unit: 'police unfunded', icon: '👮' },
};

const ControlPanel = ({ state, initialState, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('expenditure');
  const [expandedItem, setExpandedItem] = useState(null);

  // Plain English naming
  const nameMap = {
    'Social Protection': 'WELFARE & PENSIONS',
    'Debt Interest': 'DEBT INTEREST',
    'Other Services': 'POLICE & COUNCILS',
    'Corporation Tax': 'BUSINESS TAX',
    'NI': 'NATIONAL INSURANCE',
    'Other Revenue': 'FUEL & BOOZE TAX',
    'VAT': 'VAT (SALES TAX)',
    'Health': 'NHS & HEALTH',
    'Education': 'SCHOOLS & UNIS',
    'Defense': 'ARMY & DEFENSE',
    'Infrastructure': 'ROADS & RAILWAYS',
    'Income Tax': 'INCOME TAX'
  };

  // Detailed descriptions
  const descriptionMap = {
    'Health': "Hospitals, doctors, nurses, and medicine. Cutting this means longer A&E waits and cancelled operations.",
    'Social Protection': "Pensions for the elderly and benefits for families. The elderly vote. A lot.",
    'Education': "Schools, teachers, universities. The investment in tomorrow's workforce.",
    'Defense': "Army, Navy, Air Force, spies. Keeps the country safe (and the military-industrial complex happy).",
    'Debt Interest': "The interest we pay on what we've already borrowed. You can't cut this - it's already owed.",
    'Infrastructure': "Roads, railways, broadband. Long-term investment that boosts GDP.",
    'Other Services': "Police, prisons, councils, bins, libraries, foreign aid. The unglamorous essentials.",

    'Income Tax': "The big one. Taken from wages. Raise it and workers complain. Cut it and the rich get richer.",
    'VAT': "20% tax on everything you buy. Hits the poor hardest (they spend all their income).",
    'Corporation Tax': "Tax on company profits. Raise it and businesses threaten to leave for Ireland.",
    'NI': "National Insurance. A stealth tax on work. Funds the NHS and pensions.",
    'Other Revenue': "Fuel duty (drivers hate this), alcohol/tobacco taxes, stamp duty. Sin taxes."
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-chancellor-gold/20 to-transparent p-6 border-b border-panel-border">
        <div className="flex items-center gap-4">
          <div className="bg-chancellor-gold/30 p-3 rounded-xl">
            <Settings2 className="text-chancellor-gold" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-display tracking-wider text-gradient-gold">THE RED BOX</h2>
            <p className="text-xs text-text-muted uppercase tracking-wider">Drag sliders to change the budget</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-panel-border">
        <button
          onClick={() => setActiveTab('expenditure')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'expenditure'
              ? 'text-white bg-chancellor-red/20'
              : 'text-text-muted hover:text-white hover:bg-white/5'
            }`}
        >
          💸 SPENDING
          {activeTab === 'expenditure' && (
            <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-chancellor-red" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('revenue')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === 'revenue'
              ? 'text-white bg-accent-green/20'
              : 'text-text-muted hover:text-white hover:bg-white/5'
            }`}
        >
          💰 TAXES
          {activeTab === 'revenue' && (
            <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-accent-green" />
          )}
        </button>
      </div>

      {/* Items */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        {state[activeTab].map((item, index) => {
          const startVal = initialState
            ? initialState[activeTab].find(i => i.id === item.id)?.value || item.value
            : item.value;
          const isLocked = item.id === 'Debt Interest';
          const description = descriptionMap[item.id] || "No description.";
          const isExpanded = expandedItem === item.id;
          const diff = item.value - startVal;
          const empathy = EMPATHY_MATRIX[item.id];
          const humanCost = empathy && diff < 0 ? Math.round(Math.abs(diff) * empathy.factor) : 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                rounded-xl overflow-hidden transition-all
                ${isLocked ? 'bg-white/5 opacity-60' : 'bg-white/5 hover:bg-white/10'}
                ${humanCost > 0 ? 'border border-chancellor-red/50' : 'border border-transparent'}
              `}
            >
              {/* Item Header */}
              <div
                className="p-4 cursor-pointer flex items-center justify-between"
                onClick={() => !isLocked && setExpandedItem(isExpanded ? null : item.id)}
              >
                <div className="flex items-center gap-3">
                  {isLocked ? (
                    <span className="text-lg">🔒</span>
                  ) : activeTab === 'expenditure' ? (
                    <span className="text-lg">{empathy?.icon || '📊'}</span>
                  ) : (
                    <span className="text-lg">💷</span>
                  )}
                  <div>
                    <div className="font-bold text-sm tracking-wide">
                      {nameMap[item.id] || item.id}
                    </div>
                    {diff !== 0 && !isLocked && (
                      <div className={`text-xs font-mono ${diff > 0 ? 'text-accent-green' : 'text-chancellor-red'}`}>
                        {diff > 0 ? '+' : ''}{diff.toFixed(1)}bn from baseline
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`
                    text-xl font-display tracking-wider px-3 py-1 rounded-lg
                    ${activeTab === 'expenditure' ? 'bg-chancellor-red/20 text-white' : 'bg-accent-green/20 text-white'}
                  `}>
                    £{item.value.toFixed(0)}bn
                  </span>
                  {!isLocked && (
                    isExpanded ? <ChevronUp size={18} className="text-text-muted" /> : <ChevronDown size={18} className="text-text-muted" />
                  )}
                </div>
              </div>

              {/* Expanded Slider & Info */}
              <AnimatePresence>
                {isExpanded && !isLocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4">
                      {/* The Slider */}
                      <div className="relative pt-2">
                        <input
                          type="range"
                          min={startVal * 0.5}
                          max={startVal * 1.5}
                          step="1"
                          value={item.value}
                          onChange={(e) => onUpdate(activeTab, item.id, parseFloat(e.target.value))}
                          className="w-full"
                        />
                        {/* Baseline marker */}
                        <div
                          className="absolute top-0 h-2 w-0.5 bg-white/50"
                          style={{ left: '50%', transform: 'translateX(-50%)' }}
                        />
                        <div className="flex justify-between text-[10px] text-text-muted mt-1">
                          <span>-50%</span>
                          <span className="text-chancellor-gold">BASELINE</span>
                          <span>+50%</span>
                        </div>
                      </div>

                      {/* Human Cost Warning */}
                      {humanCost > 0 && (
                        <motion.div
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className="bg-chancellor-red/20 border border-chancellor-red/50 rounded-lg p-3 flex items-start gap-3"
                        >
                          <Skull className="text-chancellor-red shrink-0 mt-0.5" size={18} />
                          <div>
                            <div className="text-chancellor-red font-bold text-sm">HUMAN COST</div>
                            <div className="text-xs text-white/80">
                              This cut affects approximately <span className="font-bold text-white">{humanCost.toLocaleString()}</span> {empathy.unit}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Description */}
                      <div className="flex items-start gap-3 text-xs text-text-muted bg-white/5 rounded-lg p-3">
                        <Info size={16} className="text-chancellor-gold shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block mb-1">What is this?</span>
                          {description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Tip */}
      <div className="p-4 border-t border-panel-border bg-white/5">
        <div className="flex items-start gap-3 text-xs text-text-muted">
          <AlertTriangle size={14} className="text-crisis-orange shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Warning:</strong> Every action has consequences.
            Cuts cause strikes. Tax hikes slow growth. Choose wisely, Chancellor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

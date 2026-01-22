import React from 'react';
import { motion } from 'framer-motion';

const TickerTape = ({ headlines }) => {
  return (
    <div className="ticker-container py-2 border-t border-white/10 relative overflow-hidden">
      {/* Breaking News Label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4 bg-black font-display text-lg tracking-wider text-white">
        <span className="relative flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          BREAKING
        </span>
      </div>

      <div className="pl-32 flex whitespace-nowrap">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: Math.max(30, headlines.length * 8),
            ease: "linear"
          }}
          className="flex items-center"
        >
          {/* First set */}
          {headlines.map((h, i) => (
            <div key={i} className="flex items-center mx-6">
              <span className={`
                text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider mr-3
                ${h.type === 'CRISIS' ? 'bg-black text-red-400 border border-red-500' :
                  h.type === 'MARKET' ? 'bg-blue-900 text-blue-200 border border-blue-500' :
                    h.type === 'UPDATE' ? 'bg-green-900 text-green-200 border border-green-500' :
                      h.type === 'AI' ? 'bg-purple-900 text-purple-200 border border-purple-500' :
                        'bg-white/20 text-white'}
              `}>
                {h.type}
              </span>
              <span className="text-white font-medium text-sm tracking-tight">
                {h.text}
              </span>
              <span className="text-white/20 text-2xl ml-6">◆</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {headlines.map((h, i) => (
            <div key={`d-${i}`} className="flex items-center mx-6">
              <span className={`
                text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider mr-3
                ${h.type === 'CRISIS' ? 'bg-black text-red-400 border border-red-500' :
                  h.type === 'MARKET' ? 'bg-blue-900 text-blue-200 border border-blue-500' :
                    h.type === 'UPDATE' ? 'bg-green-900 text-green-200 border border-green-500' :
                      h.type === 'AI' ? 'bg-purple-900 text-purple-200 border border-purple-500' :
                        'bg-white/20 text-white'}
              `}>
                {h.type}
              </span>
              <span className="text-white font-medium text-sm tracking-tight">
                {h.text}
              </span>
              <span className="text-white/20 text-2xl ml-6">◆</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-chancellor-red to-transparent pointer-events-none" />
    </div>
  );
};

export default TickerTape;

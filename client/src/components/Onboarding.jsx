import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Briefcase, Target, Sliders, Flag } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "WELCOME, CHANCELLOR",
      text: "The previous government has fled. The Treasury is yours. Inside this Red Box lies the fate of 67 million people.",
      icon: <Briefcase size={48} className="text-white" />,
      bgClass: "from-chancellor-red to-red-900"
    },
    {
      title: "YOUR MISSION",
      text: "Balance THREE forces: the DEFICIT (money), PUBLIC HAPPINESS (votes), and MARKET TRUST (investors). Let any one collapse and you're finished.",
      icon: <Target size={48} className="text-white" />,
      bgClass: "from-orange-600 to-orange-900"
    },
    {
      title: "YOUR WEAPONS",
      text: "Drag the sliders to CUT spending or RAISE taxes. But beware: every decision has consequences. Cuts cause strikes. Tax hikes tank the economy.",
      icon: <Sliders size={48} className="text-white" />,
      bgClass: "from-blue-600 to-blue-900"
    },
    {
      title: "THE CLOCK IS TICKING",
      text: "Can you survive where others failed? The markets are watching. The tabloids are circling. Britain awaits your first move.",
      icon: <Flag size={48} className="text-white" />,
      bgClass: "from-chancellor-gold to-yellow-700"
    }
  ];

  const currentSlide = slides[step];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-chancellor-gold/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
              opacity: 0
            }}
            animate={{
              y: -10,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -20 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 0 100px rgba(212, 175, 55, 0.2)'
        }}
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-br ${currentSlide.bgClass} p-10 text-white text-center relative overflow-hidden`}>
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="mb-6 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm"
          >
            {currentSlide.icon}
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-display tracking-wider"
          >
            {currentSlide.title}
          </motion.h2>
        </div>

        {/* Body */}
        <div className="bg-bg-main p-8 lg:p-10">
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg lg:text-xl leading-relaxed text-text-main mb-10"
          >
            {currentSlide.text}
          </motion.p>

          <div className="flex justify-between items-center">
            {/* Progress dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${i === step
                      ? 'w-8 bg-gradient-to-r from-chancellor-gold to-yellow-500'
                      : i < step
                        ? 'w-2 bg-chancellor-gold'
                        : 'w-2 bg-gray-700'
                    }`}
                  animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              ))}
            </div>

            {/* Next/Finish Button */}
            <motion.button
              onClick={() => {
                if (step < slides.length - 1) setStep(step + 1);
                else onComplete();
              }}
              className="btn-primary flex items-center gap-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {step === slides.length - 1 ? (
                <>
                  OPEN THE RED BOX
                  <Check size={20} />
                </>
              ) : (
                <>
                  CONTINUE
                  <ChevronRight size={20} />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Onboarding;

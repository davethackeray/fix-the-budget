import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, RotateCcw, Sun, Moon, Zap, Shield, TrendingUp } from 'lucide-react';
import TickerTape from './TickerTape';
import KpiCards from './KpiCards';
import BudgetSankey from './BudgetSankey';
import ControlPanel from './ControlPanel';
import Onboarding from './Onboarding';

const CinematicDashboard = ({
    state,
    initialState,
    headlines,
    crisisActive,
    achievementToast,
    showOnboarding,
    setShowOnboarding,
    connectionStatus,
    theme,
    toggleTheme,
    handleReset,
    handleUpdate,
    toggleViewMode
}) => {
    const getFiscalSummary = () => {
        if (!state) return { text: "", severity: "neutral" };
        const totalExp = state.expenditure.reduce((sum, e) => sum + e.value, 0);
        const totalRev = state.revenue.reduce((sum, r) => sum + r.value, 0);
        const deficit = totalExp - totalRev;

        if (deficit > 80) return { text: `EMERGENCY: £${deficit.toFixed(0)}bn deficit. Markets in panic.`, severity: "critical" };
        if (deficit > 50) return { text: `CRITICAL: £${deficit.toFixed(0)}bn overspend. Unsustainable.`, severity: "critical" };
        if (deficit > 0) return { text: `WARNING: £${deficit.toFixed(0)}bn deficit. Borrowing to fund services.`, severity: "warning" };
        if (deficit < 0) return { text: `SURPLUS: £${Math.abs(deficit).toFixed(0)}bn profit. Paying down debt.`, severity: "success" };
        return { text: "BALANCED: Spending matches income perfectly.", severity: "success" };
    };

    const fiscalStatus = getFiscalSummary();

    return (
        <div className={`min-h-screen bg-bg-main text-text-main selection:bg-chancellor-gold selection:text-black ${crisisActive ? 'crisis-active' : ''}`}>
            {/* Animated Background */}
            <div className="bg-grid" />

            {/* Onboarding Modal */}
            <AnimatePresence>
                {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}
            </AnimatePresence>

            {/* Achievement Toast */}
            <AnimatePresence>
                {achievementToast && (
                    <motion.div
                        initial={{ y: 100, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -50, opacity: 0, scale: 0.9 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] glass-panel rounded-2xl px-8 py-4 flex items-center gap-4 border-2 border-chancellor-gold"
                    >
                        <span className="text-5xl">{achievementToast.icon}</span>
                        <div>
                            <div className="font-display text-2xl text-gradient-gold">{achievementToast.title}</div>
                            <div className="text-text-muted text-sm">{achievementToast.desc}</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-panel-border bg-bg-main/90 backdrop-blur-xl">
                <div className="flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-chancellor-red to-red-900 p-3 rounded-xl shadow-lg">
                                <Wallet size={28} className="text-white" />
                            </div>
                            <div className="absolute -inset-1 bg-chancellor-red/30 blur-xl rounded-xl -z-10" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-display tracking-wider text-gradient-gold">THE SOVEREIGN INTERFACE</h1>
                            <p className="text-[11px] text-text-muted tracking-[0.2em] uppercase">UK Budget Simulator • HM Treasury</p>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center gap-4">
                        {/* Political Capital Meter */}
                        {state.politicalCapital !== undefined && (
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 glass-panel rounded-xl">
                                <Shield size={16} className={state.politicalCapital > 50 ? 'text-accent-green' : 'text-chancellor-red'} />
                                <span className="text-xs uppercase tracking-wider text-text-muted">Political Capital</span>
                                <span className={`font-bold font-mono ${state.politicalCapital > 50 ? 'text-accent-green' : 'text-chancellor-red'}`}>
                                    {state.politicalCapital.toFixed(0)}%
                                </span>
                            </div>
                        )}

                        {/* Inflation */}
                        {state.inflation !== undefined && (
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 glass-panel rounded-xl">
                                <Zap size={16} className={state.inflation > 4 ? 'text-crisis-orange' : 'text-accent-blue'} />
                                <span className="text-xs uppercase tracking-wider text-text-muted">Inflation</span>
                                <span className={`font-bold font-mono ${state.inflation > 4 ? 'text-crisis-orange' : 'text-accent-blue'}`}>
                                    {state.inflation.toFixed(1)}%
                                </span>
                            </div>
                        )}

                        <button
                            onClick={toggleViewMode}
                            className="px-4 py-2 glass-panel rounded-xl text-sm font-bold text-chancellor-gold hover:bg-chancellor-gold/10 transition-all border border-chancellor-gold/30"
                        >
                            SWITCH TO GOV.UK
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-xl glass-panel hover:border-chancellor-gold transition-all"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-600" />}
                        </button>

                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2 glass-panel rounded-xl text-sm hover:border-chancellor-gold transition-all"
                        >
                            <RotateCcw size={16} /> Reset Budget
                        </button>

                        <div className="px-4 py-2 glass-panel rounded-xl flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-accent-green animate-pulse' : 'bg-chancellor-red'}`} />
                            <span className="text-xs font-mono uppercase tracking-wider">LIVE</span>
                        </div>
                    </div>
                </div>

                {/* News Ticker */}
                <TickerTape headlines={headlines} />
            </header>

            {/* MAIN CONTENT */}
            <main className="relative z-10 p-6 lg:p-8 max-w-[1800px] mx-auto">
                {/* KPI Strip */}
                <section className="mb-8">
                    <KpiCards state={state} initialState={initialState} />
                </section>

                {/* Fiscal Status Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-8 p-4 rounded-xl border-2 flex items-center justify-between ${fiscalStatus.severity === 'critical' ? 'bg-red-900/20 border-chancellor-red crisis-pulse' :
                        fiscalStatus.severity === 'warning' ? 'bg-orange-900/20 border-crisis-orange' :
                            'bg-green-900/20 border-accent-green'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <TrendingUp size={24} className={
                            fiscalStatus.severity === 'critical' ? 'text-chancellor-red' :
                                fiscalStatus.severity === 'warning' ? 'text-crisis-orange' :
                                    'text-accent-green'
                        } />
                        <span className="font-display text-xl tracking-wider">{fiscalStatus.text}</span>
                    </div>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sankey Visualization */}
                    <div className="lg:col-span-7 glass-panel rounded-2xl p-6 min-h-[600px]">
                        <h2 className="font-display text-2xl text-gradient-gold mb-4 flex items-center gap-3">
                            <span className="bg-chancellor-gold/20 p-2 rounded-lg"><TrendingUp size={20} className="text-chancellor-gold" /></span>
                            WHERE THE MONEY FLOWS
                        </h2>
                        <p className="text-text-muted text-sm mb-6">
                            Taxpayer money (left) flows through the Treasury into public services (right). The wider the band, the more money.
                        </p>
                        <div className="h-[500px]">
                            <BudgetSankey state={state} />
                        </div>
                        <div className="mt-4 flex gap-6 text-xs uppercase tracking-widest text-text-muted border-t border-panel-border pt-4">
                            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-accent-green rounded-sm" /> Money In (Taxes)</div>
                            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-chancellor-red rounded-sm" /> Money Out (Spending)</div>
                            <div className="flex items-center gap-2"><span className="w-4 h-4 bg-accent-blue rounded-sm" /> Borrowing (Debt)</div>
                        </div>
                    </div>

                    {/* Control Panel */}
                    <div className="lg:col-span-5 space-y-6">
                        <ControlPanel state={state} initialState={initialState} onUpdate={handleUpdate} />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 mt-12 border-t border-panel-border py-6 text-center text-text-muted text-xs">
                <p>THE SOVEREIGN INTERFACE • A Civic Education Simulator • Data: OBR, ONS, HM Treasury</p>
                <p className="mt-1 opacity-50">Can you do better than the Chancellor? Prove it.</p>
            </footer>
        </div>
    );
};

export default CinematicDashboard;

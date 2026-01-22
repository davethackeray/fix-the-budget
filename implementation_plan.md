# Implementation Plan: The Sovereign Interface

## Phase 1: Project Scaffolding
- [ ] Initialize a monorepo structure (or unified structure) for Frontend (Client) and Backend (Server).
- [ ] **Client:** React (Vite) + Tailwind CSS + Framer Motion + Nivo (Charts).
- [ ] **Server:** Node.js + Express + Socket.io.
- [ ] Configuration: Set up `concurrently` to run both dev servers.

## Phase 2: The Simulation Engine (Backend)
- [ ] **Data Model:** Define the `BudgetState` (Revenue, Expenditure, Deficit, Debt).
- [ ] **Baseline Data:** Mock the "Inherited Landscape" (OBR/PESA figures) as the starting state.
- [ ] **Logic Core:** Implement `calculateDelta(changes)`:
    -   Apply Fiscal Multipliers (e.g., cutting spending reduces GDP).
    -   Apply Tax Elasticity (Laffer curve logic).
- [ ] **News/Empathy Engine:**
    -   Create a "Headline Generator" based on triggers (e.g., "NHS cut > 5%" -> "Crisis News").
    -   Simulate "Market Volatility" (Gilt Yields) as a background heartbeat.

## Phase 3: The Sovereign Interface (Frontend)
- [ ] **Visual Design:** "Dark Mode" aesthetic with Gold/Red accents (Chancellor/Gov style).
- [ ] **Components:**
    -   `NewsTicker`: Scrolling top bar for feedback.
    -   `RedBoxOnboarding`: Gamified entry screen.
    -   `BudgetSankey`: Main visualization of money flow.
    -   `ControlPanel`: Sliders for Departments (Health, Education) and Taxes.
    -   `KPIMeters`: Public Mood, Gilt Yield, Deficit.

## Phase 4: Integration & Polish
- [ ] Connect Client sliders to Server simulation via Socket.io (or REST for simplicity if state is simple).
- [ ] Implement the "Feedback Loop":
    -   User moves slider -> Server calcs impact -> Server pushes new "News" + "KPIs".
- [ ] Add "Advisor" toasts/popups.
- [ ] Final styling and build verification.

## Phase 5: "Launch"
- [ ] Ensure `npm start` launches the full experience.

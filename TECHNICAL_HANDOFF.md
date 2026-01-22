# Technical Handoff: The Sovereign Interface

## 1. System Metadata
- **Project Name:** The Sovereign Interface (UK Budget Simulator)
- **Version:** 0.1.0 (Alpha/Prototype)
- **Date:** 2026-01-22
- **Stack Type:** Monorepo (Node.js Backend + React Frontend)
- **Primary Goal:** Interactive, accessible gamification of UK fiscal policy with real-time feedback loops.

## 2. Architecture Overview

### 2.1 Tech Stack
| Layer | Technology | Version / Note |
|:---|:---|:---|
| **Runtime** | Node.js | v20+ recommended |
| **Server** | Express.js | Lightweight HTTP server |
| **Real-time** | Socket.io | Bidirectional state sync |
| **News Feed** | rss-parser | Live RSS ingestion (BBC/Guardian) |
| **Client** | React | Vite-powered SPA |
| **Styling** | Tailwind CSS | v4.0 (using `@theme` directives) |
| **Animation** | Framer Motion | Smooth transitions |
| **Charts** | Nivo | Responsive Sankey diagrams |

### 2.2 Data Flow
```mermaid
graph TD
    User[User Action (Slider)] -->|Socket: update-budget| Server
    Server -->|Logic: calculateImpact()| NewState[New Budget State]
    Server -->|News: RSS Fetch| LiveNews[Live Headlines]
    
    subgraph Simulation Engine
        NewState -->|Check| FiscalMultipliers[Apply GDP Multipliers]
        NewState -->|Check| LafferCurve[Apply Tax Elasticity]
        NewState -->|Check| BondVigilantes[Calc Gilt Yields]
    end
    
    Simulation Engine -->|Socket: state-update| ClientUI
    Simulation Engine -->|Socket: news-flash| ClientTicker
```

## 3. Data Schemas

### 3.1 Budget State Object (`BudgetState`)
The central source of truth passed via Socket.io.
```json
{
  "expenditure": [
    { "id": "Health", "value": 180.0 },
    { "id": "Social Protection", "value": 310.0 },
    { "id": "Debt Interest", "value": 105.0, "locked": true } 
    // ...other departments
  ],
  "revenue": [
    { "id": "Income Tax", "value": 280.0 },
    { "id": "VAT", "value": 180.0 }
    // ...other taxes
  ],
  "gdp": 2800.0,
  "inflation": 2.5,
  "giltYield": 4.2,
  "publicMood": 50.0,
  "marketConfidence": 80.0
}
```

### 3.2 Logic Constants
Located in `server/index.js`.
- **Fiscal Multipliers:** Determines impact of spending on GDP.
    - `Infrastructure`: 1.0 (High ROI)
    - `Health`: 0.45
    - `Defense`: 0.3
- **Thresholds:**
    - `Deficit > 5% GDP`: Triggers Gilt Yield spike (+0.05% tick).
    - `Tax Hike > £10bn`: Triggers Capital Flight (GDP -33% of delta).

## 4. Component Hierarchy (Client)

- **`App.jsx`**: Main Controller. Handles Socket connection, Theme state, Onboarding state.
- **`components/`**:
    - **`BudgetSankey.jsx`**: Nivo Sankey wrapper. Includes accessibility logic (High Contrast colors) and plain-English tooltips.
    - **`ControlPanel.jsx`**: Input mechanism. Features "center-line" visualizers for initial state comparison and "Info" toggle for definitions.
    - **`KpiCards.jsx`**: Top-level metrics (Deficit, Debt Cost, Mood).
    - **`TickerTape.jsx`**: Infinite scrolling news bar. Mixes simulated and live RSS feeds.
    - **`Onboarding.jsx`**: Modal tutorial sequence.

## 5. Accessibility & UX Standards
- **WCAG Compliance:** 
    - Text contrast ratios maximized (Black/White).
    - No reliance on color alone (Borders/Tooltips used).
- **Theme Engine:** CSS Variables in `index.css` handle `light` vs `dark` mode switching.
- **Language:** All economic terms are mapped to "Man on the street" equivalents (e.g., *Public Sector Net Borrowing* -> *Yearly Deficit*).

## 6. Development Agents: Improvement Proposals

### 6.1 Refactoring (Code Quality)
- **Current State:** Simulation logic resides entirely in `server/index.js`.
- **Proposal:** Extract `calculateImpact` and `fetchLiveNews` into dedicated service modules (`services/economy.js`, `services/news.js`).
- **Proposal:** TypeScript migration for shared types (`BudgetState`) between client/server.

### 6.2 Simulation Depth (Physics Engine)
- **Current State:** Linear multipliers and simple thresholds.
- **Proposal:** Implement a **System Dynamics Model**:
    - Add *Time lag* (Spending cuts today shouldn't impact GDP instantly).
    - Add *Inflation* linkage (High spending -> Higher Inflation -> Higher Rates).
    - Add *Political Capital* as a resource (Spending it on unpopular decisions makes future changes harder).

### 6.3 Data & Persistence
- **Current State:** In-memory variable `currentState`. Resets on server restart.
- **Proposal:** 
    - Integrate **Redis** for session persistence per socket ID.
    - Use **PostgreSQL** to store high-score runs or historical budget comparison data.

### 6.4 AI Integration (GenAI)
- **Current State:** Template-based simulated headlines (`CRISIS: ${dept} cut by...`).
- **Proposal:** Replace templates with a lightweight LLM (e.g., Gemini Nano or external API) to generate context-aware, witty, or terrifying news headlines based on specific combinations of user actions.

## 7. How to Resume Development
1. **Start Dev Server:** `npm run dev` (Runs concurrently).
2. **Backend Entry:** `server/index.js`
3. **Frontend Entry:** `client/src/App.jsx`
4. **Style Entry:** `client/src/index.css` (Tailwind Theme Config).

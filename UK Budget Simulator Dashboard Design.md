# **The Sovereign Interface: A Comprehensive Architectural Blueprint for a Dynamic, Empathic Civic Budget Simulator**

## **Executive Summary: Redefining Civic Engagement Through Digital Simulation**

The prevailing public sentiment regarding the United Kingdom’s fiscal management is characterized by a dissonance between abstract macroeconomic aggregates and the tangible, lived experience of public services. This phenomenon, often described colloquially as "whinging," stems not merely from a lack of data but from a lack of *contextual agency*. Citizens are bombarded with large integers—billions of pounds in deficits or surpluses—without a mechanism to visualize the structural rigidities, trade-offs, and human consequences inherent in sovereign financial management. The request to create a "dynamic and empathetic interactive dashboard" represents a paradigm shift from static transparency to active simulation.  
This report outlines the comprehensive architectural, economic, and user experience specifications for "The Sovereign Interface"—a proposed high-fidelity civic simulation platform. Unlike traditional budget calculators that function as static spreadsheets, this platform is designed as a living engine. It integrates real-time data streams from the Office for National Statistics (ONS), HM Treasury, and the Bank of England to provide a "current state" baseline, while employing a sophisticated "News Ticker" narrative engine powered by live media APIs to provide visceral, immediate feedback on the social and political costs of fiscal decisions.  
The core philosophy of this system is "Empathy-First Economics." By simulating the "Red Box" experience of the Chancellor of the Exchequer, the dashboard gamifies the tension between fiscal prudence (balancing the books) and social equity (maintaining services). It operationalizes the concept that government spending is not simply a matter of accounting efficiency but a complex negotiation of values. Through the use of live Gilt market data, users will learn that the "national credit card" analogy is flawed; sovereign debt is governed by bond market confidence, yield curves, and inflationary pressures, all of which will be modeled in real-time.  
This document serves as a master plan for developers, economists, and designers. It covers the simulation’s mathematical core, the hybrid data architecture required to blend annual statistics with second-by-second market data, the narrative design of the "TV News" interface, and the accessibility standards required to ensure the platform is usable by all UK citizens.

## **1\. The Theoretical Framework: Bridging the Empathy Gap**

### **1.1 The Micro-Macro Fallacy and Civic Frustration**

The frustration expressed by the public regarding government accounts often arises from the "micro-macro fallacy"—the erroneous application of individual household budgetary logic to a sovereign currency issuer. In a household, expenditure must not exceed income indefinitely; solvency is a binary state. For a state like the UK, solvency is a function of GDP growth, inflation, tax capacity, and credibility in the bond markets. When a citizen sees "£50 billion deficit," they perceive failure. They do not see the counter-cyclical investment, the stabilization mechanisms, or the long-term ROI of that borrowing.  
To move the user from a state of frustration to a state of understanding, the dashboard must not just display the numbers; it must *simulate the pressure* under which these numbers are managed. The "whinging" mentioned in the project brief is a symptom of powerlessness. By giving the user the levers of power—taxation, spending, borrowing—and forcing them to face the consequences (strikes, market crashes, poverty increases), the dashboard transforms the user from a passive critic into an active participant.

### **1.2 The Evolution of Budget Simulators**

Existing tools, such as the Institute for Fiscal Studies (IFS) "Be the Chancellor" or the Liverpool City Council budget simulator, have paved the way but often suffer from "spreadsheet fatigue". They are excellent for policy wonks but lack the "fun" and "dynamic" elements requested. They often present trade-offs as linear mathematical equations (e.g., Cut £1bn \= Save £1bn). They fail to capture the *non-linear* and *emotional* aspects of governance.  
The "Sovereign Interface" differentiates itself by introducing **narrative volatility**. In the real world, a budget is not just a spreadsheet; it is a political event. A tax rise might balance the books mathematically but trigger a leadership challenge or a market sell-off. This project will integrate live news feeds and sentiment analysis to simulate this "noise," creating a dashboard that feels less like an accountant's office and more like a 24-hour newsroom.

### **1.3 Gamification and the "Red Box" Mechanic**

To satisfy the requirement for the dashboard to be "fun," we must adopt principles from game design, specifically the genre of government simulation games (e.g., *Democracy 4*). The "Red Box"—the iconic briefcase used by the Chancellor—serves as the central UI metaphor.

* **The Hook**: The onboarding begins with the user virtually "unlocking" the Red Box. Inside, they find the "Inherited Landscape"—the current deficit, debt, and inflation figures sourced live from the OBR and ONS APIs.  
* **The Challenge**: The user is given a mission profile (e.g., "The Stabilizer," "The Reformer," or "The Austerity Hawk"). This frames the "balancing of the books" not as a math problem, but as a strategic campaign.  
* **The Feedback Loop**: Success is not just a green number at the bottom of the screen. It is measured in "Political Capital," "Social Wellbeing," and "Market Confidence." If the user balances the books but destroys the NHS, the "Social Wellbeing" meter crashes, and the game warns of social unrest. This fulfills the "empathetic" requirement by quantifying human suffering alongside financial saving.

## **2\. The Economic Simulation Engine: Modeling Reality**

The engine of the dashboard must be rigorous. If the underlying math is flawed, the educational value is null. The simulation will be built on a "Delta Model," where the user applies changes to a baseline forecast provided by the Office for Budget Responsibility (OBR).

### **2.1 The Baseline: OBR and IFS Integration**

The starting point for any budget is the "do nothing" scenario. The dashboard must ingest the most recent *Economic and Fiscal Outlook* (EFO) from the OBR to set the initial variables for the next 5 fiscal years.

* **Variable Initialization**: The system initializes with the OBR’s forecasts for Real GDP Growth, CPI Inflation, Public Sector Net Borrowing (PSNB), and Public Sector Net Debt (PSND).  
* **The Inertia of State**: Users often overestimate discretionary power. The model must visually distinguish between **Annually Managed Expenditure (AME)** (pensions, debt interest, welfare—which are demand-led and hard to cut) and **Departmental Expenditure Limits (DEL)** (spending on schools, hospitals, armies—which are capped).  
  * *Simulation Logic*: Initially, AME levers should be locked or "resistant" to change, forcing the user to realize that nearly 50% of the budget is effectively pre-spent on debt and entitlements. This friction is a key educational moment.

### **2.2 Fiscal Multipliers: The Feedback Loop of Austerity**

The dashboard must implement **Fiscal Multipliers** to demonstrate that "cutting spending" can sometimes increase the debt-to-GDP ratio if it suppresses growth too severely. This counters the simplistic "household budget" narrative. Based on IMF and OBR methodologies, we will assign multiplier coefficients to different categories of fiscal consolidation.

| Fiscal Lever Category | Multiplier (Year 1\) | Multiplier (Year 2\) | Economic Logic |
| :---- | :---- | :---- | :---- |
| **Capital Investment (Infrastructure)** | 1.00 | 0.83 | High Impact. Cutting HS2 or hospital building reduces immediate construction activity and long-term productivity. |
| **Departmental Spending (Public Services)** | 0.45 | 0.42 | Moderate Impact. Cutting nurses' pay reduces their consumption in the wider economy. |
| **Welfare Transfers (Benefits)** | 0.60 | 0.57 | High Impact. Low-income households have a high "Marginal Propensity to Consume" (MPC). Every £1 cut from benefits removes \~£0.60 of demand from local high streets. |
| **Tax Cuts (Income/Corporation)** | 0.33 | 0.30 | Low Short-term Impact. Wealthier entities often save rather than spend tax cuts, leading to lower immediate stimulus. |

**The Interactive Mechanic:** When a user cuts £10 billion from "Transport Capital," the "Deficit" bar decreases by £10bn, *but* the "GDP Forecast" ticker simultaneously drops by £10bn (Multiplier 1.0), and the "Future Tax Revenue" projection recalibrates downwards. This visualizes the self-defeating nature of poorly targeted austerity.

### **2.3 Tax Elasticity and The Laffer Curve**

To address the "tax the rich" argument, the model must incorporate **Taxable Income Elasticity (TIE)**. Research from HMRC and the IFS suggests that high earners behave dynamically; if taxes rise too high, they may work less, divert income to capital, or leave the jurisdiction.

* **Elasticity Coefficient**: The engine will utilize a TIE of approximately 0.31 to 0.48 for Additional Rate taxpayers.  
* **Behavioral Dampening**: If the user raises the top rate of Income Tax from 45% to 60%, the revenue meter will not rise linearly. It will curve and eventually flatten (the Laffer Curve effect). A warning notification will appear: *"High behavioral response detected: Revenue forecast reduced by £4bn due to anticipated forestalling and avoidance."*  
* **Corporate Dynamics**: Similarly, changes to Corporation Tax will interact with a "Business Investment" variable. A sharp rise triggers a "Capital Flight" probability function, potentially reducing long-term GDP growth.

### **2.4 The Bond Market Vigilantes (Gilt Yield Sensitivity)**

To fulfill the requirement for "realism," the simulator must model the cost of borrowing. The 2022 "Mini-Budget" crisis proved that the bond market is the ultimate arbiter of UK fiscal policy.

* **The Gilt Trigger**: The dashboard tracks a "Fiscal Credibility Score." If the user enacts unfunded tax cuts exceeding a certain % of GDP (e.g., \>2%), or if the structural deficit widens beyond 5%, the model triggers a "Market Panic" event.  
* **Real-Time API Connection**: The simulation pulls the *current* 10-year Gilt yield from the Bank of England API. If the "Panic" event triggers, a multiplier (e.g., \+150 basis points) is applied to this live rate.  
* **Consequence**: The "Debt Interest" line item in the budget immediately expands, eating into the funds available for Schools and Hospitals. This serves as a brutal lesson in the power of the "Bond Vigilantes".

## **3\. Data Architecture: The Hybrid Real-Time Stack**

To deliver the "live news ticker" and "real-time data" requested, the application cannot be a static site. It requires a **Hybrid Architecture** that combines the stability of annual budget data with the volatility of live market and news feeds.

### **3.1 The Foundation Layer: Static Budget Data**

Government spending data is retrospective and structurally complex. We will use the **HM Treasury PESA (Public Expenditure Statistical Analyses)** dataset as the foundation.

* **Source**: PESA Chapter 5 (Public Sector Expenditure on Services by Function).  
* **Data Ingestion**: An ETL (Extract, Transform, Load) pipeline will ingest the annual PESA Excel tables and normalize them into a hierarchical JSON structure.  
  * *Structure*: Level 1: Health \-\> Level 2: Medical Services \-\> Level 3: Hospitals.  
  * *Granularity*: This allows the user to drill down. They can simply "Cut Health," or they can specifically "Cut Pharmaceutical Procurement."  
* **ONS Public Sector Finances**: Monthly bulletins from the ONS provide the headline "Net Borrowing" figures. The system will poll the ONS API monthly to update the "Starting Deficit" figure, ensuring the game always starts with the *actual* current financial situation of the UK.

### **3.2 The Real-Time Context Layer (APIs)**

This layer provides the "Dynamic" and "Realistic" elements. It does not change the budget numbers directly (which are annual) but changes the *context* and *cost* of those numbers.

#### **3.2.1 Financial Market APIs**

* **Bank of England (BoE) IADB**: The Interactive Statistical Database provides the official Yield Curves and Exchange Rates.  
  * *Endpoint*: https://www.bankofengland.co.uk/boeapps/iadb/.  
  * *Usage*: Fetch the daily 10-year spot yield. Display this prominently as the "Cost of Borrowing."  
* **Trading Economics / Financial Modeling Prep**: For higher frequency (intra-day) updates or specific commodity prices (e.g., Brent Crude, which affects Fuel Duty receipts).  
  * *Usage*: Live ticker of "UK 10Y Gilt Yield" and "GBP/USD".

#### **3.2.2 The News Ticker APIs**

The "TV News Style Ticker" requires a robust aggregation engine.

* **The Guardian Open Platform**: This is the premier source for UK-centric political news with a robust tagging system.  
  * *Query Logic*: Use tags like politics/economy, society/nhs, uk/defense.  
  * *Endpoint*: https://content.guardianapis.com/search?tag=politics/economy.  
* **UK Parliament RSS Feeds**: To add legislative weight, the dashboard will ingest RSS feeds for "Public Bills" and "Commons Library Research Briefings."  
  * *Usage*: If the user is looking at the "Welfare" tab, the ticker can display: *"Parliament Live: Second Reading of the Social Security (Additional Payments) Bill"*.  
* **Google News (via SerpApi)**: Allows for broader sourcing (BBC, Sky, FT) using topic tokens.

### **3.3 The Architecture Diagram**

The system relies on a **Node.js** backend acting as a "BFF" (Backend for Frontend) to aggregate these disparate sources and serve them to a **React** frontend via **WebSockets**.  
`graph TD`  
    `User[Citizen User] -->|Interacts| UI`  
    `UI -->|Socket Connection| BFF`  
      
    `subgraph "Data Ingestion (ETL)"`  
        `PESA -->|Annual CSV| DB`  
        `ONS -->|Monthly Update| DB`  
    `end`  
      
    `subgraph "Real-Time Services"`  
        `Guardian[Guardian API] -->|Poll 15m| NewsEngine[News Aggregator]`  
        `BoE -->|Daily Yields| MarketEngine`  
        `RSS -->|Poll 15m| NewsEngine`  
    `end`  
      
    `NewsEngine -->|Push Headlines| BFF`  
    `MarketEngine -->|Push Yields| BFF`  
    `DB -->|Serve Baseline| BFF`  
      
    `BFF -->|Stream Ticker| UI`  
    `BFF -->|Calc Impact| UI`

## **4\. The Narrative Engine: Designing the "TV News" Ticker**

The user explicitly requested a "TV news show style ticker tape." This is not just a UI decoration; it is the primary feedback mechanism for "Empathy." It translates the user's cold, calculated decisions into hot, emotional headlines.

### **4.1 The "Newsroom" Logic**

The Ticker will operate in two modes: **Live Mode** and **Simulation Mode**.

* **Live Mode (Passive)**: When the user is observing the dashboard, the ticker streams *actual* real-time headlines from the Guardian and Parliament APIs. This grounds the experience in the *now*.  
  * *Example*: "LIVE: Inflation holds steady at 3.2% \- ONS."  
* **Simulation Mode (Active)**: When the user makes a change (e.g., cuts NHS budget by £5bn), the "Live" feed is interrupted by "Simulated Breaking News."  
  * *Mechanism*: The backend selects a pre-written headline template based on the department and the direction of change, injected with the specific values.  
  * *Example*: "BREAKING: Doctors' Union announces 48-hour strike following £5bn funding cut."  
  * *Source Matching*: The system can also query the Guardian API for *historical* headlines that match the user's simulation. If the user raises Fuel Duty, the system searches for past headlines about "Fuel Protests" to show what happened last time this policy was tried.

### **4.2 Sentiment Analysis and "Empathy Scoring"**

To ensure the dashboard is "empathetic," we must measure the *human* sentiment of the budget.

* **Sentiment Engine**: Headlines (real and simulated) are passed through a lightweight Sentiment Analysis tool (e.g., VADER or a fine-tuned BERT model).  
* **The "Public Mood" Meter**: A visual gauge on the dashboard aggregates this sentiment.  
  * *Mechanism*: Heavy cuts to "Social Protection" produce negative sentiment headlines (e.g., "Poverty rises"). This pushes the "Public Mood" meter into the red.  
  * *Win Condition*: The user cannot "win" simply by balancing the books if the "Public Mood" meter is at zero. They must balance the budget *while keeping the country governable*.

## **5\. User Experience (UX): Gamification and Accessibility**

The request demands the dashboard be "fun," "highly easy to understand," and have "super accessible onboarding." This requires moving away from the aesthetic of government forms (GDS style) toward the aesthetic of **Information Visualization** and **Strategy Games**.

### **5.1 The "Don't Make Me Think" Onboarding**

Government finance is intimidating. The onboarding must be frictionless and narrative-driven.

* **The "Crisis" Intro**: Do not start with a chart. Start with a "Breaking News" video montage (simulated). "The Pound is falling. The Deficit is rising. The Prime Minister needs a plan." This creates immediate urgency and a "Call to Adventure".  
* **Progressive Disclosure**:  
  * *Level 1 (The Macro View)*: The user sees only three levers: "Total Tax," "Total Spend," "Total Borrowing." They play with these to understand the coarse relationships.  
  * *Level 2 (The Departmental View)*: The user unlocks the specific departments (Health, Defense, Education).  
  * *Level 3 (The Policy View)*: The user can toggle specific policies (e.g., "Winter Fuel Payment," "Triple Lock Pension").  
  * *Why*: This prevents cognitive overload. The user builds a mental model of the system before confronting the complexity.

### **5.2 The Visual Core: The Interactive Sankey Diagram**

The **Sankey Diagram** is the single most effective way to visualize the flow of money. It shows inputs (Tax, Borrowing) on the left flowing into outputs (Services, Debt Interest) on the right.

* **Tactile Interaction**: The user should be able to *touch* the flows.  
  * *Action*: Click and drag the "Income Tax" band to make it wider.  
  * *Reaction*: The band expands, and the "Deficit" gap narrows visually. This makes the math physical and intuitive.  
* **Accessibility (WCAG 2.2)**: Sankey diagrams are notoriously difficult for screen readers.  
  * *Solution*: We must provide a "Table View" toggle that instantly converts the visual flow into a structured, accessible HTML table.  
  * *ARIA Labels*: Each node in the Sankey (e.g., "Health Node") must have a dynamic ARIA label: "Health Spending, currently £180 billion, 10% of total budget.".

### **5.3 Gamification Elements: Fun with Fiscal Policy**

To make it "fun," we introduce game mechanics that reward exploration and strategic thinking.

* **Advisors (Personas)**: A "Virtual Permanent Secretary" (a chat avatar) pops up to offer advice.  
  * *Advisor*: "Minister, that tax cut looks popular, but the Bond Vigilantes are nervous. Yields are creeping up."  
* **Achievements**:  
  * *The Keynesian*: Achieve 3% growth through investment.  
  * *The Iron Chancellor*: Eliminate the deficit in 2 years.  
  * *The Beverly Option*: Fully fund the NHS and Social Care (regardless of cost).  
* **The "Approval Ratings" Mechanic**: A dynamic bar chart that tracks "Voter Intention." It updates in real-time based on the user's choices. Cuts to the NHS drop the rating; tax cuts raise it (for some demographics).

## **6\. The Empathy Algorithms: Calculating Human Impact**

This is the most critical requirement: resolving the user's frustration by showing *why* efficiency is hard. We must translate financial figures into human stories using **Empathy Algorithms**.

### **6.1 The Translation Matrix**

Every fiscal variable must have a corresponding "Real World Equivalent" metric.

| Department | Fiscal Change | Empathy Metric (Algorithmic Output) | Research Basis |
| :---- | :---- | :---- | :---- |
| **NHS (Health)** | \-£1 billion | \+45,000 increase in Waiting List | Correlation between funding & performance. |
| **Education** | \+£1,000 per pupil | \+3% improvement in GCSE attainment | IFS/DfE studies on per-pupil funding impact. |
| **Policing** | \-10% Budget | \+3% rise in Property Crime | Research on police numbers vs. crime rates. |
| **Youth Services** | \-£1 billion | \+£4 billion Long-term Social Cost | ROI of youth work is approx £4 for every £1 spent. |
| **Transport** | \-£500 million | \+100,000 Potholes / Reduced Bus Service | DfT Benefit-Cost Ratios. |

### **6.2 Narrative Generation Logic**

The system uses these metrics to generate the "Ticker" headlines.

* *Logic*: If (NHS\_Budget \< Baseline) AND (Change\_Magnitude \> 5%) \-\> Trigger "Crisis" Event.  
* *Output*: The dashboard overlays a video of an ambulance queue (simulated or stock footage) with the headline: *"Human Cost: A\&E waits hit 12 hours as budget cuts bite."*  
* *Why*: This confronts the "whinger" with the reality: "Efficiency" often looks like a closed hospital ward to the person needing it.

## **7\. Technical Implementation Strategy**

### **7.1 Tech Stack**

* **Frontend**: **React.js**. Best for complex, interactive state management.  
  * *Libraries*: **Nivo** (for Sankey/Charts), **Framer Motion** (for smooth, high-quality animations), **Tailwind CSS** (for rapid styling).  
* **Backend**: **Node.js** with **Express**. Lightweight, handles high-concurrency WebSocket connections well.  
* **Database**: **PostgreSQL** (for storing the static PESA/ONS data) and **Redis** (for caching the live API responses to prevent rate-limiting).  
* **Real-Time**: **Socket.io**. Essential for the "Ticker Tape" and live Gilt yields.

### **7.2 Security and Privacy**

* **API Management**: All API keys (Guardian, ONS, etc.) must be stored in environment variables on the server side. The frontend should never make direct calls to third-party APIs to avoid exposing keys.  
* **GDPR**: If the dashboard allows users to "Share" their budgets, it must handle user data (IPs, saved states) in compliance with UK GDPR. No PII (Personally Identifiable Information) should be required to play.

### **7.3 Accessibility Strategy (Inclusive Design)**

* **Color Blindness**: The Sankey diagram must use patterns (textures) in addition to colors to distinguish flows.  
* **Keyboard Navigation**: The "slider" controls for taxation must be operable via Arrow Keys.  
* **Cognitive Accessibility**: Use "Plain English" tooltips for every technical term (e.g., hover over "GDP" to see " The total value of everything the UK produces").

## **8\. Conclusion: From Whinging to Wisdom**

The "Sovereign Interface" is designed to be a cure for the frustration described in the user's prompt. By lifting the veil on government finance and replacing static spreadsheets with a dynamic, empathetic simulation, we empower the citizen.  
They will learn that the "national credit card" is a myth; that debt is a tool, not a sin; and that every "efficiency saving" has a human face—a nurse, a teacher, a police officer. Through the integration of live APIs, the dashboard anchors this lesson in the reality of today's markets and today's news. The result is a tool that is not only "fun" to play but fundamental to creating a financially literate and empathetic electorate.  
This is not just a dashboard; it is a digital lesson in the complexity of compassion.

#### **Works cited**

1\. Be the Chancellor | Institute for Fiscal Studies, https://ifs.org.uk/be-chancellor 2\. \[Demo\] Liverpool's Budget Challenge \- Simulator, https://3.uk-sandbox.budgetsimulator.com/ 3\. Could you do better than Reeves as chancellor? Play our interactive budget game | Tax and spending | The Guardian, https://www.theguardian.com/politics/ng-interactive/2025/nov/20/you-be-the-chancellor-play-our-interactive-budget-game 4\. The Budget Game: Can you run the UK economy? \- Financial Times, https://ig.ft.com/chancellor-game/ 5\. The influence of waiting times and sociopolitical variables on public trust in healthcare: A cross-sectional study of the NHS in England \- PubMed Central, https://pmc.ncbi.nlm.nih.gov/articles/PMC10963311/ 6\. What's Going On With A\&E Waiting Times? \- The King's Fund, https://www.kingsfund.org.uk/insight-and-analysis/long-reads/whats-going-on-with-ae-waiting-times 7\. About Be the Chancellor | Institute for Fiscal Studies, https://ifs.org.uk/about-be-chancellor 8\. Economic and fiscal outlook – November 2025 \- Office for Budget Responsibility, https://obr.uk/efo/economic-and-fiscal-outlook-november-2025/ 9\. Fiscal multipliers: How does the OBR estimate the demand impact of government policies?, https://www.instituteforgovernment.org.uk/sites/default/files/2024-10/Fiscal-modifiers-obr-demand.pdf 10\. The OBR's fiscal powers need a rethink, https://new-economicsf.files.svdcdn.com/production/files/OBR-fiscal-multipliers\_NEF.pdf?dm=1729589769 11\. Fiscal multipliers \- Office for Budget Responsibility, https://obr.uk/box/fiscal-multipliers/ 12\. The elasticity of corporate taxable income: new evidence from UK tax records, https://oxfordtax.sbs.ox.ac.uk/the-elasticity-of-corporate-taxable-income-new-evidence-from-uk-tax-records 13\. The Elasticity of Corporate Taxable Income: New Evidence from UK Tax Records \- American Economic Association, https://pubs.aeaweb.org/doi/10.1257/pol.6.2.19 14\. Estimating the responsiveness of top incomes to tax: a summary of three new papers, https://ifs.org.uk/sites/default/files/output\_url\_files/BN214.pdf 15\. Bank of England Database, https://www.bankofengland.co.uk/boeapps/database/ 16\. UK 10 Year Bond Yield \- Quote \- Chart \- Historical Data \- News, https://tradingeconomics.com/united-kingdom/government-bond-yield 17\. Public Expenditure Statistical Analyses 2025 \- GOV.UK, https://www.gov.uk/government/statistics/public-expenditure-statistical-analyses-2025 18\. Public spending statistics: Guidance \- GOV.UK, https://www.gov.uk/government/statistics/public-spending-statistics-release-july-2025/public-spending-statistics-guidance 19\. Public sector finance \- Office for National Statistics, https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance 20\. Published data related to public sector finance \- Office for National Statistics, https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/datalist?filter=datasets 21\. About the Indicators API Documentation \- World Bank Data Help Desk, https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation 22\. Help | Bank of England | Database, https://www.bankofengland.co.uk/boeapps/database/help.asp 23\. Economics Data APIs | Indicators, Rates & Calendar... | FMP \- Financial Modeling Prep, https://site.financialmodelingprep.com/datasets/economics 24\. documentation / overview \- theguardian / open platform, https://open-platform.theguardian.com/documentation/ 25\. RSS feeds \- UK Parliament, https://www.parliament.uk/site-information/rss-feeds/ 26\. Google News API \- SerpApi, https://serpapi.com/google-news-api 27\. Civic Design Systems: Ultimate Guide to Smart UX | Maxiom Technology \- Medium, https://medium.com/@antoniochagoury/civic-design-systems-ultimate-guide-to-smart-ux-maxiom-technology-5d45c8cef646 28\. User onboarding: best practices and 20 good examples \- Justinmind, https://www.justinmind.com/ux-design/user-onboarding 29\. Narrative Design Tips I Wish I'd Known \- Game Developer, https://www.gamedeveloper.com/design/narrative-design-tips-i-wish-i-d-known 30\. How Game Design Principles Drive Player Engagement | CG Spectrum, https://www.cgspectrum.com/blog/game-design-principles-player-engagement 31\. React Sankey Chart | KendoReact UI Library \- Telerik.com, https://www.telerik.com/kendo-react-ui/sankey-chart 32\. React Sankey chart \- MUI X, https://mui.com/x/react-charts/sankey/ 33\. Bank of England \- Open Data \- PythonSherpa, https://www.pythonsherpa.com/static/files/html/Bank%20of%20England.html 34\. What exactly is "commercial" use of the API? \- Reddit, https://www.reddit.com/r/redditdev/comments/l9wxii/what\_exactly\_is\_commercial\_use\_of\_the\_api/
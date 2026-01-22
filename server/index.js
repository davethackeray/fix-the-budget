import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Parser from 'rss-parser';
import { generateHeadlines, generateContextualHeadline } from './services/headlines.js';

const app = express();
app.use(cors());

// Health check
app.get('/', (req, res) => res.send('Sovereign Interface Engine is Running'));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// --- RSS NEWS ENGINE ---
const parser = new Parser();
const NEWS_FEEDS = [
  'http://feeds.bbci.co.uk/news/politics/rss.xml',
  'http://feeds.bbci.co.uk/news/business/rss.xml',
  'https://www.theguardian.com/uk/money/rss',
  'https://www.theguardian.com/politics/rss'
];

const RELEVANT_KEYWORDS = [
  'economy', 'tax', 'budget', 'spending', 'chancellor', 'treasury',
  'inflation', 'bank of england', 'deficit', 'nhs', 'pension',
  'benefits', 'debt', 'gdp', 'recession', 'growth', 'starmer',
  'reeves', 'sunak', 'labour', 'tory', 'conservative', 'interest rates'
];

let liveHeadlines = [];

const fetchLiveNews = async () => {
  try {
    const allNews = [];
    for (const feed of NEWS_FEEDS) {
      try {
        const feedData = await parser.parseURL(feed);
        feedData.items.forEach(item => {
          // Check relevance
          const text = (item.title + ' ' + (item.contentSnippet || '')).toLowerCase();
          const isRelevant = RELEVANT_KEYWORDS.some(keyword => text.includes(keyword));

          if (isRelevant) {
            allNews.push({
              type: 'LIVE', // Tag as real world news
              text: `LIVE: ${item.title}`,
              timestamp: new Date(item.pubDate)
            });
          }
        });
      } catch (e) {
        console.error(`Error fetching feed ${feed}:`, e.message);
      }
    }

    // Sort by newest and take top 20
    liveHeadlines = allNews
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20);

    console.log(`Fetched ${liveHeadlines.length} relevant live news items.`);
    // Push update to clients
    io.emit('news-flash', liveHeadlines.slice(0, 5)); // Send top 5 immediately on update

  } catch (error) {
    console.error("Global news fetch error:", error);
  }
};

// Fetch news every 5 minutes
fetchLiveNews();
setInterval(fetchLiveNews, 5 * 60 * 1000);

// --- SIMULATION ENGINE ---

const INITIAL_STATE = {
  expenditure: [
    { id: 'Health', value: 180 },
    { id: 'Social Protection', value: 310 },
    { id: 'Education', value: 110 },
    { id: 'Defense', value: 55 },
    { id: 'Debt Interest', value: 105 },
    { id: 'Infrastructure', value: 60 },
    { id: 'Other Services', value: 380 },
  ],
  revenue: [
    { id: 'Income Tax', value: 280 },
    { id: 'VAT', value: 180 },
    { id: 'Corporation Tax', value: 95 },
    { id: 'NI', value: 185 },
    { id: 'Other Revenue', value: 360 },
  ],
  gdp: 2800,
  inflation: 2.5,
  giltYield: 4.2,
  publicMood: 50,
  marketConfidence: 80,
  // NEW: Political Capital
  politicalCapital: 100,
  // NEW: Delayed impact tracking
  pendingImpacts: [],
  // NEW: Tick counter for time-based effects
  tickCount: 0,
};

let currentState = JSON.parse(JSON.stringify(INITIAL_STATE));

const FISCAL_MULTIPLIERS = {
  'Infrastructure': 1.0,
  'Health': 0.45,
  'Education': 0.5,
  'Defence': 0.3,
  'Social Protection': 0.6,
  'Other Services': 0.4
};

// EMPATHY TRANSLATION MATRIX - converts £bn cuts into human impact
const EMPATHY_MATRIX = {
  'Health': {
    factor: 45000,
    unit: 'people on waiting lists',
    crisis_text: 'A&E waits hit record highs'
  },
  'Education': {
    factor: 1000,
    unit: 'teachers at risk',
    crisis_text: 'Schools warn of mass redundancies'
  },
  'Social Protection': {
    factor: 50000,
    unit: 'families losing benefits',
    crisis_text: 'Poverty rates surge'
  },
  'Infrastructure': {
    factor: 100000,
    unit: 'potholes unfixed',
    crisis_text: 'Transport network crumbling'
  },
  'Other Services': {
    factor: 5000,
    unit: 'police officers unfunded',
    crisis_text: 'Crime rates spike'
  },
};

// HEADLINE TEMPLATES - dramatic, tabloid-style
const HEADLINE_TEMPLATES = {
  cut: {
    'Health': [
      "NHS ON KNEES: £{amount}bn slashed as queues spiral",
      "HOSPITALS IN CRISIS: Chancellor wields axe on health",
      "A&E MELTDOWN: {amount} billion cut from lifeline services",
    ],
    'Social Protection': [
      "PENSIONERS BETRAYED: £{amount}bn welfare wipeout",
      "BENEFITS AXE: Millions face hardship after savage cuts",
      "COLD WINTER AHEAD: Heating payments slashed by £{amount}bn",
    ],
    'Education': [
      "SCHOOLS GUTTED: £{amount}bn ripped from classrooms",
      "TEACHERS REVOLT: Mass walkouts as education cut",
      "FUTURE CANCELLED: Universities face £{amount}bn blackhole",
    ],
    'Defence': [
      "TROOP CUTS: Army faces £{amount}bn axe amid tensions",
      "DEFENCE WEAKENED: Critics slam {amount}bn military cut",
    ],
    'Infrastructure': [
      "ROADS TO RUIN: £{amount}bn slashed from transport",
      "POTHOLE BRITAIN: Infrastructure budget decimated",
      "HS2-STYLE CUTS: £{amount}bn scrapped from building plans",
    ],
    'Other Services': [
      "POLICE STRETCHED: £{amount}bn cut to frontline services",
      "COUNCILS IN CRISIS: Local services face axe",
    ]
  },
  boost: {
    'Health': [
      "NHS BONANZA: £{amount}bn injection to cut queues",
      "HOSPITALS REJOICE: Record investment in health",
    ],
    'Social Protection': [
      "PENSIONERS CELEBRATE: £{amount}bn boost to support",
      "SAFETY NET STRENGTHENED: Benefits rise by £{amount}bn",
    ],
    'Education': [
      "SCHOOLS GOLDEN AGE: £{amount}bn education windfall",
      "TEACHERS TRIUMPH: Biggest funding boost in decades",
    ],
    'Infrastructure': [
      "BUILDING BRITAIN: £{amount}bn infrastructure blitz",
      "ROADS, RAIL, BROADBAND: Record £{amount}bn investment",
    ]
  },
  market: [
    "CITY PANIC: Traders flee UK assets after fiscal shock",
    "GILT VIGILANTES: Bond markets punish loose policy",
    "STERLING SLIDES: Pound under pressure on deficit fears",
  ],
  political: [
    "BACKBENCH MUTINY: MPs revolt against unpopular cuts",
    "LEADERSHIP CRISIS: PM faces confidence vote",
    "CABINET SPLIT: Senior ministers brief against policy",
  ]
};

const getRandomTemplate = (templates) => {
  return templates[Math.floor(Math.random() * templates.length)];
};

const calculateImpact = (changes) => {
  let newState = JSON.parse(JSON.stringify(currentState));
  let simHeadlines = [];

  // Increment tick counter
  newState.tickCount += 1;

  // Process pending delayed impacts from previous ticks
  const stillPending = [];
  for (const impact of newState.pendingImpacts) {
    impact.ticksRemaining -= 1;
    if (impact.ticksRemaining <= 0) {
      // Apply the delayed impact
      if (impact.type === 'gdp') {
        newState.gdp += impact.delta;
      } else if (impact.type === 'mood') {
        newState.publicMood += impact.delta;
      }
    } else {
      stillPending.push(impact);
    }
  }
  newState.pendingImpacts = stillPending;

  if (changes.type === 'expenditure') {
    const item = newState.expenditure.find(e => e.id === changes.id);
    const oldVal = item.value;
    item.value = changes.value;
    const diff = item.value - oldVal;

    const multiplier = FISCAL_MULTIPLIERS[changes.id] || 0.4;

    // TIME-LAG SYSTEM: Queue GDP impact for delayed effect
    // 40% immediate, 60% delayed by 2 ticks
    newState.gdp += diff * multiplier * 0.4;
    newState.pendingImpacts.push({
      type: 'gdp',
      delta: diff * multiplier * 0.6,
      ticksRemaining: 2
    });

    // CUTS: Generate dramatic headlines and drain political capital
    if (diff < -5) {
      const templates = HEADLINE_TEMPLATES.cut[changes.id] || HEADLINE_TEMPLATES.cut['Other Services'];
      const headline = getRandomTemplate(templates).replace('{amount}', Math.abs(diff).toFixed(0));

      simHeadlines.push({
        type: 'CRISIS',
        text: headline
      });

      // Immediate mood hit
      newState.publicMood -= Math.abs(diff) * 0.3;
      // Delayed mood degradation (people feel it over time)
      newState.pendingImpacts.push({
        type: 'mood',
        delta: -Math.abs(diff) * 0.3,
        ticksRemaining: 2
      });

      // POLITICAL CAPITAL: Unpopular cuts on sensitive departments drain capital
      if (['Health', 'Social Protection', 'Education'].includes(changes.id)) {
        newState.politicalCapital -= Math.abs(diff) * 1.5;

        if (newState.politicalCapital < 30 && Math.random() > 0.5) {
          simHeadlines.push({
            type: 'CRISIS',
            text: getRandomTemplate(HEADLINE_TEMPLATES.political)
          });
        }
      }

      // EMPATHY HEADLINE: Show human cost
      const empathy = EMPATHY_MATRIX[changes.id];
      if (empathy && Math.abs(diff) > 3) {
        const humanCost = Math.round(Math.abs(diff) * empathy.factor);
        simHeadlines.push({
          type: 'UPDATE',
          text: `HUMAN COST: ${humanCost.toLocaleString()} ${empathy.unit}`
        });
      }

    } else if (diff > 5) {
      // BOOSTS: Positive headlines
      const templates = HEADLINE_TEMPLATES.boost[changes.id] || [`SPENDING UP: £{amount}bn boost for ${changes.id}`];
      const headline = getRandomTemplate(templates).replace('{amount}', diff.toFixed(0));

      simHeadlines.push({
        type: 'UPDATE',
        text: headline
      });
      newState.publicMood += diff * 0.2;
      newState.politicalCapital += diff * 0.5; // Popular moves build capital
    }
  }

  if (changes.type === 'revenue') {
    const item = newState.revenue.find(r => r.id === changes.id);
    const oldVal = item.value;
    item.value = changes.value;
    const diff = item.value - oldVal;

    // TAX ELASTICITY: Big hikes cause economic damage
    if (diff > 10) {
      newState.gdp -= diff * 0.33;
      newState.marketConfidence -= 5;
      simHeadlines.push({
        type: 'MARKET',
        text: getRandomTemplate(HEADLINE_TEMPLATES.market)
      });
    } else if (diff > 5) {
      newState.gdp -= diff * 0.2;
    }

    // Tax rises are unpopular
    newState.publicMood -= diff * 0.2;

    // Tax cuts boost mood but worry markets
    if (diff < -10) {
      newState.publicMood += Math.abs(diff) * 0.3;
      newState.marketConfidence -= 3;
      simHeadlines.push({
        type: 'UPDATE',
        text: `TAX BONANZA: ${changes.id} slashed by £${Math.abs(diff).toFixed(0)}bn`
      });
    }
  }

  // Calculate totals and deficit
  const totalExp = newState.expenditure.reduce((sum, e) => sum + e.value, 0);
  const totalRev = newState.revenue.reduce((sum, r) => sum + r.value, 0);
  const deficit = totalExp - totalRev;
  const deficitPctGdp = (deficit / newState.gdp) * 100;

  // INFLATION SPIRAL: High spending pressure drives inflation
  const baselineSpending = 1200;
  const spendingPressure = (totalExp - baselineSpending) / newState.gdp;
  newState.inflation = Math.max(0, 2.0 + spendingPressure * 80);

  // BANK OF ENGLAND RESPONSE: High inflation forces rate rises
  if (newState.inflation > 4.0) {
    const inflationPressure = (newState.inflation - 4.0) * 0.03;
    newState.giltYield += inflationPressure;
  }

  // BOND VIGILANTES: High deficit triggers yield spike
  if (deficitPctGdp > 5) {
    newState.giltYield += 0.05;
    newState.marketConfidence -= 1;
    if (Math.random() > 0.7) {
      simHeadlines.push({
        type: 'MARKET',
        text: getRandomTemplate(HEADLINE_TEMPLATES.market)
      });
    }
  } else if (deficitPctGdp < 3) {
    // Fiscal prudence calms markets
    if (newState.giltYield > 4.2) newState.giltYield -= 0.02;
    if (newState.marketConfidence < 80) newState.marketConfidence += 1;
  } else {
    if (newState.giltYield > 4.2) newState.giltYield -= 0.01;
  }

  // DEBT INTEREST: Dynamically adjusts based on gilt yields
  const debtInterest = newState.expenditure.find(e => e.id === 'Debt Interest');
  debtInterest.value = 100 + ((newState.giltYield - 4.2) * 10);

  // Clamp values to sensible ranges
  newState.publicMood = Math.max(0, Math.min(100, newState.publicMood));
  newState.marketConfidence = Math.max(0, Math.min(100, newState.marketConfidence));
  newState.politicalCapital = Math.max(0, Math.min(100, newState.politicalCapital));
  newState.giltYield = Math.max(0.5, Math.min(15, newState.giltYield));
  newState.inflation = Math.max(0, Math.min(20, newState.inflation));

  currentState = newState;
  return { state: currentState, headlines: simHeadlines };
};

io.on('connection', (socket) => {
  console.log('Chancellor connected:', socket.id);
  socket.emit('init', currentState);

  // Send cached live news immediately on connect
  if (liveHeadlines.length > 0) {
    socket.emit('news-flash', liveHeadlines.slice(0, 10));
  }

  socket.on('update-budget', async (changes) => {
    const result = calculateImpact(changes);
    io.emit('state-update', result.state);

    // Try AI headline generation for significant changes
    if (result.headlines.length > 0) {
      const diff = changes.value - (currentState[changes.type]?.find(i => i.id === changes.id)?.value || 0);

      // Try to get an AI-generated headline for dramatic changes
      if (Math.abs(diff) > 10) {
        const actionType = diff < 0 ? `cut_${changes.id.toLowerCase().replace(' ', '_')}` : `boost_${changes.id.toLowerCase().replace(' ', '_')}`;
        const context = {
          deficit: currentState.expenditure.reduce((s, e) => s + e.value, 0) - currentState.revenue.reduce((s, r) => s + r.value, 0),
          publicMood: currentState.publicMood,
          politicalCapital: currentState.politicalCapital
        };

        const aiHeadline = await generateContextualHeadline(actionType, diff, context);
        if (aiHeadline) {
          result.headlines.unshift({
            type: 'AI',
            text: `🤖 ${aiHeadline}`
          });
        }
      }

      io.emit('news-flash', result.headlines);
    }
  });

  socket.on('reset', () => {
    currentState = JSON.parse(JSON.stringify(INITIAL_STATE));
    io.emit('state-update', currentState);
  });
});

// PERIODIC AI HEADLINE GENERATION
// Generate fresh AI headlines every 2 minutes
setInterval(async () => {
  const context = {
    deficit: currentState.expenditure.reduce((s, e) => s + e.value, 0) - currentState.revenue.reduce((s, r) => s + r.value, 0),
    gdp: currentState.gdp,
    inflation: currentState.inflation,
    publicMood: currentState.publicMood,
    politicalCapital: currentState.politicalCapital
  };

  const aiHeadlines = await generateHeadlines(context);
  if (aiHeadlines && aiHeadlines.length > 0) {
    io.emit('news-flash', aiHeadlines.map(text => ({
      type: 'AI',
      text: `🤖 ${text}`
    })));
  }
}, 120000); // 2 minutes

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Sovereign Interface Engine running on port ${PORT}`);
  console.log(`Gemini API: ${process.env.GEMINI_API_KEY ? 'Configured ✓' : 'NOT CONFIGURED ✗'}`);
});

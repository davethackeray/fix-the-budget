import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use gemini-2.5-flash as requested
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Cache to avoid rate limits (5 RPM for free tier)
let headlineCache = [];
let lastGenerationTime = 0;
const CACHE_DURATION = 60000; // 1 minute between AI calls

/**
 * Generate dramatic budget-related headlines using Gemini AI
 * @param {Object} context - Current budget state for context
 * @returns {Promise<string[]>} Array of generated headlines
 */
export async function generateHeadlines(context) {
    const now = Date.now();

    // Return cached headlines if we're within rate limit window
    if (headlineCache.length > 0 && (now - lastGenerationTime) < CACHE_DURATION) {
        // Rotate through cache
        const headline = headlineCache.shift();
        headlineCache.push(headline);
        return [headline];
    }

    try {
        const prompt = `You are a UK tabloid headline writer. Generate 5 dramatic, punchy headlines about the UK government budget.

Current fiscal context:
- Deficit: £${context.deficit?.toFixed(0) || 100}bn
- GDP: £${context.gdp?.toFixed(0) || 2800}bn  
- Inflation: ${context.inflation?.toFixed(1) || 2.5}%
- Public Mood: ${context.publicMood?.toFixed(0) || 50}%
- Political Capital: ${context.politicalCapital?.toFixed(0) || 100}%

Generate headlines that:
1. Are tabloid-style dramatic (like The Sun, Daily Mail, Metro)
2. Reference real UK political themes (NHS, taxes, cost of living, immigration, housing)
3. Mix positive and negative angles
4. Are 8-15 words each
5. Include sensationalist language

Return ONLY the 5 headlines, one per line, no numbering or bullets.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse headlines (one per line)
        const headlines = text
            .split('\n')
            .map(h => h.trim())
            .filter(h => h.length > 10 && h.length < 100);

        if (headlines.length > 0) {
            headlineCache = headlines;
            lastGenerationTime = now;
            console.log(`Generated ${headlines.length} AI headlines`);
            return [headlines[0]];
        }

        return null; // Fall back to templates
    } catch (error) {
        console.error('Gemini API error:', error.message);
        return null; // Fall back to templates
    }
}

/**
 * Generate a contextual headline based on a specific budget action
 * @param {string} action - What happened (e.g., 'cut_nhs', 'raise_tax')
 * @param {number} amount - The amount changed
 * @returns {Promise<string|null>} Generated headline or null
 */
export async function generateContextualHeadline(action, amount, context) {
    const now = Date.now();

    // Rate limit - max 1 call per 15 seconds for contextual headlines
    if ((now - lastGenerationTime) < 15000) {
        return null;
    }

    try {
        const prompt = `Generate ONE dramatic UK tabloid headline about this budget action:

Action: ${action}
Amount: £${Math.abs(amount)}bn
Current deficit: £${context.deficit?.toFixed(0) || 100}bn
Public mood: ${context.publicMood?.toFixed(0) || 50}%

The headline should be:
- Tabloid dramatic style (The Sun, Daily Mail)
- 8-15 words
- Sensationalist but believable
- Reference real UK issues

Return ONLY the headline, nothing else.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const headline = response.text().trim();

        if (headline.length > 10 && headline.length < 100) {
            lastGenerationTime = now;
            return headline;
        }

        return null;
    } catch (error) {
        console.error('Gemini contextual headline error:', error.message);
        return null;
    }
}

export default { generateHeadlines, generateContextualHeadline };

// ============================================================
// INTELLIGENCE API — Summarizes competitor URLs using OpenRouter
// ============================================================
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'blanklog-hub-secret-key-2026';
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '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';

function getUser(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    try { return jwt.verify(authHeader.replace('Bearer ', ''), JWT_SECRET); } catch (e) { return null; }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const user = getUser(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        // For this demo, we simulate fetching the page and extracting the title.
        // In production, you would use a scraper like cheerio or an API like Jina Reader.
        const title = url.includes('openai') ? 'OpenAI Update' : url.includes('anthropic') ? 'Anthropic Update' : 'AI Competitor Update';

        const systemPrompt = `You are an AI industry analyst. Summarize the key strategic implications of this competitor announcement at ${url} (Assume the article is about "${title}"). Give a 3-sentence summary of what they did and how Blank Log™ should respond.`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://blank-log-main.vercel.app',
                'X-Title': 'Blank Log Hub'
            },
            body: JSON.stringify({
                model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
                messages: [{ role: 'system', content: systemPrompt }],
                max_tokens: 500
            })
        });

        const data = await response.json();
        if (!response.ok) return res.status(500).json({ error: data.error?.message || 'AI request failed' });

        const summary = data.choices?.[0]?.message?.content || 'No summary generated';
        return res.status(200).json({ success: true, title, summary });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
